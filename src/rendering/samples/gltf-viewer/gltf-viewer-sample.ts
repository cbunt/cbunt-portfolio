import { RenderModel } from '../settings/sample-spec';
import propertyListener, { ListenerSyms } from '../settings/property-listener';
import getSkyboxOptions from '../settings/skybox-options';

import GeometryPipeline from '../../core/default-forward-pass/geometry-pipeline';
import DescriptorMap from '../../core/default-forward-pass/descriptor-map';
import Renderer, { ForwardPassParams } from '../../core/renderer';
import { MaterialDescriptor } from '../../core/default-forward-pass/material-draw-data';
import { PipelineFeatureFlags } from '../../core/default-forward-pass/pipeline-feature-flags';

import cubemapGuassianPyramid from '../cubemap-blur/cubemap-guassian-pyramid';

import { AttributeDetails, ComponentType } from './loader/type-conversions';
import importGltf from './loader/gltf-loader';
import { DataType } from '@loaders.gl/core';
import { isObject } from '../../../utils/general';

const gltfIndex = await getGltfIndex();

async function getGltfIndex() {
    const indexUrl = GLTF_BASE_URL__ + GLTF_INDEX_FILE__;
    const indexRes = await fetch(indexUrl);
    const indexStr = await indexRes.text();
    const indexJson = JSON.parse(indexStr) as unknown;

    if (!Array.isArray(indexJson)) {
        throw new Error('Could not load index for glTF sample models.');
    }

    const entries: [string, string][] = indexJson.flatMap((gltf: unknown) => {
        if (
            !isObject(gltf)
            || !('label' in gltf)
            || typeof gltf.label !== 'string'
            || !('name' in gltf)
            || typeof gltf.name !== 'string'
            || !('variants' in gltf)
            || !isObject(gltf.variants)
            || typeof gltf.variants.glTF !== 'string'
        ) return [];

        const { variants: { glTF: file }, label, name } = gltf;
        const path = `${GLTF_BASE_URL__}${name}/glTF/${file}`;
        return [[label, path]];
    });

    return Object.fromEntries(entries);
}

export default class GltfModel implements RenderModel {
    static readonly goalLayout: AttributeDetails[] = [
        {
            name: 'POSITION',
            type: 'VEC3',
            componentType: ComponentType.float32,
        },
        {
            name: 'TEXCOORD_0',
            type: 'VEC2',
            componentType: ComponentType.float32,
        },
        {
            name: 'TANGENT',
            type: 'VEC4',
            componentType: ComponentType.float32,
            depends: ['NORMAL'],
            fill: [1, 0, 0, 1],
        },
        {
            name: 'NORMAL',
            type: 'VEC3',
            componentType: ComponentType.float32,
            strip: true,
            feature: PipelineFeatureFlags.VertexNormals,
        },
        {
            name: 'COLOR_0',
            type: 'VEC4',
            componentType: ComponentType.float32,
            strip: true,
            feature: PipelineFeatureFlags.VertexColors,
            fill: [1, 1, 1, 1],
        },
    ];

    geometryPipelines: Partial<Record<number, GeometryPipeline>> = {};
    descriptorMap: DescriptorMap;
    device: GPUDevice;

    get depthTextureView() {
        return this.descriptorMap.gbuffer.depth.view;
    }

    readonly #settings = propertyListener({
        skybox: getSkyboxOptions(this),
        model: {
            [ListenerSyms.$type]: 'file' as const,
            [ListenerSyms.$callback]: (val: unknown, key: PropertyKey) => {
                if (key !== 'value' || val == null) return;
                if (typeof val === 'string' || val instanceof File) {
                    void this.setModel(val);
                }
            },
            accept: '.hdr',
            value: 'Environment Test',
            initialValues: gltfIndex,
            process: (file: File) => file,
        },
    });

    readonly settings = this.#settings.publicSettings;
    readonly priority = 1000;

    constructor(public renderer: Renderer) {
        this.descriptorMap = new DescriptorMap(renderer.device, renderer.gbuffer, renderer.globals);
        this.device = renderer.device;
        this.renderer.addForwardPass(this);
    }

    async setSkybox(skybox: GPUTexture) {
        await cubemapGuassianPyramid({
            texture: skybox,
            device: this.renderer.device,
            inPlace: true,
            delayWork: requestAnimationFrame,
        });

        this.renderer.skybox = skybox;
    }

    async setModel(modelPath: string | DataType) {
        const size = { width: 1, height: 1 };
        const colorArray = new Float32Array([1, 1, 1, 1]);

        const opaqueWhite = this.renderer.device.createTexture({
            size,
            format: 'rgba32float',
            usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
        });
        this.renderer.device.queue.writeTexture({ texture: opaqueWhite }, colorArray, {}, size);

        const normalMap = this.renderer.device.createTexture({
            size,
            format: 'rgba32float',
            usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
        });
        colorArray.set([0.5, 0.5, 1, 1]);
        this.renderer.device.queue.writeTexture({ texture: normalMap }, colorArray, {}, size);

        const sampler = {
            addressModeU: 'repeat',
            addressModeV: 'repeat',
            magFilter: 'linear',
            minFilter: 'linear',
            mipmapFilter: 'linear',
        } as GPUSamplerDescriptor;

        const matData: MaterialDescriptor = {
            baseColorTexture: opaqueWhite,
            baseColorFactor: [1, 1, 1, 1],
            normalTexture: normalMap,
            metallicRoughnessTexture: opaqueWhite,
            metallicFactor: 1,
            roughnessFactor: 1,
            baseColorSampler: sampler,
            normalSampler: sampler,
            metallicRoughnessSampler: sampler,
        };

        this.geometryPipelines = await importGltf(
            modelPath,
            this.renderer.device,
            this.descriptorMap,
            matData,
            GltfModel.goalLayout,
            {},
        );
    }

    render({ encoder, gbuffer, globals }: ForwardPassParams) {
        const pass = encoder.beginRenderPass(gbuffer.passDescriptor);
        pass.setBindGroup(0, globals.bindgroup);

        for (const pipeline of Object.values(this.geometryPipelines)) {
            pipeline?.draw(pass, this.renderer.device.queue);
        }
        pass.end();
    }
}
