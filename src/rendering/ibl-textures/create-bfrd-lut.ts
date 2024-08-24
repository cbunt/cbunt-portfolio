import brdfs from '../../shaders/brdfs.shader';
import blit from '../../shaders/blit-vert.shader';

const code = /* wgsl */ `
override SAMPLE_COUNT: u32 = 1024u;

${blit}
${brdfs}

@fragment
fn fs(@location(0) uv: vec2f) -> @location(0) vec4f  {
    let NoV = uv.x;
    let roughness = uv.y;
    let alpha = roughness * roughness;
    let a2 = alpha * alpha;
    let V = vec3(sqrt(1.0 - NoV * NoV), NoV, 0.0);
    let N = vec3(0.0, 1.0, 0.0);

    var brdf = vec2(0.0);

    for (var i = 0u; i < SAMPLE_COUNT; i++) {
        let Xi = hammersley(i, SAMPLE_COUNT);
        let H = tangentSampleGGX(N, Xi, a2);
        let L = normalize(2.0 * dot(V, H) * H - V);

        let NoL = saturate(L.y);
        let NoH = saturate(H.y);
        let VoH = saturate(dot(V, H));

        if (NoL > 0.0) {
            let pdf = vCorrelatedGGX(NoV, NoL, a2) * VoH * NoL / NoH;
            let Fc = pow(1.0 - VoH, 5.0);
            brdf += vec2(1.0 - Fc, Fc) * pdf;
        }
    }

    return vec4f(brdf * 4.0 / f32(SAMPLE_COUNT), 0.0, 1.0);
}
`;

export type BfrdLutDescriptor = {
    device: GPUDevice,
    label?: string,
    width?: number,
    height?: number,
    format?: GPUTextureFormat,
    sampleCount?: number,
};

export function createBfrdLut({
    device,
    label,
    sampleCount,
    width = 1024,
    height = 1024,
    format = 'rg32float',
}: BfrdLutDescriptor) {
    const bfrdLut = device.createTexture({
        label,
        format,
        dimension: '2d',
        usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
        size: { width, height },
    });

    const module = device.createShaderModule({ label: 'bfrdLut shader', code });

    const pipeline = device.createRenderPipeline({
        label: 'bfrd lut pipeline',
        layout: 'auto',
        vertex: {
            entryPoint: 'vs',
            module,
        },
        fragment: {
            entryPoint: 'fs',
            targets: [{ format }],
            constants: sampleCount ? { SAMPLE_COUNT: sampleCount } : undefined,
            module,
        },
    });

    const encoder = device.createCommandEncoder();
    const pass = encoder.beginRenderPass({
        label: 'brdf lut render pass',
        colorAttachments: [{
            view: bfrdLut.createView(),
            loadOp: 'clear',
            storeOp: 'store',
        }],
    });

    pass.setPipeline(pipeline);
    pass.draw(3);
    pass.end();

    device.queue.submit([encoder.finish()]);

    return bfrdLut;
}
