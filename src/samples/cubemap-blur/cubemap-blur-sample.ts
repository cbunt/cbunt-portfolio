import { showSaveFilePicker } from 'native-file-system-adapter';

import shoreline from 'public/environment-maps/shoreline.ktx2';
import papermill from 'public/environment-maps/papermill.ktx2';
import market from 'public/environment-maps/leland-market.ktx2';

import propertyListener, { ListenerSyms } from '../property-listener';
import { copyKTX, textureToKTX } from '../../utils/data-copy';
import cubemapGuassianPyramid from './cubemap-guassian-pyramid';
import { mapValues } from '../../utils/general';
import Renderer, { ForwardPassParams } from '../../rendering/renderer';

enum BlurState { IDLE, BLUR, WAIT }

export default class CubemapBlurModel {
    static title = '';
    static description = '';

    skybox?: GPUTexture;
    state: BlurState = BlurState.IDLE;

    readonly #settings = propertyListener({
        nearestSample: {
            [ListenerSyms.$type]: 'checkbox' as const,
            [ListenerSyms.$callback]: (val: unknown) => {
                if (typeof val === 'boolean') this.renderer.skyboxPass.useNearestSample = val;
            },
            value: false,
            description: 'Disables linear sampling in the viewer.',
        },
        mipLevel: {
            [ListenerSyms.$type]: 'slider' as const,
            [ListenerSyms.$callback]: (value: unknown) => {
                if (typeof value === 'number') this.renderer.skyboxPass.mipLevel = value;
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
    readonly priority = 0;

    constructor(public renderer: Renderer) {
        renderer.addForwardPass(this);
    }

    processSkybox(file: string | URL | File | ArrayBuffer) {
        return copyKTX(file, this.renderer.device, {
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
        this.renderer.skyboxPass.mipLevel = 1;

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
            device: this.renderer.device,
            texture: this.skybox,
            steps: this.settings.filterDistance.value,
            inPlace: true,
            delayWork: requestAnimationFrame,
        });

        this.resolve();
    }

    refresh() {
        if (this.skybox == null) return;
        this.renderer.skyboxPass.skyTexture = this.skybox.createView({ dimension: 'cube' });
    }

    async saveFile() {
        if (this.skybox == null) return;
        try {
            const proms = Promise.all([
                textureToKTX(this.renderer.device, this.skybox, true),
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

    render({ encoder, gbuffer }: ForwardPassParams) {
        encoder.beginRenderPass({
            colorAttachments: [],
            depthStencilAttachment: {
                depthClearValue: 1,
                depthLoadOp: 'clear',
                depthStoreOp: 'store',
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                view: gbuffer.depth.view!,
            },
        }).end();
    }
}
