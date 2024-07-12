import { showSaveFilePicker } from 'native-file-system-adapter';

import shoreline from 'public/environment-maps/shoreline.ktx2';
import papermill from 'public/environment-maps/papermill.ktx2';
import market from 'public/environment-maps/leland-market.ktx2';

import { FullRenderModel } from '../sample-spec';
import propertyListener, { ListenerSyms } from '../property-listener';
import type { ViewInfo, SkyboxTarget } from '../../rendering/render-model';
import { copyKTX, textureToKTX } from '../../utils/data-copy';
import cubemapGuassianPyramid from './cubemap-guassian-pyramid';
import { mapValues } from '../../utils/general';

enum BlurState { IDLE, BLUR, WAIT }

export default class CubemapBlurModel implements FullRenderModel {
    static title = '';
    static description = '';

    colorAttachment: GPURenderPassColorAttachment = {
        clearValue: { r: 0, g: 0, b: 0, a: 1 },
        loadOp: 'clear',
        storeOp: 'store',
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        view: undefined!,
    };

    passDescriptor: GPURenderPassDescriptor = { colorAttachments: [this.colorAttachment] };

    depthTexture: GPUTexture;
    depthTextureView: GPUTextureView;

    skybox?: GPUTexture;
    state: BlurState = BlurState.IDLE;

    readonly #settings = propertyListener({
        nearestSample: {
            [ListenerSyms.$type]: 'checkbox' as const,
            [ListenerSyms.$callback]: (val: unknown) => {
                if (typeof val === 'boolean') this.skyboxTarget.useNearestSample = val;
            },
            value: this.skyboxTarget.useNearestSample,
            description: 'Disables linear sampling in the viewer.',
        },
        mipLevel: {
            [ListenerSyms.$type]: 'slider' as const,
            [ListenerSyms.$callback]: (value: unknown) => {
                if (typeof value === 'number') this.skyboxTarget.mipLevel = value;
            },
            value: 0,
            min: 0,
            max: 1,
            step: 0.1,
            description: 'The mip level to display in the viewer. 0 is the original image, max is completely blurred with 1 pixel faces.',
        },
        filterDistance: {
            [ListenerSyms.$type]: 'slider' as const,
            [ListenerSyms.$callback]: this.reblur.bind(this) as () => void,
            value: 2,
            max: 64,
            min: 0,
            step: 0.1,
            description: 'The number of pixels to blur from.',
        },
        skybox: {
            [ListenerSyms.$type]: 'file' as const,
            [ListenerSyms.$callback]: (val: unknown, key: PropertyKey) => {
                if (key === 'value' && val != null) void (val as Promise<GPUTexture>).then(this.setSkybox.bind(this));
            },
            accept: '.ktx2',
            selection: {
                value: 'papermill',
                initialValues: mapValues(
                    { papermill, shoreline, market },
                    this.processSkybox.bind(this),
                ),
            },
            process: this.processSkybox.bind(this),
        },
        'Download Result': {
            [ListenerSyms.$type]: 'button' as const,
            onClick: () => { void this.saveFile(); },
        },
    });

    readonly settings = this.#settings.publicSettings;

    constructor(
        private readonly device: GPUDevice,
        private readonly skyboxTarget: SkyboxTarget,
        target: ViewInfo,
    ) {
        this.depthTexture = device.createTexture({
            dimension: '2d',
            format: 'depth32float',
            size: { width: 1, height: 1 },
            usage: GPUTextureUsage.RENDER_ATTACHMENT
            | GPUTextureUsage.TEXTURE_BINDING,
        });

        this.depthTextureView = this.depthTexture.createView();
        this.colorAttachment.view = target.view;

        const encoder = device.createCommandEncoder({ label: 'cubemap blur dummy depth encoder' });
        const pass = encoder.beginRenderPass({
            colorAttachments: [],
            depthStencilAttachment: {
                depthClearValue: 1,
                depthLoadOp: 'clear',
                depthStoreOp: 'store',
                view: this.depthTextureView,
            },
        });
        pass.end();
        this.device.queue.submit([encoder.finish()]);
    }

    render(encoder: GPUCommandEncoder) {
        return encoder.beginRenderPass(this.passDescriptor);
    }

    setTarget(view: ViewInfo) {
        this.colorAttachment.view = view.view;
    }

    processSkybox(file: string | URL | File | ArrayBuffer) {
        return copyKTX(file, this.device, {
            mipLevelCount: 'max',
            textureUsage: GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.COPY_SRC,
            validate: true,
        });
    }

    async setSkybox(resource: GPUTexture | string | URL | File | ArrayBuffer) {
        this.skybox = resource instanceof GPUTexture
            ? resource
            : await this.processSkybox(resource);

        this.#settings.privateSettings.mipLevel.max = this.skybox.mipLevelCount - 1;
        this.#settings.privateSettings.mipLevel.value = 1;
        this.skyboxTarget.mipLevel = 1;

        void this.reblur();
    }

    resolve() {
        this.refresh();
        const lastState = this.state;
        this.state = BlurState.IDLE;
        if (lastState === BlurState.WAIT) void this.reblur();
    }

    async reblur() {
        if (this.skybox == null || this.state === BlurState.WAIT) return;

        if (this.state === BlurState.BLUR) {
            this.state = BlurState.WAIT;
            return;
        }

        this.state = BlurState.BLUR;

        await cubemapGuassianPyramid({
            device: this.device,
            texture: this.skybox,
            inPlace: true,
            steps: this.settings.filterDistance.value,
            delayWork: requestAnimationFrame,
        });

        this.resolve();
    }

    refresh() {
        if (this.skybox == null) return;
        this.skyboxTarget.skyTexture = this.skybox.createView({ dimension: 'cube' });
    }

    async saveFile() {
        if (this.skybox == null) return;
        try {
            const proms = Promise.all([
                textureToKTX(this.device, this.skybox, true),
                showSaveFilePicker({
                    types: [{ accept: { 'image/ktx2': ['.ktx2'] } }],
                    suggestedName: 'blurred-skybox.ktx2',
                }).then((handle) => handle.createWritable({ keepExistingData: false })),
            ]);

            const [ktx2, stream] = await proms;
            await new Blob([ktx2], { type: 'image/ktx2' }).stream().pipeTo(stream);
        } catch (e) {
            console.warn(e);
        }
    }
}
