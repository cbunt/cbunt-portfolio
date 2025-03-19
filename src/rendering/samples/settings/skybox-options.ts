import { parseHDR } from '../../utils/texture-importing';
import { equirectangularToCubemap } from '../../utils/texture-processing';
import { ListenerSyms } from './property-listener';

const hdrPromises = await fetch(HDR_BASE_URL__, { headers: { 'Content-Type': 'application/vnd.github.object+json' } })
    .then((res) => res.json()) as Record<string, unknown>[];

export const hdrs = Object.fromEntries(hdrPromises.flatMap(({ name, download_url }) => typeof name === 'string' && typeof download_url === 'string' && download_url.endsWith('.hdr') ? [[name, download_url]] : []));

async function processSkybox(device: GPUDevice, file: string | URL | File | ArrayBuffer) {
    let buffer: ArrayBuffer;
    if (file instanceof ArrayBuffer) {
        buffer = file;
    } else if (file instanceof File) {
        buffer = await file.arrayBuffer();
    } else {
        const res = await fetch(file);
        buffer = await res.arrayBuffer();
    }

    const hdr = parseHDR(buffer);

    return equirectangularToCubemap(
        device,
        hdr,
        {
            format: 'rgba16float',
            usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.COPY_SRC,
        },
    );
}

export type SkyboxTarget = { device: GPUDevice, setSkybox: (resource: GPUTexture) => unknown };

export default function getSkyboxOptions(target: SkyboxTarget) {
    return {
        [ListenerSyms.$type]: 'file' as const,
        [ListenerSyms.$callback]: async (val: unknown, key: PropertyKey) => {
            if (key !== 'value' || val == null) return;
            if (typeof val === 'string' || val instanceof File) {
                const texture = await processSkybox(target.device, val);
                const res = target.setSkybox(texture);
                if (res instanceof Promise) await res;
            }
        },
        accept: '.hdr',
        value: Object.keys(hdrs)[0],
        initialValues: hdrs,
        process: (file: File) => file,
    };
}
