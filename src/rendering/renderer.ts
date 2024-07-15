import Camera from './camera';
import ForwardUniforms from './forward-uniforms';
import TonemapPass from './tonemap-pass';
import SkyboxPass from './skybox-pass';
import { RenderModel, ModelConstructor } from './render-model';
import { debounce } from '../utils/general';

export default class Renderer {
    static readonly requiredFeatures: GPUFeatureName[] = ['float32-filterable'];
    static readonly outputFormat: GPUTextureFormat = navigator.gpu.getPreferredCanvasFormat();
    static readonly postProcessFormat: GPUTextureFormat = 'rgba32float';

    colorAttachment: GPURenderPassColorAttachment = {
        clearValue: { r: 0, g: 0, b: 0, a: 1 },
        loadOp: 'clear',
        storeOp: 'store',
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        view: undefined!,
    };

    passDescriptor: GPURenderPassDescriptor = { colorAttachments: [this.colorAttachment] };

    context: GPUCanvasContext;
    model?: RenderModel;

    camera: Camera;

    forwardUniforms: ForwardUniforms;
    skyboxPass: SkyboxPass;
    tonemapPass: TonemapPass;

    postprocessTarget!: GPUTexture;

    setModel(ModelCtor: ModelConstructor) {
        this.model = new ModelCtor(this.device, this.skyboxPass, {
            view: this.colorAttachment.view,
            format: Renderer.postProcessFormat,
            size: { width: this.canvas.width, height: this.canvas.height },
        });
        return this.model;
    }

    constructor(
        public canvas: HTMLCanvasElement,
        public device: GPUDevice,
    ) {
        const size = { width: this.canvas.width, height: this.canvas.height };
        this.camera = new Camera(size);
        this.forwardUniforms = new ForwardUniforms(this.device);
        this.tonemapPass = new TonemapPass(this.device, Renderer.outputFormat);

        this.skyboxPass = new SkyboxPass(
            this.device,
            this.forwardUniforms,
            Renderer.postProcessFormat,
        );

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
        this.model?.setTarget({
            view: this.colorAttachment.view,
            format: Renderer.postProcessFormat,
            size,
        });
        if (this.model != null) this.skyboxPass.depthTexture = this.model.depthTextureView;
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

    render = () => {
        requestAnimationFrame(this.render);

        this.forwardUniforms.updateDeviceBuffer(this.device.queue, this.camera);

        const encoder = this.device.createCommandEncoder({ label: 'main render encoder' });
        const pass = this.model?.render(encoder) ?? encoder.beginRenderPass(this.passDescriptor);
        this.skyboxPass.pass(pass);
        pass.end();

        this.tonemapPass.pass(encoder, this.context.getCurrentTexture());

        this.device.queue.submit([encoder.finish()]);
    };
}
