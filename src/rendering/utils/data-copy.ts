import * as ktxparse from 'ktx-parse';

import { TextureFormatToSize, TextureFormatToChannelSize, WebGPUToVkFormat } from '../core/constants';
import { mapRange, padTemplate } from '../../utils/general';

export function createAndCopyBuffer(
    arr: ArrayBuffer | ArrayBufferView,
    usage: GPUFlagsConstant,
    device: GPUDevice,
    label?: string,
    alignment = 4,
): GPUBuffer {
    const pad = alignment - 1;
    const buffer = device.createBuffer({
        label,
        usage,
        size: (arr.byteLength + pad) & ~pad,
        mappedAtCreation: true,
    } as GPUBufferDescriptor);

    const writeArray = new Uint8Array(buffer.getMappedRange());
    const readArray = arr instanceof ArrayBuffer
        ? new Uint8Array(arr)
        : new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);

    writeArray.set(readArray);
    buffer.unmap();

    return buffer;
}

export function createAndCopyCubemap(
    device: GPUDevice,
    data: ArrayBuffer,
    format: GPUTextureFormat,
    usage: number,
    label?: string,
) {
    const pixelSize = TextureFormatToSize[format];
    if (pixelSize == null) {
        throw new Error(`copy cubemap -- unsupported format: ${format}`);
    }

    const width = Math.sqrt(data.byteLength / (6 * pixelSize));
    const size = { width, height: width, depthOrArrayLayers: 6 };

    const texture = device.createTexture({
        usage: usage | GPUTextureUsage.COPY_DST,
        label,
        format,
        size,
    });

    device.queue.writeTexture(
        { texture },
        data,
        { bytesPerRow: width * pixelSize, rowsPerImage: width },
        size,
    );

    return texture;
}

export type TextureToArrayBufferOptions = {
    device: GPUDevice,
    texture: GPUTexture,
    mipLevel?: number,
    resultBuffer?: Uint8Array,
    storageBuffer?: GPUBuffer,
    returnBuffer?: boolean,
    description?: string,
};

export async function textureToArrayBuffer(
    options: Omit<TextureToArrayBufferOptions, 'returnBuffer'> & { returnBuffer?: false },
): Promise<{ imageData: Uint8Array }>;

export async function textureToArrayBuffer(
    options: Omit<TextureToArrayBufferOptions, 'returnBuffer'> & { returnBuffer: true },
): Promise<{ imageData: Uint8Array, storageBuffer: GPUBuffer }>;

export async function textureToArrayBuffer({
    device,
    texture,
    mipLevel = 0,
    returnBuffer,
    storageBuffer,
    resultBuffer,
    description,
}: TextureToArrayBufferOptions) {
    const pixelSize = TextureFormatToSize[texture.format];
    const fullDescription = padTemplate`[textureToKTX${description ?? ''}${texture.label}] --`;

    if (pixelSize == null) {
        throw new Error(`${fullDescription} format ${texture.format} unsupported`);
    }

    const width = texture.width >> mipLevel;
    const height = texture.height >> mipLevel;
    const rawBytesPerRow = width * pixelSize;
    const bytesPerRow = Math.max(rawBytesPerRow, 256);
    const rowsPerImage = height;
    const byteSize = rowsPerImage * bytesPerRow * texture.depthOrArrayLayers;
    const resultSize = rawBytesPerRow * height * texture.depthOrArrayLayers;

    if (resultBuffer != null && resultBuffer.byteLength < byteSize) {
        throw new Error(`${fullDescription} given result array not large enough.
${resultBuffer.byteLength} < ${byteSize}`);
    }

    if (storageBuffer != null && storageBuffer.size < byteSize) {
        throw new Error(`${fullDescription} given storage buffer not large enough.
${storageBuffer.size} < ${byteSize}`);
    }

    const requiredUsage = GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ;

    if (storageBuffer != null && (storageBuffer.usage & requiredUsage) !== requiredUsage) {
        throw new Error(`${fullDescription} given storage does not have correct usage flags.
Given: ${storageBuffer.usage}
Required: ${requiredUsage}`);
    }

    let imageData = resultBuffer ?? new Uint8Array(byteSize);
    const storage = storageBuffer ?? device.createBuffer({
        label: `${fullDescription} storage buffer`,
        size: byteSize,
        usage: requiredUsage,
    });

    const encoder = device.createCommandEncoder({ label: `${fullDescription} encoder` });
    encoder.copyTextureToBuffer(
        { texture, mipLevel },
        { buffer: storage, rowsPerImage, bytesPerRow },
        { width, height, depthOrArrayLayers: texture.depthOrArrayLayers },
    );
    device.queue.submit([encoder.finish()]);

    await Promise.all([
        storage.mapAsync(GPUMapMode.READ, 0, byteSize),
        device.queue.onSubmittedWorkDone(),
    ]);

    const mapped = storage.getMappedRange(0, byteSize);
    imageData.set(new Uint8Array(mapped));
    storage.unmap();

    if (bytesPerRow > rawBytesPerRow) {
        for (let h = 0; h < height * texture.depthOrArrayLayers; h += 1) {
            for (let w = 0; w < rawBytesPerRow; w += 1) {
                imageData[w + h * rawBytesPerRow] = imageData[w + h * bytesPerRow];
            }
        }
        imageData = imageData.slice(0, resultSize);
    }

    return {
        imageData,
        storageBuffer: returnBuffer ? storage : undefined,
    };
}

export async function textureToKTX(device: GPUDevice, texture: GPUTexture, cube = false) {
    const pixelSize = TextureFormatToSize[texture.format];
    const typeSize = TextureFormatToChannelSize[texture.format];

    if (pixelSize == null || typeSize == null) {
        throw new Error(`textureToKTX -- format ${texture.format} of ${texture.label} unsupported`);
    }

    const container = ktxparse.createDefaultContainer();
    container.pixelWidth = texture.width;
    container.pixelHeight = texture.height;
    container.vkFormat = WebGPUToVkFormat[texture.format];
    container.typeSize = typeSize;
    delete container.keyValue.KTXswizzle;

    const dataFormat = container.dataFormatDescriptor[0];
    dataFormat.colorModel = ktxparse.KHR_DF_MODEL_RGBSDA;
    dataFormat.transferFunction = ktxparse.KHR_DF_TRANSFER_LINEAR;
    dataFormat.bytesPlane[0] = pixelSize;

    dataFormat.samples = mapRange(4, (i) => ({
        channelType: [192, 193, 194, 207][i],
        samplePosition: [0, 0, 0, 0],
        bitLength: container.typeSize * 8 - 1,
        bitOffset: container.typeSize * 8 * i,
        sampleLower: -1082130432,
        sampleUpper: 1065353216,
    }));

    if (texture.dimension === '3d') {
        container.faceCount = 1;
        container.pixelDepth = texture.depthOrArrayLayers;
    } else if (cube) {
        const cubeLayers = texture.depthOrArrayLayers / 6;
        container.layerCount = cubeLayers === 1 ? 0 : cubeLayers;
        container.faceCount = 6;
    } else {
        container.layerCount = texture.depthOrArrayLayers;
        container.faceCount = 1;
    }

    let storageBuffer: GPUBuffer | undefined;
    let imageData: Uint8Array;

    for (let i = 0; i < texture.mipLevelCount; i += 1) {
        ({ imageData, storageBuffer } = await textureToArrayBuffer({
            mipLevel: i,
            returnBuffer: true,
            device,
            texture,
            storageBuffer,
        }));

        container.levels.push({
            levelData: imageData,
            uncompressedByteLength: imageData.byteLength,
        });
    }

    return ktxparse.write(container);
}
