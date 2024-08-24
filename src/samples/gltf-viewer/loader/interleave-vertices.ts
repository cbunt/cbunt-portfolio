import AttributeWrapper from './attribute-wrapper';
import { PipelineFeatureFlags } from '../../../rendering/default-forward-pass/pipeline-feature-flags';

// const goalLayout: AttributeDetails[] = [
//     {
//         name: 'POSITION',
//         type: 'VEC3',
//         componentType: ComponentType.float32,
//     },
//     {
//         name: 'TEXCOORD_0',
//         type: 'VEC2',
//         componentType: ComponentType.float32,
//     },
//     {
//         name: 'TANGENT',
//         type: 'VEC4',
//         componentType: ComponentType.float32,
//         depends: ['NORMAL'],
//         fill: [1, 0, 0, 1],
//     },
//     {
//         name: 'NORMAL',
//         type: 'VEC3',
//         componentType: ComponentType.float32,
//         strip: true,
//         feature: PipelineFeatureFlags.VertexNormals,
//     },
//     {
//         name: 'COLOR_0',
//         type: 'VEC4',
//         componentType: ComponentType.float32,
//         strip: true,
//         feature: PipelineFeatureFlags.VertexColors,
//         fill: [1, 1, 1, 1],
//     },
// ];

export default function interleaveVertices(
    attributes: Partial<Record<string, AttributeWrapper>>,
    count: number,
) {
    let vertexFeatures: PipelineFeatureFlags = PipelineFeatureFlags.Defaults;
    let stride = 5;
    if (attributes.NORMAL != null) stride += 7;
    if (attributes.COLOR_0 != null) stride += 4;

    const vertexArray = new ArrayBuffer(stride * count * 4);
    const vertexView = new Float32Array(vertexArray);

    for (let i = 0; i < count; i += 1) {
        attributes.POSITION?.copyFrom(i, stride * i, vertexView);
    }

    const uv = attributes.TEXCOORD_0 ?? new AttributeWrapper(new Float32Array(count * 2), 2);
    for (let i = 0; i < count; i += 1) {
        uv.copyFrom(i, i * stride + 3, vertexView);
    }

    if (attributes.NORMAL != null && attributes.TANGENT != null) {
        vertexFeatures |= PipelineFeatureFlags.VertexNormals;

        for (let i = 0; i < count; i += 1) {
            attributes.TANGENT.copyFrom(i, i * stride + 5, vertexView);
        }

        for (let i = 0; i < count; i += 1) {
            attributes.NORMAL.copyFrom(i, i * stride + 9, vertexView);
        }
    }

    if (attributes.COLOR_0 != null) {
        vertexFeatures |= PipelineFeatureFlags.VertexColors;
        const step = attributes.NORMAL != null ? 12 : 5;
        for (let i = 0; i < count; i += 1) {
            attributes.COLOR_0.copyFrom(i, i * stride + step, vertexView);
            vertexView[i * stride + step + 3] = 1;
        }
    }

    return { vertexArray, vertexFeatures };
}
