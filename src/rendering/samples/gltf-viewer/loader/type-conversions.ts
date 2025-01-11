import { PipelineFeatureFlags } from '../../../core/default-forward-pass/pipeline-feature-flags';

export type AccessorComponentType = 5120 | 5121 | 5122 | 5123 | 5125 | 5126;

export type AccessorType = 'SCALAR' | 'VEC2' | 'VEC3' | 'VEC4' | 'MAT2' | 'MAT3' | 'MAT4';

export type AttributeDetails = {
    name: string,
    type: AccessorType,
    componentType: AccessorComponentType,
    strip?: boolean,
    depends?: string[],
    feature?: PipelineFeatureFlags,
    fill?: number[],
};

export const enum ComponentType {
    int8 = 5120,
    uint8 = 5121,
    int16 = 5122,
    uint16 = 5123,
    uint32 = 5125,
    float32 = 5126,
}

export const typeToElementCount: Record<AccessorType, number> = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 12,
    MAT4: 16,
};

export const componentToSize: Record<ComponentType, number> = {
    [ComponentType.int8]: 1,
    [ComponentType.uint8]: 1,
    [ComponentType.int16]: 2,
    [ComponentType.uint16]: 2,
    [ComponentType.uint32]: 4,
    [ComponentType.float32]: 4,
};

export const enum TopologyMode {
    Points = 0,
    LineList = 1,
    LineLoop = 2,
    LineStrip = 3,
    TriangleList = 4,
    TriangleStrip = 5,
    TriangleFan = 6,
}

export const modeToTopology: Partial<Record<TopologyMode, PipelineFeatureFlags>> = {
    [TopologyMode.Points]: PipelineFeatureFlags.PointList, // POINTS
    [TopologyMode.LineList]: PipelineFeatureFlags.LineList, // LINES
    // 2: LINE_LOOP (unsupported by webgpu)
    // 3: PipelineFeatureFlags.LineStrip, // LINE_STRIP
    [TopologyMode.TriangleList]: PipelineFeatureFlags.TriangleList, // TRIANGLES
    // 5: PipelineFeatureFlags.TriangleStrip, // TRIANGLE_STRIP
    // 6: TRIANGLE_FAN (unsupported by webgpu)
};
