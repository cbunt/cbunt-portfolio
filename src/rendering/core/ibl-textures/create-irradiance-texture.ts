import { toWorldDir } from '../../shaders/cubemap-sampling.shader';
import brdfs from '../../shaders/brdfs.shader';
import blit from '../../shaders/blit-vert.shader';
import { createAndCopyBuffer } from '../../utils/data-copy';

const code = /* wgsl */`
    const PI = 3.14159265359;

    override SAMPLES: u32 = 2048u;

    struct Params {
        face: u32,
        size: u32,
    }

    @group(0) @binding(0) var environment: texture_cube<f32>;
    @group(0) @binding(1) var environmentSampler: sampler;
    @group(0) @binding(2) var<uniform> params: Params;

    ${toWorldDir}
    ${brdfs}
    ${blit}

    @fragment
    fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
        let coord = vec3u(vec2u(floor(pos.xy)), params.face);
        let size = f32(textureDimensions(environment).x);
        let lodFactor = 6.0 * size * size / f32(SAMPLES);

        let N = toWorldDir(coord, params.size);
        let right = normalize(cross(vec3(0.0, 1.0, 0.0), N));
        let up = normalize(cross(N, right));
        let TBN = mat3x3(right, up, N);
        
        var irradiance = vec3(0.0);
        var samples = 0.0;

        for (var i = 0u; i < SAMPLES; i += 1) {
            let xi = hammersley(i, SAMPLES);
            let cosTheta = sqrt(1.0 - xi.y);
            let sinTheta = sqrt(xi.y);
            let phi = 2.0 * PI * xi.x;
            let invPdf = PI / cosTheta;
            let localDir = normalize(vec3(sinTheta * cos(phi), sinTheta * sin(phi), cosTheta));
            let worldDir = TBN * localDir;
            let lod = 0.5 * log2(lodFactor * invPdf);
            irradiance += textureSampleLevel(environment, environmentSampler, worldDir, lod).rgb;
        }

        return vec4(irradiance / f32(SAMPLES), 1.0);
    }
`;

export type IrradianceTextureDescriptor = {
    device: GPUDevice,
    texture: GPUTexture,
    label?: string,
    usage?: GPUTextureUsageFlags,
    samples?: number,
    outputWidth?: number,
    outputFormat?: GPUTextureFormat,
    outputTexture?: GPUTexture,
};

export default function createIrradianceTexture({
    device,
    texture,
    label = 'irradiance',
    usage = 0,
    samples = 2048,
    outputWidth,
    outputFormat,
    outputTexture,
}: IrradianceTextureDescriptor) {
    const format = outputTexture?.format ?? outputFormat ?? texture.format;
    const width = outputTexture?.width ?? outputWidth ?? 64;

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

    const irradianceTexture = outputTexture?.depthOrArrayLayers === 6
        ? outputTexture
        : device.createTexture({
                label,
                format,
                dimension: '2d',
                usage: GPUTextureUsage.RENDER_ATTACHMENT | usage,
                size: { width, height: width, depthOrArrayLayers: 6 },
            });

    const params = new Uint32Array([0, irradianceTexture.width]);
    const paramBuffer = createAndCopyBuffer(
        params,
        GPUBufferUsage.COPY_DST | GPUBufferUsage.UNIFORM,
        device,
    );

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
            constants: {
                SAMPLES: samples,
            },
            module,
            targets: [{ format }],
        },
    });

    for (let i = 0; i < 6; i += 1) {
        params[0] = i;
        device.queue.writeBuffer(paramBuffer, 0, params, 0, 1);

        const view = irradianceTexture.createView({
            dimension: '2d',
            arrayLayerCount: 1,
            baseArrayLayer: i,
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

    return irradianceTexture;
}
