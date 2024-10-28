/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { PipelineFeatureFlags, featureFlagsToString } from '../rendering/default-forward-pass/pipeline-feature-flags';
import { preprocessors, wrapWithIncrement } from '../utils/shader';
import GlobalUniforms from '../rendering/global-uniforms';
import { GBufferGroupIndices } from '../rendering/gbuffer';

export function getBindgroupInfo(flags: PipelineFeatureFlags): GPUBindGroupLayoutDescriptor {
    const entries: GPUBindGroupLayoutEntry[] = [];

    function pushItem(item: Omit<GPUBindGroupLayoutEntry, 'binding' | 'visibility'>) {
        entries.push({ ...item, binding: entries.length, visibility: GPUShaderStage.FRAGMENT | GPUShaderStage.VERTEX });
    }

    pushItem({ buffer: { type: 'uniform' } });

    pushItem({ sampler: {} });
    pushItem({ texture: { viewDimension: '2d' } });

    pushItem({ sampler: {} });
    pushItem({ texture: { viewDimension: '2d' } });

    pushItem({ sampler: {} });
    pushItem({ texture: { viewDimension: '2d' } });

    if (flags & PipelineFeatureFlags.Emissive) {
        pushItem({ sampler: {} });
        pushItem({ texture: { viewDimension: '2d' } });
    }

    return { label: featureFlagsToString(flags), entries };
}

/**
 * @param flags A flag enum containing the features this code should be generated for
 * @returns A string containing preprocessed wgsl shader code for the given features
 */
export default function include(flags: PipelineFeatureFlags) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { ifdef } = preprocessors(flags as number);
    const vertexInLocation = wrapWithIncrement((idx) => /* wgsl */`@location(${idx})`);
    const varyingsLocation = wrapWithIncrement((idx) => /* wgsl */`@location(${idx})`);

    const materialBinding = wrapWithIncrement((idx) => /* wgsl */`
        @group(1) @binding(${idx})
    `);

    const varyings = /* wgsl */`
        ${varyingsLocation()} pos: vec3f,
        ${varyingsLocation()} camPos: vec3f,
        ${varyingsLocation()} uv: vec2f,

        ${ifdef(PipelineFeatureFlags.VertexNormals, () => /* wgsl */`
            ${varyingsLocation()} tangent: vec4f,
            ${varyingsLocation()} normal: vec3f,
        `)}

        ${ifdef(PipelineFeatureFlags.VertexColors, () => /* wgsl */`
            ${varyingsLocation()} color: vec4f,
        `)}
    `;

    return /* wgsl */`
        ${GlobalUniforms.code(0)}

        struct ForwardOut {
            @location(${GBufferGroupIndices.Normal}) normal: vec4f,
            @location(${GBufferGroupIndices.Albedo}) albedo: vec4f,
            @location(${GBufferGroupIndices.Emission}) emission: vec4f,
            @location(${GBufferGroupIndices.MetallicRoughness}) metallicRoughness: vec4f,
        }

        struct MaterialProperties {
            baseColorFactor: vec4f,
            metallicFactor: f32,
            roughnessFactor: f32,

            ${ifdef(PipelineFeatureFlags.AlphaCutoff, 'alphaCutoff: f32,')}
            ${ifdef(PipelineFeatureFlags.Emissive, 'emissiveFactor: vec3f,')}
        }

        ${materialBinding()} var<uniform> material: MaterialProperties;

        ${materialBinding()} var baseColorSampler: sampler;
        ${materialBinding()} var baseColorTexture: texture_2d<f32>;

        ${materialBinding()} var normalSampler: sampler;
        ${materialBinding()} var normalTexture: texture_2d<f32>;

        ${materialBinding()} var metallicRoughnessSampler: sampler;
        ${materialBinding()} var metallicRoughnessTexture: texture_2d<f32>;

        ${ifdef(PipelineFeatureFlags.Emissive, () => /* wgsl */`
            ${materialBinding()} var emissionSampler: sampler;
            ${materialBinding()} var emissionTexture: texture_2d<f32>;
        `)}

        struct ModelProperties {
            modelToWorldMatrix: mat4x4f,

            ${ifdef(PipelineFeatureFlags.VertexNormals, 'normalMatrix: mat3x3f,')}
        }

        @group(2) @binding(0) var<storage, read> instances : array<ModelProperties>;

        struct VertIn {
            @builtin(instance_index) instance: u32,
            ${vertexInLocation()} pos: vec3f,
            ${vertexInLocation()} uv: vec2f,

            ${ifdef(PipelineFeatureFlags.VertexNormals, () => /* wgsl */`
                ${vertexInLocation()} tangent: vec4f,
                ${vertexInLocation()} normal: vec3f,
            `)}

            ${ifdef(PipelineFeatureFlags.VertexColors, () => /* wgsl */`
                ${vertexInLocation()} color: vec4f,
            `)}
        }

        struct VertOut {
            ${varyings}
            @builtin(position) Position: vec4f,
        }

        struct FragIn {
            ${varyings}

            ${ifdef(PipelineFeatureFlags.VertexNormals | PipelineFeatureFlags.DoubleSided, /* wgsl */`
                @builtin(front_facing) front_facing: bool,
            `)}
        }

        fn sRGBToLinear(color: vec3f) -> vec3f {
            return select( 
                pow(color * 0.9478672986 + 0.0521327014, vec3(2.4)), 
                color * 0.0773993808, 
                color <= vec3(0.04045), 
            );
        }  

        @vertex 
        fn vs(inData: VertIn) -> VertOut {
            var vsOut: VertOut;
            let instance = instances[inData.instance];
            let worldPos = instance.modelToWorldMatrix * vec4f(inData.pos, 1);
            vsOut.pos = worldPos.xyz;
            vsOut.Position = globals.worldToClip * worldPos;
            vsOut.camPos = globals.inverseWorldToView[3].xyz;
            vsOut.uv = inData.uv;

            ${ifdef(PipelineFeatureFlags.VertexNormals, /* wgsl */`
                vsOut.normal = normalize(instance.normalMatrix * inData.normal);
                let wsTangent = normalize((instance.modelToWorldMatrix * vec4(inData.tangent.xyz, 0.0)).xyz);
                vsOut.tangent = vec4(wsTangent, inData.tangent.w);
            `)}

            return vsOut;
        }

        // much of this code is adapted from https://learnopengl.com/PBR
        @fragment
        fn fs(inData: FragIn) -> ForwardOut {
            var out: ForwardOut;
            let rawColor = textureSample(baseColorTexture, baseColorSampler, inData.uv);

            ${ifdef(PipelineFeatureFlags.AlphaCutoff, /* wgsl */`
                var alpha = rawColor.a * material.baseColorFactor.a;

                ${ifdef(PipelineFeatureFlags.VertexColors, /* wgsl */`
                    alpha *= inData.color.a;
                `)}

                if (alpha <= material.alphaCutoff) { 
                    discard;
                }
            `)}

            out.albedo = vec4f(rawColor.rgb * material.baseColorFactor.rgb, 1);

            ${ifdef(PipelineFeatureFlags.VertexColors, /* wgsl */`
                out.albedo *= vec4f(inData.color.rgb, 1);
            `)}

            let metallicRoughness = textureSample(metallicRoughnessTexture, metallicRoughnessSampler, inData.uv);
            out.metallicRoughness.r = saturate(metallicRoughness.b * material.metallicFactor);
            out.metallicRoughness.g = saturate(metallicRoughness.g * material.roughnessFactor);

            ${ifdef(PipelineFeatureFlags.VertexNormals, /* wgsl */`
                let normalSample = textureSample(normalTexture, normalSampler, inData.uv).xyz;
                let tangentNormal = normalize(normalSample * 2.0 - 1.0);
                let bitangent =inData.tangent.w * cross(inData.normal, inData.tangent.xyz);
                let tbn = mat3x3f(normalize(inData.tangent.xyz), bitangent, normalize(inData.normal));
                var normal = normalize(tbn * tangentNormal);

                ${ifdef(PipelineFeatureFlags.DoubleSided, /* wgsl */`
                    if (!inData.front_facing) { normal *= -1.0; }
                `)}
            `).else(/* wgsl */`
                let fdx = dpdx(inData.pos);
                let fdy = dpdy(inData.pos);
                let normal = normalize(cross(fdy, fdx));
            `)}

            out.normal = vec4f(normal, 1);

            ${ifdef(PipelineFeatureFlags.Emissive, /* wgsl */`
                let emission = textureSample(emissionTexture, emissionSampler, inData.uv).rgb;
                out.emission = vec4f(emission, 1);
            `)}

            return out;
        }
    `;
}
