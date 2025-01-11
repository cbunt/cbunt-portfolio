import Camera from './camera/camera';
import GlobalUniforms from './global-uniforms';
import TonemapPass from './tonemap-pass';
import SkyboxPass from './skybox-pass';
import GBuffer from './gbuffer';
import DeferredPass from './deferred-pass';

import { binaryInsert, debounce } from '../../utils/general';

export type ForwardPassParams = {
    encoder: GPUCommandEncoder,
    globals: GlobalUniforms,
    gbuffer: GBuffer,
};

export type ForwardPass = {
    render: (params: ForwardPassParams) => void,
    priority: number,
};

export default class Renderer {
    static readonly requiredFeatures: GPUFeatureName[] = ['float32-filterable'];
    static readonly outputFormat: GPUTextureFormat = navigator.gpu.getPreferredCanvasFormat();
    static readonly postProcessFormat: GPUTextureFormat = 'rgba32float';

    colorAttachment: GPURenderPassColorAttachment = {
        clearValue: { r: 0, g: 0, b: 0, a: 1 },
        loadOp: 'clear',
        storeOp: 'store',
        view: undefined!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
    };

    passDescriptor: GPURenderPassDescriptor = { colorAttachments: [this.colorAttachment] };

    context: GPUCanvasContext;
    camera: Camera;
    globals: GlobalUniforms;
    gbuffer: GBuffer;

    forwardPasses: ForwardPass[] = [];
    deferredPass: DeferredPass;
    skyboxPass: SkyboxPass;
    tonemapPass: TonemapPass;

    postprocessTarget!: GPUTexture;

    set skybox(texture: GPUTexture) {
        this.deferredPass.skybox = texture;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.skyboxPass.skyTexture = this.deferredPass.radianceView!;
    }

    constructor(
        public readonly canvas: HTMLCanvasElement,
        public readonly device: GPUDevice,
    ) {
        const size = { width: this.canvas.width, height: this.canvas.height };
        this.camera = new Camera(size);
        this.globals = new GlobalUniforms(this.device);
        this.gbuffer = new GBuffer(device, size);
        this.deferredPass = new DeferredPass(device, this.globals, this.gbuffer, Renderer.postProcessFormat);

        this.skyboxPass = new SkyboxPass(
            this.device,
            this.globals,
            Renderer.postProcessFormat,
        );
        this.tonemapPass = new TonemapPass(this.device, Renderer.outputFormat);

        const context = this.canvas.getContext('webgpu');
        if (context == null) throw new Error('renderer -- given canvas already initialized to non-webgpu context');

        this.context = context as unknown as GPUCanvasContext;

        this.context.configure({
            device: this.device,
            format: Renderer.outputFormat,
            usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
            alphaMode: 'opaque',
            colorSpace: 'srgb',
        });

        this.updateBackings(size);
        this.#createResizeObserver();
    }

    static async CreateInitialized(canvas: HTMLCanvasElement): Promise<Renderer> {
        const adapter = await navigator.gpu.requestAdapter();
        if (adapter == null) {
            throw new Error('Could not initialize GPU.');
        }

        const {
            maxComputeWorkgroupSizeX,
            maxComputeWorkgroupsPerDimension,
            maxComputeInvocationsPerWorkgroup,
        } = adapter.limits;

        const device = await adapter.requestDevice({
            label: 'main logical device',
            requiredFeatures: Renderer.requiredFeatures,
            requiredLimits: {
                maxComputeWorkgroupSizeX,
                maxComputeWorkgroupsPerDimension,
                maxComputeInvocationsPerWorkgroup,
            },
        });

        return new Renderer(canvas, device);
    }

    updateBackings(size: { width: number, height: number }) {
        this.camera.updateParams(size);
        this.postprocessTarget = this.device.createTexture({
            dimension: '2d',
            format: Renderer.postProcessFormat,
            usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
            size,
        });

        this.colorAttachment.view = this.postprocessTarget.createView();
        this.tonemapPass.updateInput(this.colorAttachment.view);
        this.gbuffer.size = size;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.skyboxPass.depthTexture = this.gbuffer.depth.view!;
    }

    #createResizeObserver() {
        const resizeCanvas = debounce((rawWidth: number, rawHeight: number) => {
            const width = Math.max(1, Math.min(rawWidth | 0, this.device.limits.maxTextureDimension2D));
            const height = Math.max(1, Math.min(rawHeight | 0, this.device.limits.maxTextureDimension2D));
            const dimensions = { width, height };
            this.canvas.width = width;
            this.canvas.height = height;
            this.updateBackings(dimensions);
        }, 20);

        try {
            const observer = new ResizeObserver((entries) => {
                const [{ inlineSize, blockSize }] = entries[entries.length - 1].devicePixelContentBoxSize;
                resizeCanvas(inlineSize, blockSize);
            });
            observer.observe(this.canvas, { box: 'device-pixel-content-box' });
        } catch {
            // Safari doesn't support device-pixel-content-box, so it would fail into this.
            const observer = new ResizeObserver((entries) => {
                const [{ inlineSize, blockSize }] = entries[entries.length - 1].contentBoxSize;
                resizeCanvas(inlineSize * devicePixelRatio, blockSize * devicePixelRatio);
            });
            observer.observe(this.canvas, { box: 'content-box' });
        }
    }

    addForwardPass(forwardPass: ForwardPass) {
        binaryInsert(this.forwardPasses, forwardPass, (a, b) => a.priority - b.priority);
    }

    render = () => {
        requestAnimationFrame(this.render);

        this.globals.updateDeviceBuffer(this.device.queue, this.camera);

        const encoder = this.device.createCommandEncoder({ label: 'main render encoder' });
        const forwardPassParams = { encoder, globals: this.globals, gbuffer: this.gbuffer };

        for (const forwardPass of this.forwardPasses) {
            forwardPass.render(forwardPassParams);
        }

        const pass = encoder.beginRenderPass(this.passDescriptor);
        this.deferredPass.render(pass);
        this.skyboxPass.render(pass);
        pass.end();

        this.tonemapPass.render(encoder, this.context.getCurrentTexture());

        this.device.queue.submit([encoder.finish()]);
    };
}
