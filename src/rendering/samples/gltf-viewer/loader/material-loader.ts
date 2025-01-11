import { GLTFMaterialPostprocessed, GLTFSampler, GLTFTexturePostprocessed } from '@loaders.gl/gltf';

import { vec3 } from 'wgpu-matrix';
import { MaterialDescriptor } from '../../../core/default-forward-pass/material-draw-data';
import { imageToTexture } from '../../../utils/texture-importing';

const DEFAULT_METALLIC = 0.0;
const DEFAULT_ROUGHNESS = 1.0;

const gltfToMagDescription: Record<number, GPUFilterMode> = {
    9728: 'nearest',
    9729: 'linear',
    9984: 'nearest', // NEAREST_MIPMAP_NEAREST
    9985: 'linear', // LINEAR_MIPMAP_NEAREST
    9986: 'nearest', // NEAREST_MIPMAP_LINEAR
    9987: 'linear', // LINEAR_MIPMAP_LINEAR
};

const gltfToMipDescription: Partial<Record<number, GPUFilterMode>> = {
    9984: 'nearest', // NEAREST_MIPMAP_NEAREST
    9985: 'nearest', // LINEAR_MIPMAP_NEAREST
    9986: 'linear', // NEAREST_MIPMAP_LINEAR
    9987: 'linear', // LINEAR_MIPMAP_LINEAR
};

const gltfToAddressMode: Record<number, GPUAddressMode> = {
    33071: 'clamp-to-edge', // CLAMP_TO_EDGE
    33648: 'mirror-repeat', // MIRRORED_REPEAT
    10497: 'repeat', // REPEAT
};

function toSamplerDescription(sampler: GLTFSampler): GPUSamplerDescriptor {
    const { magFilter, minFilter, wrapS, wrapT } = sampler;

    return {
        addressModeU: gltfToAddressMode[wrapS ?? 10497],
        addressModeV: gltfToAddressMode[wrapT ?? 10497],
        minFilter: gltfToMagDescription[minFilter ?? 9987],
        magFilter: gltfToMagDescription[magFilter ?? 9729],
        mipmapFilter: gltfToMipDescription[minFilter ?? 9987] ?? 'linear',
    };
}

function getImageData(handle: GLTFTexturePostprocessed) {
    const { source, sampler } = handle;
    if (source == null) return {};

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const data = source.image.data ?? source.bufferView?.data;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (data == null) return {};

    return { data, mimeType: source.mimeType, sampler };
}

export default async function loadMaterial(
    material: GLTFMaterialPostprocessed,
    defaultMaterial: MaterialDescriptor,
    device: GPUDevice,
): Promise<MaterialDescriptor> {
    const mat: Partial<MaterialDescriptor> = {};
    if (material.pbrMetallicRoughness != null) {
        const {
            baseColorFactor,
            baseColorTexture,
            metallicFactor,
            metallicRoughnessTexture,
            roughnessFactor,
        } = material.pbrMetallicRoughness;

        if (metallicRoughnessTexture?.texture.source == null) {
            if (metallicFactor == null) mat.metallicFactor = DEFAULT_METALLIC;
            if (roughnessFactor == null) mat.roughnessFactor = DEFAULT_ROUGHNESS;
        } else {
            const { data, mimeType, sampler } = getImageData(metallicRoughnessTexture.texture);
            if (data != null) {
                mat.metallicRoughnessTexture = await imageToTexture({
                    label: `${material.id} mr texture`,
                    data,
                    mimeType,
                    usage: GPUTextureUsage.TEXTURE_BINDING,
                    device,
                });
                if (sampler) mat.metallicRoughnessSampler = toSamplerDescription(sampler);
            }
        }

        if (baseColorTexture?.texture.source != null) {
            const { data, mimeType, sampler } = getImageData(baseColorTexture.texture);
            if (data != null) {
                mat.baseColorTexture = await imageToTexture({
                    label: `${material.id} mr texture`,
                    data,
                    mimeType,
                    usage: GPUTextureUsage.TEXTURE_BINDING,
                    device,
                    srgbToLinear: true,
                });
                if (sampler) mat.baseColorSampler = toSamplerDescription(sampler);
            }
        }

        if (baseColorFactor != null) mat.baseColorFactor = baseColorFactor;
        if (metallicFactor != null) mat.metallicFactor = metallicFactor;
        if (roughnessFactor != null) mat.metallicFactor = roughnessFactor;
    } else {
        mat.metallicFactor = DEFAULT_METALLIC;
        mat.roughnessFactor = DEFAULT_ROUGHNESS;
    }

    if (material.normalTexture?.texture.source != null) {
        const { data, mimeType, sampler } = getImageData(material.normalTexture.texture);

        if (data != null) {
            mat.normalTexture = await imageToTexture({
                label: `${material.id} mr texture`,
                data,
                mimeType,
                usage: GPUTextureUsage.TEXTURE_BINDING,
                device,
            });
            if (sampler) mat.normalSampler = toSamplerDescription(sampler);
        }
    }

    const { emissiveFactor, emissiveTexture } = material;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const emissiveStrength = material.extensions?.KHR_materials_emissive_strength?.emissiveStrength;

    if (emissiveTexture != null || emissiveFactor?.some((x) => x > 0)) {
        mat.emissiveFactor = emissiveFactor ?? [1, 1, 1];
        mat.emissiveSampler = { magFilter: 'linear', minFilter: 'linear' };

        if (emissiveTexture?.texture.source != null) {
            const { data, mimeType, sampler } = getImageData(emissiveTexture.texture);
            if (data != null) {
                mat.emissiveTexture = await imageToTexture({
                    label: `${material.id} mr texture`,
                    data,
                    mimeType,
                    usage: GPUTextureUsage.TEXTURE_BINDING,
                    device,
                    srgbToLinear: true,
                });
                if (sampler) mat.emissiveSampler = toSamplerDescription(sampler);
            }
        } else {
            mat.emissiveTexture = defaultMaterial.baseColorTexture;
        }

        if (emissiveStrength != null && typeof emissiveStrength === 'number') {
            vec3.scale(mat.emissiveFactor, emissiveStrength, mat.emissiveFactor);
        }
    }

    if (material.doubleSided) mat.doubleSided = true;
    if (material.alphaMode === 'MASK') mat.alphaCutoff = material.alphaCutoff ?? 0.5;

    return { ...defaultMaterial, ...mat };
}
