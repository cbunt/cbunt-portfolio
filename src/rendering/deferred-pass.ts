import GBuffer from './gbuffer';
import brdfs from '../shaders/brdfs.shader';
import blit from '../shaders/blit-vert.shader';
import GlobalUniforms from './global-uniforms';

export default class DeferredPass {
    static readonly code = /* wgsl */`
        ${GlobalUniforms.code(0)}
        ${GBuffer.code(1)}

        // @group(2) @binding(0) var radianceTexture: texture_cube<f32>;
        // @group(2) @binding(1) var irradianceTexture: texture_cube<f32>;
        // @group(2) @binding(2) var brdfTexture: texture_2d<f32>;
        // @group(2) @binding(3) var environmentSampler: sampler;
        // @group(2) @binding(4) var brdfSampler: sampler;

        ${brdfs}
        ${blit}

        @fragment
        fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
            let uv = vec2<i32>(floor(pos.xy));
            let depth = textureLoad(gBufferDepth, uv, 0);

            if (depth >= 1.0) { discard; }

            let clipPos = vec4((vec2f(uv) / vec2f(textureDimensions(gBufferDepth).xy)) * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
            let viewPos = globals.inverseViewToClip * clipPos;
            let view = normalize((globals.inverseWorldToView * vec4(viewPos.xyz / viewPos.w, 0.0)).xyz);
        
            let normal = textureLoad(gBufferNormal, uv, 0).rgb;
            let albedo = textureLoad(gBufferAlbedo, uv, 0).rgb;
            let emission = textureLoad(gBufferEmission, uv, 0).rgb;
            let metallicRoughnessSample = textureLoad(gBufferMetallicRoughness, uv, 0);
            let metallic = metallicRoughnessSample.r;
            let roughness = metallicRoughnessSample.g;
            let alpha = roughness * roughness;
            let a2 = alpha * alpha;
            let NoV = dot(normal, view);

            // let radiance = textureSampleLevel(radianceTexture, environmentSampler, view, 0.0).rgb;
            // let irradiance = textureSampleLevel(irradianceTexture, environmentSampler, view, 0.0).rgb;

            // let brdf = textureSample(brdfTexture, brdfSampler, vec2f(NoV, roughness)).xy;
            let F0 = mix(vec3f(0.04), albedo, metallic);

            // // Roughness dependent fresnel
            // let Fr = max(vec3f(1.0 - a2), F0) - F0;
            // let kS = F0 + Fr * pow(1.0 - NoV, 5.0);
            // let FssEss = kS * brdf.x + brdf.y;

            // // Multiple scattering, originally proposed by Fdez-Aguera
            // // and here adapted from https://bruop.github.io/ibl
            // let Ems = 1.0 - (brdf.x + brdf.y);
            // let Favg = F0 + (1.0 - F0) / 21.0;
            // let FmsEms = Ems * FssEss * Favg / (1.0 - Favg * Ems);
            // let kD = albedo * (1.0 - 0.04) * (1.0 - metallic) * (1.0 - FssEss + FmsEms);

            // let specular = FssEss * radiance;
            // let diffuse = (FmsEms + kD) * irradiance;

            var ambient = vec3(1.0);
            // var ambient = specular + diffuse + emission;
            return vec4f(albedo, 1.0);
        }
    `;

    pipeline: GPURenderPipeline;

    target: GPURenderPassColorAttachment = {
        view: undefined!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
        clearValue: { r: 0, g: 0, b: 0, a: 1 },
        loadOp: 'clear',
        storeOp: 'store',
    };

    irradianceTexture?: GPUTexture;
    radianceTexture?: GPUTexture;
    bindgroup?: GPUBindGroup;

    sampler: GPUSampler;

    readonly passDescriptor: GPURenderPassDescriptor = { colorAttachments: [this.target] };

    set skybox(skybox: GPUTexture) {

    }

    constructor(device: GPUDevice, public globals: GlobalUniforms, public gbuffer: GBuffer, format: GPUTextureFormat, skybox?: GPUTexture) {
        this.sampler = device.createSampler({ magFilter: 'linear', minFilter: 'linear', mipmapFilter: 'linear' });

        if (skybox != null) this.skybox = skybox;

        // const deferredBindGroupLayout = device.createBindGroupLayout({
        //     label: 'deferred pass bindgroup',
        //     entries: [
        //         {
        //             binding: 0,
        //             visibility: GPUShaderStage.FRAGMENT,
        //             texture: { viewDimension: 'cube' },
        //         },
        //         {
        //             binding: 1,
        //             visibility: GPUShaderStage.FRAGMENT,
        //             texture: { viewDimension: 'cube' },
        //         },
        //         {
        //             binding: 2,
        //             visibility: GPUShaderStage.FRAGMENT,
        //             texture: { viewDimension: '2d' },
        //         },
        //         {
        //             binding: 3,
        //             visibility: GPUShaderStage.FRAGMENT,
        //             sampler: {},
        //         },
        //         {
        //             binding: 4,
        //             visibility: GPUShaderStage.FRAGMENT,
        //             sampler: {},
        //         },
        //     ],
        // });

        const layout = device.createPipelineLayout({
            label: 'deferred pass bindgroup layout',
            bindGroupLayouts: [
                this.globals.bindGroupLayout,
                this.gbuffer.bindGroupLayout,
                // bindGroupLayout,
            ],
        });

        const module = device.createShaderModule({ code: DeferredPass.code, label: 'deferred pass shader' });

        this.pipeline = device.createRenderPipeline({
            layout,
            vertex: {
                entryPoint: 'vs',
                module,
            },
            fragment: {
                entryPoint: 'fs',
                targets: [{ format }],
                module,
            },
        });
    }

    render(pass: GPURenderPassEncoder) {
        // if (this.bindgroup == null) return;
        pass.setPipeline(this.pipeline);
        pass.setBindGroup(0, this.globals.bindgroup);
        pass.setBindGroup(1, this.gbuffer.bindgroup);
        pass.draw(3);
    }
}
