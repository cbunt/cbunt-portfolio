import { toFloat16Bytes } from './data-conversion';
import { srgbTextureToLinear, generateMips } from './texture-processing';

export type imageToTextureDescriptor = {
    device: GPUDevice,
    data: Uint8Array,
    mimeType?: string,
    label?: string,
    usage?: number,
    format?: GPUTextureFormat,
    mips?: boolean,
    srgbToLinear?: boolean,
    colorSpace?: PredefinedColorSpace,
};

export async function imageToTexture({
    device,
    data,
    mimeType,
    usage = GPUTextureUsage.TEXTURE_BINDING,
    mips = true,
    format = 'rgba8unorm',
    colorSpace = 'srgb',
    label = '',
    srgbToLinear,
}: imageToTextureDescriptor) {
    const blob = new Blob([data], { type: mimeType });
    const bitmap = await createImageBitmap(blob, { colorSpaceConversion: 'none' });
    const size = { width: bitmap.width, height: bitmap.height };

    const texture = device.createTexture({
        label,
        format,
        size: size,
        usage: usage | GPUTextureUsage.COPY_DST | GPUTextureUsage.COPY_SRC | GPUTextureUsage.RENDER_ATTACHMENT,
        mipLevelCount: mips ? 1 + (Math.log2(Math.max(bitmap.width, bitmap.height)) | 0) : 1,
    });

    device.queue.copyExternalImageToTexture(
        { source: bitmap },
        { texture, colorSpace },
        size,
    );

    if (srgbToLinear) srgbTextureToLinear(device, texture);
    if (mips) void generateMips(device, texture);

    return texture;
}

export function parseHDR(inData: Uint8Array | ArrayBuffer) {
    const decoder = new TextDecoder();
    const buffer = inData instanceof Uint8Array ? inData : new Uint8Array(inData);
    let pos = 0;

    const getLine = (lineLimit = 1024) => {
        const limit = Math.min(buffer.length, lineLimit + pos);
        const sub = buffer.subarray(pos, limit);
        const end = sub.indexOf(0x0A) + 1;
        pos += end;
        return end === 0 ? undefined : decoder.decode(sub.subarray(0, end));
    };

    const importError = (msg: string) => new Error('HDR Import Error: ' + msg);

    // #region Read Header
    const magicTokenRegex = /^#\?(\S+)/;
    const magicTokenLine = getLine();

    if (magicTokenLine == null) throw importError('no header found');
    if (!magicTokenRegex.test(magicTokenLine)) throw importError('bad initial token');

    const headerRegs = [
        /FORMAT=(?<format>\S+)/, // format
        /-Y\s+(?<Y>\d+)\s+\+X\s+(?<X>\d+)/, // size
        /EXPOSURE\s*=\s*(?<exposure>\d+(\.\d+)?)/, // exposure
        /GAMMA\s*=\s*(?<gamma>\d+(\.\d+)?)/, // gamma
    ];

    const headerReg = new RegExp(`^\\s*(${
        headerRegs.map(({ source }) => `(${source})`).join('|')
    })\\s*$`);

    let noFormat = true;
    let gamma = 1; /* a value of 1.0 in an image corresponds to <exposure> watts/steradian/m^2. defaults to 1.0 */
    let exposure = 1; /* image has already been gamma corrected with given gamma. defaults to 1.0 (no correction) */
    let width: number | undefined = undefined;
    let height: number | undefined = undefined;

    for (let line = getLine(); line != null; line = width == null ? getLine() : undefined) {
        const groups = line.match(headerReg)?.groups as Partial<Record<string, string>> | undefined;
        if (groups == null) continue;

        if (groups.format != null) {
            noFormat = false;
        } else if (groups.X != null && groups.Y != null) {
            width = parseInt(groups.X);
            height = parseInt(groups.Y);
        } else if (groups.gamma != null) {
            gamma = parseFloat(groups.gamma);
        } else if (groups.exposure != null) {
            exposure = parseFloat(groups.exposure);
        }
    }

    if (noFormat) throw importError('missing format specifier');
    if (width == null || height == null) throw importError('missing image size specifier');
    // #endregion

    // #region Read Scanline Data
    let rawData: Uint8Array;
    const unencodable = width < 8 || width > 0x7fff;
    const flatData = buffer[pos] !== 2 || buffer[pos + 1] !== 2 || (buffer[pos + 2] & 0x80) !== 0;

    if (unencodable || flatData) {
        rawData = buffer.subarray(pos);
    } else {
        rawData = new Uint8Array(width * height * 4);
        const end = 4 * width;
        const scanline_buffer = new Uint8Array(end);
        const len = buffer.byteLength;

        for (let k = 0, offset = 0; k < height && pos < len; k++) {
            if (pos + 4 > len)
                throw importError('file ended durning scanline');

            if ((2 != buffer[pos++]) || (2 != buffer[pos++]) || (((buffer[pos++] << 8) | buffer[pos++]) != width))
                throw importError('bad rgbe scanline format');

            let count;
            for (let ptr = 0; ptr < end && pos < len; ptr += count) {
                count = buffer[pos++];
                const isEncodedRun = count > 128;
                if (isEncodedRun) count -= 128;

                if (count == 0 || ptr + count > end)
                    throw importError('bad scanline data');

                if (isEncodedRun) {
                    scanline_buffer.fill(buffer[pos], ptr, ptr + count);
                    pos += 1;
                } else {
                    scanline_buffer.set(buffer.subarray(pos, pos + count), ptr);
                    pos += count;
                }
            }

            for (let i = 0; i < width; i++)
                for (let j = 0; j < end; j += width)
                    rawData[offset++] = scanline_buffer[i + j];
        }
    }
    // #endregion

    // #region Convert to Float16
    const data = new Uint16Array(rawData.length);
    const float16One = toFloat16Bytes(1);

    for (let i = 0; i < width * height * 4; i += 4) {
        const raw_e = rawData[i + 3];
        const scale = Math.pow(2.0, raw_e - 128.0) / 255.0;

        for (let j = 0; j < 3; j += 1) {
            data[i + j] = toFloat16Bytes(Math.min(rawData[i + j] * scale, 65504));
        }
        data[i + 3] = float16One;
    }
    // #endregion

    return { data, width, height, gamma, exposure };
}
