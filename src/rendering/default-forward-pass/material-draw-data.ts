import { Vec3n, Vec4n } from 'wgpu-matrix';
import DescriptorMap from './descriptor-map';
import { featureFlagsToString, PipelineFeatureFlags } from './pipeline-feature-flags';
import { PrimitiveDrawData } from './primitive-draw-data';
import { createAndCopyBuffer } from '../../utils/data-copy';

export type MaterialDescriptor = {
    name?: string,

    baseColorFactor: Vec4n,
    baseColorTexture: GPUTexture,
    baseColorSampler: GPUSamplerDescriptor,

    roughnessFactor: number,
    metallicFactor: number,
    metallicRoughnessTexture: GPUTexture,
    metallicRoughnessSampler: GPUSamplerDescriptor,

    normalTexture: GPUTexture,
    normalSampler: GPUSamplerDescriptor,

    alphaCutoff?: number,

    emissiveFactor?: Vec3n,
    emissiveTexture?: GPUTexture,
    emissiveSampler?: GPUSamplerDescriptor,

    doubleSided?: boolean,
};

export class MaterialDrawData {
    layout: GPUBindGroupLayout;
    primitives: PrimitiveDrawData[] = [];
    matData: MaterialDescriptor;
    bindGroup: GPUBindGroup;
    propertiesBuffer: GPUBuffer;
    features: PipelineFeatureFlags;

    constructor(
        data: MaterialDescriptor,
        device: GPUDevice,
        descriptorMap: DescriptorMap,
        primitiveFeatures: PipelineFeatureFlags,
        primitives?: PrimitiveDrawData[],
    ) {
        this.features = primitiveFeatures;
        if (data.doubleSided) this.features |= PipelineFeatureFlags.DoubleSided;

        // TODO : don't hardcode the properties features
        const properties = new Float32Array(12);
        properties.set(data.baseColorFactor);
        properties[4] = data.metallicFactor;
        properties[5] = data.roughnessFactor;

        if (data.alphaCutoff != null) {
            this.features |= PipelineFeatureFlags.AlphaCutoff;
            properties[6] = data.alphaCutoff;
        }

        if (data.emissiveFactor != null) {
            properties.set(data.emissiveFactor, 8);
        }

        this.propertiesBuffer = createAndCopyBuffer(
            properties,
            GPUBufferUsage.UNIFORM,
            device,
        );

        const entries = [
            { binding: 0, resource: { buffer: this.propertiesBuffer } },
            { binding: 1, resource: descriptorMap.getSampler(data.baseColorSampler) },
            { binding: 2, resource: data.baseColorTexture.createView({ dimension: '2d' }) },
            { binding: 3, resource: descriptorMap.getSampler(data.normalSampler) },
            { binding: 4, resource: data.normalTexture.createView({ dimension: '2d' }) },
            { binding: 5, resource: descriptorMap.getSampler(data.metallicRoughnessSampler) },
            { binding: 6, resource: data.metallicRoughnessTexture.createView({ dimension: '2d' }) },
        ];

        if (data.emissiveTexture != null) {
            this.features |= PipelineFeatureFlags.Emissive;

            entries.push({
                binding: 7,
                resource: descriptorMap.getSampler(data.emissiveSampler ?? {}),
            });

            entries.push({
                binding: 8,
                resource: data.emissiveTexture.createView({ dimension: '2d' }),
            });
        }

        this.layout = descriptorMap.getMaterialBindGroup(this.features);
        this.matData = data;
        this.bindGroup = device.createBindGroup({
            label: featureFlagsToString(this.features),
            layout: this.layout,
            entries,
        });

        if (primitives != null) {
            this.addPrimitives(...primitives);
        }
    }

    draw(passEncoder: GPURenderPassEncoder, queue: GPUQueue) {
        if (this.primitives.length === 0) return;

        passEncoder.setBindGroup(1, this.bindGroup);
        for (const primitive of this.primitives) {
            primitive.draw(passEncoder, queue);
        }
    }

    addPrimitives(...drawData: PrimitiveDrawData[]) {
        const filtered = drawData.filter((data) => {
            if ((data.features & this.features) === data.features) return true;
            console.warn(`invalid primitive added to material: 
primitive: ${data.name}
primitive features: ${featureFlagsToString(data.features).toString()}
material: ${this.matData.name}
material features: ${featureFlagsToString(this.features).toString()}`);
            return false;
        });
        this.primitives.push(...filtered);
    }
}
