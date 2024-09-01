export enum PipelineFeatureFlags {
    Defaults = 0,

    /**
     * If the meshes have vertex normals.
     * If absent, meshes are shaded with flat normals.
    */
    VertexNormals = 1 << 0,

    /**
     * If the meshes have vertex colors.
     * If absent, mesh is shaded with a base color texture.
    */
    VertexColors = 1 << 1,

    AlphaCutoff = 1 << 2,
    Emissive = 1 << 3,

    DoubleSided = 1 << 4,
    ClockwiseWinding = 1 << 5,

    // Topology formats
    TriangleList = 0 << 6,
    TriangleStrip = 1 << 6,
    PointList = 2 << 6,
    LineList = 3 << 6,
    LineStrip = 4 << 6,
    Unindexed = 5 << 6,
    // LINE_LOOP (currently unsupported by webgpu)
    // TRIANGLE_FAN (currently unsupported by webgpu)
}

export const TopologyFormatMask = 0x111 << 6;

export const PrimitiveStateMask = (
    TopologyFormatMask
    | PipelineFeatureFlags.DoubleSided
    | PipelineFeatureFlags.ClockwiseWinding
);

export const CodeMask = ~(
    TopologyFormatMask
    | PipelineFeatureFlags.ClockwiseWinding
);

export const InstanceBufferLayoutMask = (
    PipelineFeatureFlags.VertexNormals
);

export const VertexBufferLayoutMask = (
    PipelineFeatureFlags.VertexNormals
    | PipelineFeatureFlags.VertexColors
);

export const MaterialBufferLayoutMask = (
    PipelineFeatureFlags.AlphaCutoff
);

export const MaterialBindgroupLayoutMask = (
    MaterialBufferLayoutMask
    | PipelineFeatureFlags.Emissive
);

export const MaterialMask = (
    MaterialBindgroupLayoutMask
    | PipelineFeatureFlags.DoubleSided
);

export const PipelineLayoutMask = (
    InstanceBufferLayoutMask
    | MaterialMask
);

export function featureFlagsToNames(val: number) {
    return Object.entries(PipelineFeatureFlags)
        .flatMap(([key, flag]) => typeof flag === 'number' && (flag & val) ? key : []);
}

export function featureFlagsToString(val: number) {
    return featureFlagsToNames(val).toString();
}

export function maskRedundantFeatures(flags: PipelineFeatureFlags) {
    let masked = flags;
    if (masked & PipelineFeatureFlags.DoubleSided) masked &= ~PipelineFeatureFlags.ClockwiseWinding;
    return masked;
}
