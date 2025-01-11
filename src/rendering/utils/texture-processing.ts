import blit from '../shaders/blit-vert.shader';
import { toWorldDir } from '../shaders/cubemap-sampling.shader';
import { createAndCopyBuffer } from './data-copy';
import { padTemplate } from '../../utils/general';

type EquirectangularDescriptor = {
    data: SharedArrayBuffer | BufferSource | GPUTexture,
    width: number,
    height: number,
    gamma?: number,
    exposure?: number,
};

export async function equirectangularToCubemap(
    device: GPUDevice,
    { data, width, height, gamma = 1, exposure = 1 }: EquirectangularDescriptor,
    outputDescriptor: Omit<GPUTextureDescriptor, 'dimension' | 'size'>,
) {
    const code = /* wgsl */ `
        override EXPOSURE: f32 = 1.0;
        override GAMMA: f32 = 1.0;
        override FLIP_Y: bool = false;

        @group(0) @binding(0) var equirectangularMap: texture_2d<f32>;
        @group(0) @binding(1) var mapSampler: sampler;
        @group(0) @binding(2) var<uniform> face: u32;

        fn sampleSphericalMap(v: vec3f) -> vec2f {
            const invAtan = vec2(0.1591, 0.3183);

            var uv = vec2(atan2(v.z, v.x), asin(v.y));
            uv *= invAtan;
            uv += 0.5;
            return uv;
        }
 
        ${blit}
        ${toWorldDir}

        @fragment
        fn fs(@location(0) uv: vec2f) -> @location(0) vec4f {
            var dir = toWorldDirF32(uv, face);
            dir = vec3(dir.z, dir.y, -dir.x);
            var coord = sampleSphericalMap(dir);
            if (FLIP_Y) { coord.y = 1 - coord.y; }

            var color = textureSample(equirectangularMap, mapSampler, coord).rgb;
            if (GAMMA != 1.0) { color = pow(color, vec3(1.0 / GAMMA)); }
            if (EXPOSURE != 1.0) { color /= EXPOSURE; }
            return vec4(color, 1.0);
        }
    `;

    let FLIP_Y = 0;
    let equirectangular: GPUTexture;
    if (data instanceof GPUTexture) {
        equirectangular = data;
    } else {
        FLIP_Y = 1;
        equirectangular = device.createTexture({
            label: `${outputDescriptor.label} equirectangular`,
            dimension: '2d',
            format: 'rgba16float',
            size: { width, height },
            usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.TEXTURE_BINDING,
        });

        device.queue.writeTexture(
            { texture: equirectangular, mipLevel: 0 },
            data,
            { bytesPerRow: width * 2 * 4 },
            { width, height, depthOrArrayLayers: 1 },
        );
        await device.queue.onSubmittedWorkDone();
    }

    const faceSize = equirectangular.height >> 1;
    const cubemapDescriptor = outputDescriptor as GPUTextureDescriptor;
    cubemapDescriptor.mipLevelCount ??= Math.log2(faceSize) | 0;
    cubemapDescriptor.size = { width: faceSize, height: faceSize, depthOrArrayLayers: 6 };
    cubemapDescriptor.dimension = '2d';
    cubemapDescriptor.usage |= GPUTextureUsage.RENDER_ATTACHMENT;
    const cubemap = device.createTexture(cubemapDescriptor);

    const label = padTemplate`hdr copy${outputDescriptor.label}`;
    const bindgroupLayout = device.createBindGroupLayout({
        label,
        entries: [
            {
                binding: 0,
                texture: {},
                visibility: GPUShaderStage.FRAGMENT,
            },
            {
                binding: 1,
                sampler: {},
                visibility: GPUShaderStage.FRAGMENT,
            },
            {
                binding: 2,
                buffer: {},
                visibility: GPUShaderStage.FRAGMENT,
            },
        ],
    });

    const module = device.createShaderModule({ label, code });
    const sampler = device.createSampler({ label, minFilter: 'linear', magFilter: 'linear' });
    const params = new Uint32Array(1);
    const paramBuffer = createAndCopyBuffer(params, GPUBufferUsage.COPY_DST | GPUBufferUsage.UNIFORM, device, label);

    const bindgroup = device.createBindGroup({
        label,
        layout: bindgroupLayout,
        entries: [
            { binding: 0, resource: equirectangular.createView() },
            { binding: 1, resource: sampler },
            { binding: 2, resource: { buffer: paramBuffer } },
        ],
    });

    const pipelineLayout = device.createPipelineLayout({
        label,
        bindGroupLayouts: [bindgroupLayout],
    });

    const pipeline = device.createRenderPipeline({
        label,
        layout: pipelineLayout,
        vertex: { module },
        fragment: {
            module,
            targets: [{ format: cubemap.format }],
            constants: {
                GAMMA: gamma,
                EXPOSURE: exposure,
                FLIP_Y,
            },
        },
    });

    for (let i = 0; i < 6; i += 1) {
        params[0] = i;
        device.queue.writeBuffer(paramBuffer, 0, params, 0, 1);

        const view = cubemap.createView({
            dimension: '2d',
            arrayLayerCount: 1,
            baseArrayLayer: i,
            mipLevelCount: 1,
        });

        const encoder = device.createCommandEncoder();
        const pass = encoder.beginRenderPass({
            label,
            colorAttachments: [{
                view,
                loadOp: 'clear',
                storeOp: 'store',
            }],
        });

        pass.setPipeline(pipeline);
        pass.setBindGroup(0, bindgroup);
        pass.draw(3);
        pass.end();
        device.queue.submit([encoder.finish()]);
    }

    return cubemap;
}
export async function generateMips(device: GPUDevice, texture: GPUTexture) {
    const code = /* wgsl */ `
        @group(0) @binding(0) var image: texture_2d<f32>;
        @group(0) @binding(1) var mipSampler: sampler;

        ${blit}

        @fragment
        fn fs(@location(0) uv: vec2f) -> @location(0) vec4f {
            return textureSample(image, mipSampler, uv);
        }
    `;

    const label = padTemplate`mip generation${texture.label}`;

    const bindgroupLayout = device.createBindGroupLayout({
        label,
        entries: [
            {
                binding: 0,
                texture: { viewDimension: '2d', sampleType: 'float' },
                visibility: GPUShaderStage.FRAGMENT,
            },
            {
                binding: 1,
                sampler: {},
                visibility: GPUShaderStage.FRAGMENT,
            },
        ],
    });

    const colorAttachment = {
        view: undefined as GPUTextureView | undefined,
        loadOp: 'clear',
        storeOp: 'store',
    };

    const sampler = device.createSampler({
        minFilter: 'linear',
        magFilter: 'linear',
    });
    const module = device.createShaderModule({ label, code });
    const pipelineLayout = device.createPipelineLayout({ label, bindGroupLayouts: [bindgroupLayout] });

    const pipeline = device.createRenderPipeline({
        label,
        layout: pipelineLayout,
        vertex: {
            entryPoint: 'vs',
            module,
        },
        fragment: {
            entryPoint: 'fs',
            targets: [{ format: texture.format }],
            module,
        },
    });

    colorAttachment.view = texture.createView({ mipLevelCount: 1, baseMipLevel: 0 });
    await device.queue.onSubmittedWorkDone();

    for (let i = 1; i < texture.mipLevelCount; i += 1) {
        const bindgroup = device.createBindGroup({
            label,
            layout: bindgroupLayout,
            entries: [
                {
                    binding: 0,
                    resource: colorAttachment.view,
                },
                {
                    binding: 1,
                    resource: sampler,
                },
            ],
        });

        colorAttachment.view = texture.createView({ mipLevelCount: 1, baseMipLevel: i });
        const encoder = device.createCommandEncoder();
        const pass = encoder.beginRenderPass({
            label,
            colorAttachments: [colorAttachment as GPURenderPassColorAttachment],
        });

        pass.setPipeline(pipeline);
        pass.setBindGroup(0, bindgroup);
        pass.draw(3);
        pass.end();

        device.queue.submit([encoder.finish()]);
        await device.queue.onSubmittedWorkDone();
    }
}

export function srgbTextureToLinear(device: GPUDevice, texture: GPUTexture) {
    const code = /* wgsl */ `
        @group(0) @binding(0) var image: texture_2d<f32>;
        @group(0) @binding(1) var imageSampler: sampler;

        ${blit}

        fn sRGBToLinear(color: vec3f) -> vec3f {
            return select( 
                pow(color * 0.9478672986 + 0.0521327014, vec3(2.4)), 
                color * 0.0773993808, 
                color <= vec3(0.04045), 
            );
        }  

        @fragment
        fn fs(@location(0) uv: vec2f) -> @location(0) vec4f  {
            let sample = textureSample(image, imageSampler, uv);
            let color = sRGBToLinear(sample.rgb);
            return vec4(color, sample.a);
        }
    `;

    const label = padTemplate`srgb to linear${texture.label}`;

    const size = { width: texture.width, height: texture.height };

    const tempTexture = device.createTexture({
        format: texture.format,
        usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.TEXTURE_BINDING,
        size,
    });

    const bindgroupLayout = device.createBindGroupLayout({
        label,
        entries: [
            {
                binding: 0,
                texture: {},
                visibility: GPUShaderStage.FRAGMENT,
            },
            {
                binding: 1,
                sampler: {},
                visibility: GPUShaderStage.FRAGMENT,
            },
        ],
    });

    const sampler = device.createSampler({
        minFilter: 'linear',
        magFilter: 'linear',
    });

    const module = device.createShaderModule({ label, code: code });
    const pipelineLayout = device.createPipelineLayout({ label, bindGroupLayouts: [bindgroupLayout] });

    const pipeline = device.createRenderPipeline({
        label,
        layout: pipelineLayout,
        vertex: {
            entryPoint: 'vs',
            module,
        },
        fragment: {
            entryPoint: 'fs',
            targets: [{ format: texture.format }],
            module,
        },
    });

    const bindgroup = device.createBindGroup({
        label,
        layout: bindgroupLayout,
        entries: [
            {
                binding: 0,
                resource: tempTexture.createView(),
            },
            {
                binding: 1,
                resource: sampler,
            },
        ],
    });

    const encoder = device.createCommandEncoder();
    encoder.copyTextureToTexture(
        { texture },
        { texture: tempTexture },
        size,
    );

    const pass = encoder.beginRenderPass({
        label,
        colorAttachments: [{
            view: texture.createView({ mipLevelCount: 1, baseMipLevel: 0 }),
            loadOp: 'clear',
            storeOp: 'store',
        }],
    });

    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindgroup);
    pass.draw(3);
    pass.end();

    device.queue.submit([encoder.finish()]);
}
