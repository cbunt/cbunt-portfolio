import * as ktxparse from 'ktx-parse';

import { VkFormatToWebGPU, TextureFormatToSize, TextureFormatToChannelSize, WebGPUToVkFormat } from '../rendering/constants';
import { padTemplate } from './general';

export function createAndCopyBuffer(
    arr: ArrayBuffer | TypedArrayLike,
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

export type KTXImportOptions = {
    label?: string,
    mipLevelCount?: number | 'max' | 'default',
    textureUsage?: number,
    validate?: boolean,
};

export function ktx2ToTexture(
    buffer: ArrayBuffer,
    device: GPUDevice,
    options?: KTXImportOptions,
) {
    const arr = new Uint8Array(buffer);
    const ktx = ktxparse.read(arr);
    const format = VkFormatToWebGPU[ktx.vkFormat];

    if (format == null) {
        throw new Error(`ktx texture import -- unsupported format: ${ktx.vkFormat}\n\tCould not covert to webgpu`);
    }

    const pixelSize = TextureFormatToSize[format];
    if (pixelSize == null) {
        throw new Error(`ktx texture import -- unsupported format: ${ktx.vkFormat}\n\tCould not get pixel byte size`);
    }

    const size = {
        width: ktx.pixelWidth,
        height: ktx.pixelHeight,
        depthOrArrayLayers: ktx.faceCount,
    };

    const maxMipCount = Math.ceil(Math.log2(Math.max(size.width, size.height))) + 1;
    let mipLevelCount = ktx.levels.length;
    if (options?.mipLevelCount === 'max') {
        mipLevelCount = maxMipCount;
    } else if (typeof options?.mipLevelCount === 'number') {
        mipLevelCount = Math.min(maxMipCount, options.mipLevelCount);
    }

    let usage = GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST;
    if (options?.textureUsage) usage |= options.textureUsage;

    const texture = device.createTexture({
        label: options?.label,
        size,
        mipLevelCount,
        format,
        usage,
    });

    const mipCopies = Math.min(ktx.levels.length, mipLevelCount) - 1;

    for (let mipLevel = mipCopies; mipLevel >= 0; mipLevel -= 1) {
        const width = size.width >> mipLevel;
        const height = size.height >> mipLevel;
        const { levelData } = ktx.levels[mipLevel];

        const rawBytesPerRow = width * pixelSize;
        const bytesPerRow = Math.max(rawBytesPerRow, 256);
        const rowsPerImage = height;
        const bytesPerImage = rowsPerImage * bytesPerRow;

        let imageData = levelData;
        if (bytesPerRow > rawBytesPerRow) {
            imageData = new Uint8Array(bytesPerImage * texture.depthOrArrayLayers);

            for (let h = 0; h < height * texture.depthOrArrayLayers; h += 1) {
                for (let w = 0; w < rawBytesPerRow; w += 1) {
                    imageData[w + h * bytesPerRow] = levelData[w + h * rawBytesPerRow];
                }
            }
        }

        const layerBatch = Math.min(
            Math.floor(device.limits.maxBufferSize / bytesPerImage),
            ktx.faceCount,
        );
        const layerCount = Math.ceil(ktx.faceCount / layerBatch);

        for (let l = 0; l < layerCount; l += 1) {
            const offset = l * layerBatch;
            const count = Math.min(layerBatch, ktx.faceCount - offset);

            const data = layerCount > 1
                ? imageData.subarray(offset * bytesPerImage, (offset + count) * bytesPerImage)
                : imageData;

            device.queue.writeTexture(
                { mipLevel, texture, origin: [0, 0, offset] },
                data,
                { bytesPerRow, rowsPerImage },
                [width, height, count],
            );
        }
    }

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

    const container = new ktxparse.KTX2Container();
    container.pixelWidth = texture.width;
    container.pixelHeight = texture.height;
    container.vkFormat = WebGPUToVkFormat[texture.format];
    container.typeSize = typeSize;
    delete container.keyValue.KTXswizzle;

    const dataFormat = container.dataFormatDescriptor[0];
    dataFormat.colorModel = ktxparse.KHR_DF_MODEL_RGBSDA;
    dataFormat.transferFunction = ktxparse.KHR_DF_TRANSFER_LINEAR;
    dataFormat.bytesPlane[0] = pixelSize;

    dataFormat.samples = [0, 1, 2, 3].map((i) => ({
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
        // eslint-disable-next-line no-await-in-loop
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
