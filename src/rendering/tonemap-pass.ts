import blit from '../shaders/blit-vert.shader';

const label = 'tonemap pass';

export default class TonemapPass {
    static readonly code = /* wgsl */`
        @group(0) @binding(0) var colorTexture: texture_2d<f32>;

        ${blit}

        fn fitRRTAndODT(color: vec3f) -> vec3f {
            let a = color * (color + 0.0245786) - 0.000090537;
            let b = color * (0.983729 * color + 0.4329510) + 0.238081;
            return a / b;
        }

        fn aces_tone_map(hdr: vec3f) -> vec3f {
            const inputMat = mat3x3(
                0.59719, 0.07600, 0.02840,
                0.35458, 0.90834, 0.13383,
                0.04823, 0.01566, 0.83777,
            );
            const outputMat = mat3x3(
                1.60475, -0.10208, -0.00327,
                -0.53108, 1.10813, -0.07276,
                -0.07367, -0.00605, 1.07602,
            );
            const boost = 1.0 / 0.6;

            var color = hdr * boost;
            color = inputMat * color;
            color = fitRRTAndODT(color);
            color = outputMat * color;
            return saturate(color);
        }

        fn linear_to_srgb(color: vec3f) -> vec3f {
            return pow(color, vec3(1.0/2.2));
        }

        @fragment
        fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
            let uv = vec2<i32>(floor(pos.xy));

            var color = textureLoad(colorTexture, uv, 0).rgb;
            color = aces_tone_map(color);
            color = linear_to_srgb(color);
            return vec4f(color, 1.0);
        }
    `;

    static readonly bindGroupLayoutDescriptor: GPUBindGroupLayoutDescriptor = {
        label,
        entries: [{
            binding: 0,
            texture: { sampleType: 'float', viewDimension: '2d' },
            visibility: GPUShaderStage.FRAGMENT,
        }],
    };

    colorAttachment: GPURenderPassColorAttachment = {
        loadOp: 'load',
        storeOp: 'store',
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        view: undefined!,
    };

    passDescriptor: GPURenderPassDescriptor = {
        label,
        colorAttachments: [this.colorAttachment],
    };

    pipeline: GPURenderPipeline;
    pipelineDescriptor: GPURenderPipelineDescriptor;

    renderTarget: GPUColorTargetState;
    bindgroupLayout: GPUBindGroupLayout;
    bindgroup?: GPUBindGroup;

    constructor(
        public device: GPUDevice,
        format: GPUTextureFormat,
    ) {
        this.renderTarget = { format };
        this.bindgroupLayout = device.createBindGroupLayout(TonemapPass.bindGroupLayoutDescriptor);
        const module = device.createShaderModule({ label, code: TonemapPass.code });

        this.pipelineDescriptor = {
            label,
            layout: device.createPipelineLayout({
                label,
                bindGroupLayouts: [this.bindgroupLayout],
            }),
            vertex: {
                module,
                entryPoint: 'vs',
            },
            fragment: {
                module,
                entryPoint: 'fs',
                targets: [this.renderTarget],
            },
        };

        this.pipeline = device.createRenderPipeline(this.pipelineDescriptor);
    }

    updateInput(input: GPUTextureView) {
        this.bindgroup = this.device.createBindGroup({
            label,
            layout: this.bindgroupLayout,
            entries: [{
                binding: 0,
                resource: input,
            }],
        });
    }

    render(encoder: GPUCommandEncoder, output: GPUTexture) {
        if (this.bindgroup == null) return;

        if (this.renderTarget.format !== output.format) {
            this.renderTarget.format = output.format;
            this.pipeline = this.device.createRenderPipeline(this.pipelineDescriptor);
        }

        this.colorAttachment.view = output.createView({ dimension: '2d' });

        const pass = encoder.beginRenderPass(this.passDescriptor);
        pass.setPipeline(this.pipeline);
        pass.setBindGroup(0, this.bindgroup);
        pass.draw(3);
        pass.end();
    }
}
