import testModel from 'public/gltfs/EnvironmentTest/EnvironmentTest.gltf';

import { FullRenderModel } from '../settings/sample-spec';
import propertyListener from '../settings/property-listener';

import { AttributeDetails, ComponentType } from './loader/type-conversions';
import importGltf from './loader/gltf-loader';

import GeometryPipeline from '../../rendering/default-forward-pass/geometry-pipeline';
import DescriptorMap from '../../rendering/default-forward-pass/descriptor-map';
import Renderer, { ForwardPassParams } from '../../rendering/renderer';
import { MaterialDescriptor } from '../../rendering/default-forward-pass/material-draw-data';
import { PipelineFeatureFlags } from '../../rendering/default-forward-pass/pipeline-feature-flags';
import cubemapGuassianPyramid from '../cubemap-blur/cubemap-guassian-pyramid';
import getSkyboxOptions from '../settings/skybox-options';

export default class GltfModel implements FullRenderModel {
    static readonly title = 'glTF Model Viewer';
    static readonly description = '';

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

    geometryPipelines: Record<number, GeometryPipeline> = {};
    descriptorMap: DescriptorMap;
    device: GPUDevice;

    get depthTextureView() {
        return this.descriptorMap.gbuffer.depth.view;
    }

    readonly #settings = propertyListener({
        skybox: getSkyboxOptions(this),
    });

    readonly settings = this.#settings.publicSettings;
    readonly priority = 1000;

    constructor(public renderer: Renderer) {
        this.descriptorMap = new DescriptorMap(renderer.device, renderer.gbuffer, renderer.globals);
        this.device = renderer.device;

        this.renderer.skyboxPass.mipLevel = 0;
        this.renderer.skyboxPass.useNearestSample = false;
        this.renderer.addForwardPass(this);

        void this.importglTF(testModel);
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

    async importglTF(modelPath: string) {
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

        await importGltf(
            modelPath,
            this.renderer.device,
            this.descriptorMap,
            matData,
            GltfModel.goalLayout,
            this.geometryPipelines,
        );
    }

    render({ encoder, gbuffer, globals }: ForwardPassParams) {
        const pass = encoder.beginRenderPass(gbuffer.passDescriptor);
        pass.setBindGroup(0, globals.bindgroup);

        for (const pipeline of Object.values(this.geometryPipelines)) {
            pipeline.draw(pass, this.renderer.device.queue);
        }
        pass.end();
    }
}
