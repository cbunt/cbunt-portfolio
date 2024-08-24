import { Mat4, mat4 } from 'wgpu-matrix';
import { GLTFAccessorPostprocessed, GLTFMaterialPostprocessed, GLTFMeshPrimitivePostprocessed } from '@loaders.gl/gltf';

import weld from './weld';
import { PipelineFeatureFlags } from '../../../rendering/default-forward-pass/pipeline-feature-flags';
import { PrimitiveDrawData } from '../../../rendering/default-forward-pass/primitive-draw-data';
import { AttributeDetails, TopologyMode, modeToTopology } from './type-conversions';
import DescriptorMap from '../../../rendering/default-forward-pass/descriptor-map';
import AttributeWrapper from './attribute-wrapper';
import interleaveVertices from './interleave-vertices';
import { mapValues } from '../../../utils/general';

export type NamedAttribute = 'POSITION' | 'NORMAL' | 'TANGENT';
export type NumberedAttribute = 'TEXCOORD' | 'COLOR' | 'JOINTS' | 'WEIGHTS';
export type PrimitiveAttributeKey = NamedAttribute | `${NumberedAttribute}_${number}` | `_${string}`;

const generateTangentsAsync = import('mikktspace').then((module) => module.generateTangents);

function wrapIndices(indices: GLTFAccessorPostprocessed) {
    switch (indices.bytesPerComponent) {
        case 2: return {
            indexArray: new Uint16Array(indices.value.buffer),
            indexFormat: 'uint16' as GPUIndexFormat,
        };
        case 4: return {
            indexArray: new Uint32Array(indices.value.buffer),
            indexFormat: 'uint32' as GPUIndexFormat,
        };
        case 1:
        default: return {
            indexArray: new Uint16Array(indices.value),
            indexFormat: 'uint16' as GPUIndexFormat,
        };
    }
}

function reindex(indices: GLTFAccessorPostprocessed, originalMode?: number) {
    switch (originalMode) {
        case TopologyMode.LineLoop:
        case TopologyMode.LineStrip:
        case TopologyMode.TriangleFan:
        case TopologyMode.TriangleStrip: {
            // TODO: convert non-list topologies into lists.
            throw new Error('Topology currently unsupported');
        }
        default: return { ...wrapIndices(indices), mode: TopologyMode.TriangleList };
    }
}

/**
 * Checks the determinant of each given matrix and returns a culling mode such that
 * a primitive will render correctly for all nodes containing it, using 'none'
 * for primitive which are rendered both inverted and normally.
 *
 * @param instanceMatrices the instance matrices to render the primitive with
 * @returns The cull mode to use on the primitive.
 *
 * @remarks
 * The glFT spec determines the winding direction of a model by the
 * determinant of the transform of the node which uses it, allowing
 * inversion through negative scale. Changing cullMode instead
 * more easily integrates with instanced rendering, although comes
 * at a performance cost.
 */
function getCullMode(instanceMatrices: Mat4[]) {
    let overallSign: number | undefined;

    for (let i = 0; i < instanceMatrices.length; i += 1) {
        const det = mat4.determinant(instanceMatrices[i]);
        const sign = Math.sign(det);
        overallSign ??= sign;

        if (sign !== overallSign) return PipelineFeatureFlags.DoubleSided;
    }

    return (overallSign == null || overallSign > 0)
        ? PipelineFeatureFlags.Defaults
        : PipelineFeatureFlags.ClockwiseWinding;
}

export default async function loadPrimitive(
    layout: AttributeDetails[],
    primitive: GLTFMeshPrimitivePostprocessed,
    instances: Mat4[],
    descriptorMap: DescriptorMap,
    device: GPUDevice,
): Promise<{ drawData?: PrimitiveDrawData, material?: GLTFMaterialPostprocessed }> {
    const attributes = primitive.attributes as Partial<Record<PrimitiveAttributeKey, GLTFAccessorPostprocessed>>;
    if (attributes.POSITION == null) return {};

    const { indices } = primitive;
    const atrs = mapValues(attributes, (atr) => new AttributeWrapper(atr as GLTFAccessorPostprocessed));
    let { mode } = primitive;
    let vertexCount = attributes.POSITION.count;
    let indexArray: TypedArray | undefined;
    let indexFormat: GPUIndexFormat | undefined;

    if (indices != null) {
        ({ indexArray, indexFormat } = wrapIndices(indices));

        if (
            mode !== TopologyMode.Points
            && mode !== TopologyMode.LineList
            && mode !== TopologyMode.TriangleList
        ) {
            ({ indexArray, indexFormat, mode } = reindex(indices, mode));
        }
    }

    if (atrs.NORMAL != null && atrs.TANGENT == null) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (atrs.TEXCOORD_0 != null) {
            if (indexArray != null) {
                vertexCount = indexArray.length;
                for (const atr of Object.values(atrs)) {
                    atr.unweld(indexArray);
                }
            }

            const start = Date.now();

            const tangent = await generateTangentsAsync.then((func) => func(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                atrs.POSITION!.array,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                atrs.NORMAL!.array,
                atrs.TEXCOORD_0.array,
            ));
            console.log(`tangents generated in ${Date.now() - start}`);

            for (let i = 3; i < tangent.length; i += 4) {
                tangent[i] *= -1;
            }

            atrs.TANGENT = new AttributeWrapper(tangent, 4);

            ({ indexArray, indexFormat, vertexCount } = weld(atrs));
            mode = TopologyMode.TriangleList;
        } else {
            const tangent = new Float32Array(vertexCount * 4);
            for (let i = 0; i < vertexCount; i += 1) {
                tangent.set([1, 0, 0, 1], i * 4);
            }
            atrs.TANGENT = new AttributeWrapper(tangent, 4);
        }
    }
    const { vertexArray, vertexFeatures } = interleaveVertices(atrs, vertexCount);
    let features = getCullMode(instances) | vertexFeatures;
    if (mode != null) features |= modeToTopology[mode as TopologyMode] || 0;

    const drawData = new PrimitiveDrawData({
        features,
        indexArray,
        indexFormat,
        vertexCount,
        vertexArray,
    }, device, instances.length, descriptorMap, instances);

    return { material: primitive.material, drawData };
}
