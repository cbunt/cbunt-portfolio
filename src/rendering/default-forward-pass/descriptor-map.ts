import { PipelineFeatureFlags } from './pipeline-feature-flags';
import * as PipelineFeatures from './pipeline-feature-flags';
import include, { getBindgroupInfo as getBindGroupInfo } from '../../shaders/forward.shader';

import GBuffer from '../gbuffer';
import GlobalUniforms from '../global-uniforms';

type PipelineFeatureMap<T> = Partial<Record<number, T>>;

export default class DescriptorMap {
    static readonly flagToTopology: Partial<Record<PipelineFeatureFlags, GPUPrimitiveTopology>> = {
        [PipelineFeatureFlags.TriangleList]: 'triangle-list',
        [PipelineFeatureFlags.TriangleStrip]: 'triangle-strip',
        [PipelineFeatureFlags.PointList]: 'point-list',
        [PipelineFeatureFlags.LineList]: 'line-list',
        [PipelineFeatureFlags.LineStrip]: 'line-strip',
    };

    readonly pipelineLayouts: PipelineFeatureMap<GPUPipelineLayout> = {};
    readonly primitiveStates: PipelineFeatureMap<GPUPrimitiveState> = {};
    readonly vertexLayouts: PipelineFeatureMap<GPUVertexBufferLayout> = {};
    readonly shaderModules: PipelineFeatureMap<GPUShaderModule> = {};
    readonly bindgroupLayouts: PipelineFeatureMap<GPUBindGroupLayout> = {};

    readonly samplers: Partial<Record<string, GPUSampler>> = {};

    readonly forwardBindgroupLayout = this.device.createBindGroupLayout({
        label: `forward material`,
        entries: [{
            binding: 0,
            visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
            buffer: { type: 'read-only-storage' },
        }],
    });

    constructor(
        public readonly device: GPUDevice,
        public readonly gbuffer: GBuffer,
        public readonly globals: GlobalUniforms,
    ) { }

    getSampler(descriptor: GPUSamplerDescriptor) {
        const key = JSON.stringify(descriptor);
        this.samplers[key] ??= this.device.createSampler(descriptor);
        return this.samplers[key];
    }

    getVertexLayout(flags: PipelineFeatureFlags) {
        const masked: PipelineFeatureFlags = flags & PipelineFeatures.VertexBufferLayoutMask;

        if (this.vertexLayouts[masked] == null) {
            const attributes: GPUVertexAttribute[] = [
                { shaderLocation: 0, offset: 0, format: 'float32x3' }, // position
                { shaderLocation: 1, offset: 12, format: 'float32x2' }, // uv
            ];

            let arrayStride = 20;
            let shaderLocation = 2;

            if (masked & PipelineFeatureFlags.VertexNormals) {
                attributes.push({ shaderLocation, offset: arrayStride, format: 'float32x4' }); // tangent
                attributes.push({ shaderLocation: shaderLocation + 1, offset: arrayStride + 16, format: 'float32x3' }); // normal
                shaderLocation += 2;
                arrayStride += 28;
            }

            if (masked & PipelineFeatureFlags.VertexColors) {
                attributes.push({ shaderLocation, offset: arrayStride, format: 'float32x4' }); // color
                arrayStride += 16;
            }

            this.vertexLayouts[masked] = { attributes, arrayStride, stepMode: 'vertex' };
        }

        return this.vertexLayouts[masked];
    }

    getForwardPipelineLayout(flags: PipelineFeatureFlags) {
        const masked: PipelineFeatureFlags = flags & PipelineFeatures.PipelineLayoutMask;

        this.pipelineLayouts[masked] ??= this.device.createPipelineLayout({
            label: PipelineFeatures.featureFlagsToString(masked),
            bindGroupLayouts: [
                this.globals.bindGroupLayout,
                this.getMaterialBindGroup(flags),
                this.forwardBindgroupLayout,
            ],
        });

        return this.pipelineLayouts[masked];
    }

    getShaderModule(flags: PipelineFeatureFlags) {
        const masked: PipelineFeatureFlags = flags & PipelineFeatures.CodeMask;
        this.shaderModules[masked] ??= this.device.createShaderModule({
            label: PipelineFeatures.featureFlagsToString(masked),
            code: include(masked),
        });
        return this.shaderModules[masked];
    }

    getPrimitiveState(flags: PipelineFeatureFlags) {
        const masked = flags & PipelineFeatures.PrimitiveStateMask;

        this.primitiveStates[masked] ??= {
            topology: DescriptorMap.flagToTopology[(flags & PipelineFeatures.TopologyFormatMask) as PipelineFeatureFlags],
            cullMode: masked & PipelineFeatureFlags.DoubleSided ? 'none' : 'back',
            frontFace: masked & PipelineFeatureFlags.ClockwiseWinding ? 'cw' : 'ccw',
        };

        return this.primitiveStates[masked];
    }

    getMaterialBindGroup(flags: PipelineFeatureFlags) {
        const masked = flags & PipelineFeatures.MaterialBindgroupLayoutMask;
        this.bindgroupLayouts[masked] ??= this.device.createBindGroupLayout(getBindGroupInfo(masked));
        return this.bindgroupLayouts[masked];
    }
}
