import GBuffer from './gbuffer';
import brdfs from '../shaders/brdfs.shader';
import blit from '../shaders/blit-vert.shader';
import GlobalUniforms from './global-uniforms';
import { createBfrdLut } from './ibl-textures/create-bfrd-lut';
import createIrradianceTexture from './ibl-textures/create-irradiance-texture';
import createRadianceTexture from './ibl-textures/create-radiance-texture';

export default class DeferredPass {
    static readonly code = /* wgsl */`
        ${GlobalUniforms.code(0)}
        ${GBuffer.code(1)}

        @group(2) @binding(0) var radianceTexture: texture_cube<f32>;
        @group(2) @binding(1) var irradianceTexture: texture_cube<f32>;
        @group(2) @binding(2) var brdfTexture: texture_2d<f32>;
        @group(2) @binding(3) var generalSampler: sampler;

        ${brdfs}
        ${blit}

        @fragment
        fn fs(@builtin(position) pos: vec4f, @location(0) uv: vec2f) -> @location(0) vec4f {
            let uvi = vec2<u32>(pos.xy);
            let depth = textureLoad(gBufferDepth, uvi, 0);

            if (depth >= 1.0) { discard; }

            let uvClip = vec2(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0);
            let clipPos = vec4(uvClip, depth, 1.0);
            let viewPos = globals.inverseViewToClip * clipPos;
            let worldDir = globals.inverseWorldToView * vec4(viewPos.xyz / viewPos.w, 0.0);
            let view = -normalize(worldDir.xyz);

            let normal = textureLoad(gBufferNormal, uvi, 0).rgb;
            let albedo = textureLoad(gBufferAlbedo, uvi, 0).rgb;
            let emission = textureLoad(gBufferEmission, uvi, 0).rgb;
            let metallicRoughnessSample = textureLoad(gBufferMetallicRoughness, uvi, 0);
            let metallic = metallicRoughnessSample.r;
            let roughness = metallicRoughnessSample.g;
            let alpha = roughness * roughness;
            let a2 = alpha * alpha;

            let NoV = saturate(dot(normal, view));
            let F0 = mix(vec3f(0.04), albedo, metallic);
            let R = reflect(-view, normal);

            let level = roughness * f32(textureNumLevels(radianceTexture) - 1u);
            let radiance = textureSampleLevel(radianceTexture, generalSampler, R, level).rgb;
            let irradiance = textureSample(irradianceTexture, generalSampler, normal).rgb;
            let brdf = textureSample(brdfTexture, generalSampler, saturate(vec2f(NoV, roughness))).xy;

            // Roughness dependent fresnel
            let Fr = max(vec3f(1.0 - roughness), F0) - F0;
            let kS = F0 + Fr * pow(1.0 - NoV, 5.0);
            let FssEss = kS * brdf.x + brdf.y;

            // Multiple scattering, originally proposed by Fdez-Aguera
            // and here adapted from https://bruop.github.io/ibl
            let Ems = 1.0 - (brdf.x + brdf.y);
            let Favg = F0 + (1.0 - F0) / 21.0;
            let FmsEms = Ems * FssEss * Favg / (1.0 - Favg * Ems);
            let kD = albedo * (1.0 - 0.04) * (1.0 - metallic) * (1.0 - FssEss + FmsEms);

            let specular = FssEss * radiance;
            let diffuse = (FmsEms + kD) * irradiance;
            let ambient = specular + diffuse + emission;

            return vec4f(ambient, 1.0);
        }
    `;

    target: GPURenderPassColorAttachment = {
        view: undefined!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
        clearValue: { r: 0, g: 0, b: 0, a: 1 },
        loadOp: 'clear',
        storeOp: 'store',
    };

    bfrdLut = createBfrdLut({ device: this.device });
    bfrdLutView = this.bfrdLut.createView();

    irradianceTexture?: GPUTexture;
    irradianceView?: GPUTextureView;
    radianceTexture?: GPUTexture;
    radianceView?: GPUTextureView;
    bindgroup?: GPUBindGroup;

    sampler: GPUSampler;
    pipeline: GPURenderPipeline;
    bindgroupLayout: GPUBindGroupLayout;

    readonly passDescriptor: GPURenderPassDescriptor = { colorAttachments: [this.target] };

    set skybox(texture: GPUTexture) {
        this.irradianceTexture = createIrradianceTexture({
            texture,
            device: this.device,
            usage: GPUTextureUsage.TEXTURE_BINDING,
        });

        this.radianceTexture = createRadianceTexture({
            texture,
            device: this.device,
            usage: GPUTextureUsage.TEXTURE_BINDING,
        });

        this.irradianceView = this.irradianceTexture.createView({ dimension: 'cube' });
        this.radianceView = this.radianceTexture.createView({ dimension: 'cube' });

        this.bindgroup = this.device.createBindGroup({
            layout: this.bindgroupLayout,
            entries: [
                {
                    binding: 0,
                    resource: this.radianceView,
                },
                {
                    binding: 1,
                    resource: this.irradianceView,
                },
                {
                    binding: 2,
                    resource: this.bfrdLutView,
                },
                {
                    binding: 3,
                    resource: this.sampler,
                },
            ],
        });
    }

    constructor(public device: GPUDevice, public globals: GlobalUniforms, public gbuffer: GBuffer, format: GPUTextureFormat, skybox?: GPUTexture) {
        this.sampler = device.createSampler({ magFilter: 'linear', minFilter: 'linear', mipmapFilter: 'linear' });

        if (skybox != null) this.skybox = skybox;

        this.bindgroupLayout = device.createBindGroupLayout({
            label: 'deferred pass',
            entries: [
                {
                    binding: 0,
                    visibility: GPUShaderStage.FRAGMENT,
                    texture: { viewDimension: 'cube' },
                },
                {
                    binding: 1,
                    visibility: GPUShaderStage.FRAGMENT,
                    texture: { viewDimension: 'cube' },
                },
                {
                    binding: 2,
                    visibility: GPUShaderStage.FRAGMENT,
                    texture: { viewDimension: '2d' },
                },
                {
                    binding: 3,
                    visibility: GPUShaderStage.FRAGMENT,
                    sampler: {},
                },
            ],
        });

        const layout = device.createPipelineLayout({
            label: 'deferred pass bindgroup layout',
            bindGroupLayouts: [
                this.globals.bindGroupLayout,
                this.gbuffer.bindGroupLayout,
                this.bindgroupLayout,
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
        if (this.bindgroup == null) return;
        pass.setPipeline(this.pipeline);
        pass.setBindGroup(0, this.globals.bindgroup);
        pass.setBindGroup(1, this.gbuffer.bindgroup);
        pass.setBindGroup(2, this.bindgroup);
        pass.draw(3);
    }
}
