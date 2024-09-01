import { Mat4, mat4, Mat4Arg, Mat4Type, quat } from 'wgpu-matrix';
import { DataType, load } from '@loaders.gl/core';
import { GLTFLoader, GLTFMeshPostprocessed, GLTFNodePostprocessed, postProcessGLTF } from '@loaders.gl/gltf';

import { ComponentType, AttributeDetails } from './type-conversions';
import loadPrimitive from './primitive-loader';
import loadMaterial from './material-loader';

import { MaterialDescriptor, MaterialDrawData } from '../../../rendering/default-forward-pass/material-draw-data';
import { PipelineFeatureFlags } from '../../../rendering/default-forward-pass/pipeline-feature-flags';
import { PrimitiveDrawData } from '../../../rendering/default-forward-pass/primitive-draw-data';
import DescriptorMap from '../../../rendering/default-forward-pass/descriptor-map';
import GeometryPipeline from '../../../rendering/default-forward-pass/geometry-pipeline';

const defaultLayout: AttributeDetails[] = [
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

const recurseNode = (
    parentMatrix: Mat4Type<Mat4Arg>,
    meshes: Map<GLTFMeshPostprocessed, Mat4Type<Mat4Arg>[]>,
) => (node: GLTFNodePostprocessed) => {
    const matrix = node.matrix ?? mat4.identity();

    if (node.matrix == null) {
        if (node.scale) mat4.scaling(node.scale, matrix);

        if (node.rotation) {
            const { axis, angle } = quat.toAxisAngle(node.rotation);
            mat4.rotate(matrix, axis, angle, matrix);
        }

        if (node.translation != null) {
            mat4.setTranslation(matrix, node.translation, matrix);
        }
    }

    mat4.mul(parentMatrix, matrix, matrix);

    if (node.mesh != null) {
        if (!meshes.has(node.mesh)) meshes.set(node.mesh, []);
        meshes.get(node.mesh)!.push(matrix); // eslint-disable-line @typescript-eslint/no-non-null-assertion
    }

    node.children?.forEach(recurseNode(matrix, meshes));
};

export default async function importGltf(
    url: string | DataType,
    device: GPUDevice,
    descriptorMap: DescriptorMap,
    defaultMaterial: MaterialDescriptor,
    layout: AttributeDetails[] = defaultLayout,
    pipelines: Partial<Record<number, GeometryPipeline>> = {},
    // eslint-disable-next-line no-console
    log: ((msg: unknown) => void) = console.log,
) {
    log('starting import');

    const start = Date.now();
    const gltfWithBuffers = await load(url, GLTFLoader);
    log(`finished loading: ${Date.now() - start}`);

    const { scene } = postProcessGLTF(gltfWithBuffers);
    if (scene?.nodes == null) return pipelines;
    log(`finished processing: ${Date.now() - start}`);

    const meshes = new Map<GLTFMeshPostprocessed, Mat4[]>();
    scene.nodes.forEach(recurseNode(mat4.identity(), meshes));
    log(`finished creating instances: ${Date.now() - start}`);

    const meshEntries = Array.from(meshes.entries());
    const primitivePromises = meshEntries.flatMap(([{ primitives }, instances]) =>
        primitives.map((prim) => loadPrimitive(
            layout,
            prim,
            instances,
            descriptorMap,
            device,
        )),
    );

    const primitiveDescriptors = await Promise.all(primitivePromises);
    log(`finished creating primitives: ${Date.now() - start}`);

    type MaterialKey = { materialId?: string, features: number };
    const materialMap = new Map<MaterialKey, PrimitiveDrawData[]>();
    const materialPromises: Record<string, Promise<MaterialDescriptor>> = {};

    for (const { material, drawData } of primitiveDescriptors) {
        if (drawData == null) continue;

        const key = { materialId: material?.id, features: drawData.features };
        if (!materialMap.has(key)) materialMap.set(key, []);
        materialMap.get(key)!.push(drawData); // eslint-disable-line @typescript-eslint/no-non-null-assertion

        if (material != null) {
            materialPromises[material.id] = loadMaterial(material, defaultMaterial, device);
        }
    }

    const materialEntries = Object.entries(materialPromises)
        .map(async ([id, mat]) => [id, await mat]);

    const materialDescriptors = Object.fromEntries(await Promise.all(materialEntries)) as Record<string, MaterialDescriptor>;
    log(`finished creating material descriptors: ${Date.now() - start}`);

    const fullDefaultMat: MaterialDescriptor = { ...defaultMaterial, metallicFactor: 0 };

    for (const [{ features, materialId }, drawDatas] of materialMap.entries()) {
        const descriptor = materialId != null ? materialDescriptors[materialId] : fullDefaultMat;
        const mat = new MaterialDrawData(descriptor, device, descriptorMap, features, drawDatas);
        const { features: f } = mat;

        pipelines[f] ??= new GeometryPipeline(f, descriptorMap);
        pipelines[f].addMaterials(mat);
    }

    log(`finished: ${Date.now() - start}`);
    return pipelines;
}
