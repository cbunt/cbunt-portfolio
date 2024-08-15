import GlobalUniforms from './global-uniforms';
import { SkyboxTarget } from './render-model';

const label = 'skybox pass';

export default class SkyboxPass implements SkyboxTarget {
    static readonly code = /* wgsl */`
        ${GlobalUniforms.code(0)}

        struct SkyboxUniforms {
            mipBias: f32,
        };

        @group(1) @binding(0) var environmentTexture: texture_cube<f32>;
        @group(1) @binding(1) var depthTexture: texture_depth_2d;
        @group(1) @binding(2) var environmentSampler: sampler;
        @group(1) @binding(3) var<uniform> skyboxUniforms: SkyboxUniforms;

        struct Varyings {
            @builtin(position) position: vec4f,
            @location(0) pos: vec4f,
            @location(1) mipBias: f32,
        };
    
        @vertex 
        fn vs(@builtin(vertex_index) vNdx: u32) -> Varyings {
            const pos = array(
                vec2(-1.0,  3.0),
                vec2(-1.0, -1.0),
                vec2( 3.0, -1.0),
            );
    
            var vsOut: Varyings;
            vsOut.position = vec4(pos[vNdx], 0.0, 1.0);
    
            // Ignores the camera's translation without needing a separate rotation matrix.
            vsOut.pos = globals.inverseViewToClip * vsOut.position;
            let w = vsOut.pos.w;
            vsOut.pos.w = 0.0;
            vsOut.pos = globals.inverseWorldToView * vsOut.pos;
            vsOut.pos.w = w;

            vsOut.mipBias = clamp(skyboxUniforms.mipBias, 0, f32(textureNumLevels(environmentTexture)));
            return vsOut;
        }

        @fragment
        fn fs(in: Varyings) -> @location(0) vec4f {
            let dimensions = textureDimensions(depthTexture);
            let uv = min(vec2<u32>(floor(in.position.xy)), dimensions - 1);
            let depth = textureLoad(depthTexture, uv, 0);
            if (depth < 1.0) { discard; }

            let t = normalize(in.pos.xyz / in.pos.w) * vec3(-1.0, 1.0, 1.0);
            let color = textureSampleLevel(environmentTexture, environmentSampler, t, in.mipBias).rgb;
            return vec4(color, 1.0);
        }
    `;

    bindgroupLayout: GPUBindGroupLayout;
    pipelineLayout: GPUPipelineLayout;
    shader: GPUShaderModule;

    linearSampler: GPUSampler;
    nearestSampler: GPUSampler;
    textureBindgroup?: GPUBindGroup;

    uniformBuffer: GPUBuffer;
    uniformArray = new Float32Array(8);

    pipeline?: GPURenderPipeline;

    #skyTexture?: GPUTextureView;
    #depthTexture?: GPUTextureView;
    #targetFormat!: GPUTextureFormat;
    #useNearestSample = false;

    get mipLevel() { return this.uniformArray[0]; }
    set mipLevel(val: number) {
        if (val === this.uniformArray[0]) return;
        this.uniformArray[0] = val;
        this.device.queue.writeBuffer(this.uniformBuffer, 0, this.uniformArray, 0, 1);
    }

    get useNearestSample() { return this.#useNearestSample; }
    set useNearestSample(val: boolean) {
        if (val === this.#useNearestSample) return;
        this.#useNearestSample = val;
        this.#updateBindgroup();
    }

    get targetFormat() { return this.#targetFormat; }
    set targetFormat(format: GPUTextureFormat) {
        if (format === this.#targetFormat) return;
        this.#targetFormat = format;

        this.pipeline = this.device.createRenderPipeline({
            label,
            layout: this.pipelineLayout,
            vertex: {
                entryPoint: 'vs',
                module: this.shader,
            },
            fragment: {
                entryPoint: 'fs',
                targets: [{ format }],
                module: this.shader,
            },
        });
    }

    set skyTexture(skybox: GPUTextureView) {
        if (skybox === this.#skyTexture) return;
        this.#skyTexture = skybox;
        this.#updateBindgroup();
    }

    set depthTexture(depthTexture: GPUTextureView) {
        if (depthTexture === this.#depthTexture) return;
        this.#depthTexture = depthTexture;
        this.#updateBindgroup();
    }

    target: GPURenderPassColorAttachment = {
        clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
        loadOp: 'clear',
        storeOp: 'store',
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        view: undefined!,
    };

    readonly passDescriptor: GPURenderPassDescriptor = { colorAttachments: [this.target] };

    constructor(
        public device: GPUDevice,
        public globals: GlobalUniforms,
        targetFormat: GPUTextureFormat,
        skybox?: GPUTextureView,
    ) {
        this.bindgroupLayout = device.createBindGroupLayout({
            label,
            entries: [
                {
                    binding: 0,
                    texture: { viewDimension: 'cube' },
                    visibility: GPUShaderStage.FRAGMENT | GPUShaderStage.VERTEX,
                },
                {
                    binding: 1,
                    texture: {
                        viewDimension: '2d',
                        sampleType: 'depth',
                    },
                    visibility: GPUShaderStage.FRAGMENT,
                },
                {
                    binding: 2,
                    visibility: GPUShaderStage.FRAGMENT,
                    sampler: {},
                },
                {
                    binding: 3,
                    visibility: GPUShaderStage.VERTEX,
                    buffer: { type: 'uniform' },
                },
            ],
        });

        this.linearSampler = device.createSampler({
            minFilter: 'linear',
            magFilter: 'linear',
            mipmapFilter: 'linear',
        });

        this.nearestSampler = device.createSampler({
            minFilter: 'nearest',
            magFilter: 'nearest',
            mipmapFilter: 'nearest',
        });

        this.shader = device.createShaderModule({
            code: SkyboxPass.code,
            label,
        });

        this.pipelineLayout = device.createPipelineLayout({
            label,
            bindGroupLayouts: [
                globals.bindGroupLayout,
                this.bindgroupLayout,
            ],
        });

        this.uniformBuffer = device.createBuffer({
            label,
            size: 32,
            usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.UNIFORM,
        });

        this.targetFormat = targetFormat;
        if (skybox != null) this.skyTexture = skybox;
    }

    render(pass: GPURenderPassEncoder) {
        if (this.textureBindgroup == null || this.pipeline == null) return false;
        pass.setPipeline(this.pipeline);
        pass.setBindGroup(0, this.globals.bindgroup);
        pass.setBindGroup(1, this.textureBindgroup);
        pass.draw(3);
        return true;
    }

    #updateBindgroup() {
        if (this.#skyTexture == null || this.#depthTexture == null) return;

        this.textureBindgroup = this.device.createBindGroup({
            label,
            layout: this.bindgroupLayout,
            entries: [
                {
                    binding: 0,
                    resource: this.#skyTexture,
                },
                {
                    binding: 1,
                    resource: this.#depthTexture,
                },
                {
                    binding: 2,
                    resource: this.useNearestSample
                        ? this.nearestSampler
                        : this.linearSampler,
                },
                {
                    binding: 3,
                    resource: { buffer: this.uniformBuffer },
                },
            ],
        });
    }
}
