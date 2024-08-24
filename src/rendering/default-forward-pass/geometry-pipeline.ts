import DescriptorMap from './descriptor-map';
import { MaterialDrawData } from './material-draw-data';
import { PipelineFeatureFlags, maskRedundantFeatures } from './pipeline-feature-flags';

export default class GeometryPipeline {
    features: PipelineFeatureFlags;
    pipeline: GPURenderPipeline;

    materials: MaterialDrawData[] = [];

    constructor(features: PipelineFeatureFlags, maps: DescriptorMap) {
        this.features = maskRedundantFeatures(features);

        const module = maps.getShaderModule(features);

        this.pipeline = maps.device.createRenderPipeline({
            layout: maps.getForwardPipelineLayout(features),
            primitive: maps.getPrimitiveState(features),
            vertex: {
                entryPoint: 'vs',
                buffers: [maps.getVertexLayout(features)],
                module,
            },
            fragment: {
                entryPoint: 'fs',
                module,
                targets: maps.gbuffer.targets,
            },
            depthStencil: {
                depthWriteEnabled: true,
                depthCompare: 'less-equal',
                format: maps.gbuffer.depth.format,
            },
        });
    }

    addMaterials(...materials: MaterialDrawData[]) {
        if (materials.some((data) => data.features !== this.features)) {
            throw new Error('invalid primitive added to material');
        }
        this.materials.push(...materials);
    }

    draw(passEncoder: GPURenderPassEncoder, queue: GPUQueue) {
        passEncoder.setPipeline(this.pipeline);
        for (const mat of this.materials) {
            mat.draw(passEncoder, queue);
        }
    }
}
