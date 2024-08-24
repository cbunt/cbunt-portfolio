import { toWorldDir } from '../../shaders/cubemap-sampling.shader';
import brdfs from '../../shaders/brdfs.shader';
import blit from '../../shaders/blit-vert.shader';
import { createAndCopyBuffer } from '../../utils/data-copy';

const code = /* wgsl */`
    override SAMPLES: u32 = 1024u;

    const PI = 3.14159265359;
    const invPI = 1.0 / PI;

    struct Params {
        face: u32,
        mipSize: u32,
        invOmegaP: f32,
        a2: f32,
    }

    @group(0) @binding(0) var environment: texture_cube<f32>;
    @group(0) @binding(1) var environmentSampler: sampler;
    @group(0) @binding(2) var<uniform> params: Params;

    ${toWorldDir}
    ${brdfs}
    ${blit}

    @fragment
    fn fs(@location(0) uv: vec2f) -> @location(0) vec4f {
        let N = toWorldDirF32(uv, params.face);

        var radiance = vec3(0.0);
        var totalWeight = 0.0;
        
        for (var i = 0u; i < SAMPLES; i += 1) {
            let Xi = hammersley(i, SAMPLES);
            let H = tangentSampleGGX(N, Xi, params.a2);
            let HoV = saturate(dot(H, N));
            let L = normalize(2.0 * HoV * H - N);
            let NoL = saturate(dot(N, L));

            if (NoL <= 0.0) { continue; }

            let pdf = dGGX(HoV, params.a2) / 4.0 + 0.001;
            let omegaS = 1.0 / (f32(SAMPLES) * pdf);
            let mipLevel = 0.5 * log2(omegaS * params.invOmegaP) + params.a2;

            radiance += textureSampleLevel(environment, environmentSampler, L, mipLevel).rgb * NoL;
            totalWeight += NoL;
        }
    
        return vec4(radiance / totalWeight, 1.0);
    }
`;

export type IrradianceTextureDescriptor = {
    device: GPUDevice,
    texture: GPUTexture,
    label?: string,
    usage?: GPUTextureUsageFlags,
    targetFormat?: GPUTextureFormat,
    outputTexture?: GPUTexture,
    outputWidth?: number,
    samples?: number,
    inPlaceMips?: boolean,
};

export default function createRadianceTexture({
    device,
    texture,
    targetFormat,
    usage = 0,
    label = 'radiance',
    samples = 1024,
    outputWidth,
    outputTexture,
}: IrradianceTextureDescriptor) {
    const format = outputTexture?.format ?? targetFormat ?? texture.format;
    const width = outputTexture?.width ?? outputWidth ?? texture.width;

    const bindgroupLayout = device.createBindGroupLayout({
        label,
        entries: [
            {
                binding: 0,
                visibility: GPUShaderStage.FRAGMENT,
                texture: { viewDimension: 'cube' },
            },
            {
                binding: 1,
                visibility: GPUShaderStage.FRAGMENT,
                sampler: {},
            },
            {
                binding: 2,
                visibility: GPUShaderStage.FRAGMENT,
                buffer: { type: 'uniform' },
            },
        ],
    });

    const sampler = device.createSampler({ minFilter: 'linear', magFilter: 'linear', mipmapFilter: 'linear' });
    const paramArrayBuffer = new ArrayBuffer(4 * 4);
    const uintParams = new Uint32Array(paramArrayBuffer, 0, 2);
    const floatParams = new Float32Array(paramArrayBuffer, 2 * 4, 2);

    const paramBuffer = createAndCopyBuffer(
        paramArrayBuffer,
        GPUBufferUsage.COPY_DST | GPUBufferUsage.UNIFORM,
        device,
    );

    const radianceTexture = outputTexture?.depthOrArrayLayers === 6
        ? outputTexture
        : device.createTexture({
            label,
            format,
            dimension: '2d',
            usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_DST | usage,
            size: { width, height: width, depthOrArrayLayers: 6 },
            mipLevelCount: Math.max((Math.log2(width) | 0) - 2, 1),
        });

    const copyEncoder = device.createCommandEncoder({
        label: `${label} copy encoder`,
    });

    copyEncoder.copyTextureToTexture(
        { texture, mipLevel: 0 },
        { texture: radianceTexture, mipLevel: 0 },
        { width, height: width, depthOrArrayLayers: 6 },
    );
    device.queue.submit([copyEncoder.finish()]);

    const pipelineLayout = device.createPipelineLayout({
        label,
        bindGroupLayouts: [bindgroupLayout],
    });

    const module = device.createShaderModule({ label, code });

    const pipeline = device.createRenderPipeline({
        label,
        layout: pipelineLayout,
        vertex: {
            module,
            entryPoint: 'vs',
        },
        fragment: {
            entryPoint: 'fs',
            targets: [{ format: radianceTexture.format }],
            constants: {
                SAMPLES: samples,
            },
            module,
        },
    });

    floatParams[0] = (6 * texture.width * texture.width) / (4 * Math.PI);

    void Promise.resolve().then(async () => {
        const bindgroup = device.createBindGroup({
            label,
            layout: bindgroupLayout,
            entries: [
                {
                    binding: 0,
                    resource: texture.createView({ dimension: 'cube' }),
                },
                {
                    binding: 1,
                    resource: sampler,
                },
                {
                    binding: 2,
                    resource: { buffer: paramBuffer },
                },
            ],
        });

        for (let mip = 1; mip < radianceTexture.mipLevelCount; mip += 1) {
            const roughness = mip / (radianceTexture.mipLevelCount - 1);
            floatParams[1] = roughness ** 4;
            uintParams[1] = (radianceTexture.width >> mip) | 0;

            for (let face = 0; face < 6; face += 1) {
                await device.queue.onSubmittedWorkDone();
                uintParams[0] = face;
                device.queue.writeBuffer(paramBuffer, 0, paramArrayBuffer);

                const view = radianceTexture.createView({
                    dimension: '2d',
                    arrayLayerCount: 1,
                    baseArrayLayer: face,
                    mipLevelCount: 1,
                    baseMipLevel: mip,
                });

                const encoder = device.createCommandEncoder();
                const pass = encoder.beginRenderPass({
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
        }
    });

    return radianceTexture;
}
