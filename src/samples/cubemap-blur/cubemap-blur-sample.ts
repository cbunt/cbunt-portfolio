import { showSaveFilePicker } from 'native-file-system-adapter';

import getSkyboxOptions from '../settings/skybox-options';
import { FullRenderModel } from '../settings/sample-spec';
import propertyListener, { ListenerSyms } from '../settings/property-listener';

import { textureToKTX } from '../../utils/data-copy';
import Renderer, { ForwardPassParams } from '../../rendering/renderer';

import cubemapGuassianPyramid from './cubemap-guassian-pyramid';

enum BlurState { IDLE, BLUR, WAIT }

export default class CubemapBlurModel implements FullRenderModel {
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
        skybox: getSkyboxOptions(this),
        'Download Result': {
            [ListenerSyms.$type]: 'button' as const,
            onClick: () => { void this.saveFile(); },
        },
    });

    readonly settings = this.#settings.publicSettings;
    readonly priority = 0;
    device: GPUDevice;

    constructor(public renderer: Renderer) {
        renderer.addForwardPass(this);
        this.device = renderer.device;
    }

    setSkybox(skybox: GPUTexture) {
        this.skybox = skybox;
        this.#settings.privateSettings.mipLevel.max = this.skybox.mipLevelCount - 1;
        this.#settings.privateSettings.mipLevel.value = 1;
        this.renderer.skyboxPass.mipLevel = 1;

        this.refresh();
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
                textureToKTX(this.renderer.device, this.skybox, true)
                    .then((ktx2) => new Blob([ktx2], { type: 'image/ktx2' })),
                showSaveFilePicker({
                    types: [{ accept: { 'image/ktx2': ['.ktx2'] } }],
                    suggestedName: 'blurred-skybox.ktx2',
                }).then((handle) => handle.createWritable({ keepExistingData: false })),
            ]);

            const [blob, stream] = await proms;
            await blob.stream().pipeTo(stream);
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
                view: gbuffer.depth.view,
            },
        }).end();
    }
}
