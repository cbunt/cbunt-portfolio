/* eslint @stylistic/max-len: "error" */

import { createAndCopyBuffer } from '../../utils/data-copy';
import { mapRange } from '../../utils/general';

/**
 *  WGSL functions for sampling across adjacent faces of a cubemap
 */
const cubemapSampling: string = /* wgsl */`
    const INVALID_FACE = 6;
    const INVALID_IDX = 4294967295u; // max u32

    fn cubeSampleCoord(coord: vec3i, w: u32) -> vec3u {
        // a flattened matrix of destination faces based on
        // starting face and direction
        const dfaces = array(
            //                               I  Up Down Left Right Invalid
            0, 2, 3, 4, 5, INVALID_FACE, // +X  +Y   -Y   +Z   -Z   
            1, 2, 3, 5, 4, INVALID_FACE, // -X  +Y   -Y   -Z   +Z 
            2, 5, 4, 1, 0, INVALID_FACE, // +Y  -Z   +Z   -X   +X 
            3, 4, 5, 1, 0, INVALID_FACE, // -Y  +Z   -Z   -X   +X 
            4, 2, 3, 1, 0, INVALID_FACE, // +Z  +Y   -Y   -X   +X 
            5, 2, 3, 0, 1, INVALID_FACE, // -Z  +Y   -Y   +X   -X 
        );

        // a flattend matrix in the same form as dfaces
        // giving the index of the damts array containing 
        // the transformation from the starting face to 
        // the destination face
        const dindices = array(
            0, 1,  2,  3,  4,  0,
            0, 5,  6,  3,  4,  0,
            0, 7,  8,  9,  10, 0,
            0, 11, 12, 13, 14, 0,
            0, 11, 8,  3,  4,  0,
            0, 7,  12, 3,  4,  0,
        );

        // 2x4 martices transforming a coordinate vector <u, v, w, 1>
        // from one face to another
        const dmats = array(
            array(// 0
                vec4(1, 0, 0, 0),   // u = u
                vec4(0, 1, 0, 0),   // v = v
            ),
            array(// 1
                vec4(0, 1, 1, 0),   // u = v + w
                vec4(-1, 0, 1, -1), // v = w - u - 1
            ),
            array(// 2
                vec4(0, -1, 2, -1), // u = 2w - v - 1
                vec4(1, 0, 0, 0),   // v = u
            ),
            array(// 3
                vec4(1, 0, 1, 0),   // u = u + w
                vec4(0, 1, 0, 0),   // v = v
            ),
            array(// 4
                vec4(1, 0, -1, 0),  // u = u - w
                vec4(0, 1, 0, 0),   // v = v
            ),
            array(// 5
                vec4(0, -1, 0, -1), // u = -v - 1
                vec4(1, 0, 0, 0),   // v = u
            ),
            array(// 6
                vec4(0, 1, -1, 0),  // u = v - w
                vec4(-1, 0, 1, -1), // v = w - u - 1
            ),
            array(// 7
                vec4(-1, 0, 1, -1), // u = w - u - 1
                vec4(0, -1, 0, -1), // v = -v - 1
            ),
            array(// 8
                vec4(1, 0, 0, 0),   // u = u
                vec4(0, 1, -1, 0),  // v = v - w
            ),
            array(// 9
                vec4(0, 1, 0, 0),   // u = v
                vec4(-1, 0, 0, -1), // v = -u - 1
            ),
            array(// 10
                vec4(0, -1, 1, -1), // u = w - v - 1
                vec4(1, 0, -1, 0),  // v = u - w
            ),
            array(// 11
                vec4(1, 0, 0, 0),   // u = u
                vec4(0, 1, 1, 0),   // v = v + w
            ),
            array(// 12
                vec4(-1, 0, 1, -1), // u = w - u - 1
                vec4(0, -1, 2, -1), // v = 2w - v - 1
            ),
            array(// 13
                vec4(0, -1, 1, -1), // u = w - v - 1
                vec4(1, 0, 1, 0),   // v = u + w
            ),
            array(// 14
                vec4(0, 1, 0, 0),   // u = v
                vec4(-1, 0, 2, -1), // v = 2w - u - 1
            ),
        );

        let iw = i32(w);

        var dir = 0;
        if (
            coord.y >= iw * 2 - 1 
            || coord.y <= -iw 
            || coord.x >= iw * 2 - 1 
            || coord.x <= -iw
        ) {
            dir = 5;
        } else {
            if (coord.y < 0) {
                dir = 1;
            } else if (coord.y >= iw) {
                dir = 2;
            }
            if (coord.x < 0) {
                dir = select(5, 3, dir == 0);
            } else if (coord.x >= iw) {
                dir = select(5, 4, dir == 0);
            }
        }

        let idx = coord.z * 6 + dir;
        let samp = vec4(coord.xy, iw, 1);
        let dmat = dmats[dindices[idx]];
        return vec3u(vec3(dot(dmat[0], samp), dot(dmat[1], samp), dfaces[idx]));
    }

    fn cubeCoordToIdx(coord: vec3u, w: u32) -> u32 {
        return coord.x + coord.y * w + coord.z * w * w;
    }

    fn cubeIdxToCoord(idx: u32, w: u32) -> vec3u {
        let w2 = w * w;
        let fidx = idx % w2;
        return vec3u(fidx % w, fidx / w, idx / w2);
    }

    fn cubeSampleIdx(uvf: vec3i, w: u32) -> u32 {
        let coord = cubeSampleCoord(uvf, w);
        return select(
            cubeCoordToIdx(coord, w), 
            INVALID_IDX, 
            coord.z == INVALID_FACE,
        );
    }
`;

const createMipBlurCode = (
    groups: number,
    format: GPUTextureFormat,
) => /* wgsl */`
    ${cubemapSampling}

    override STEPS: i32 = 4;

    fn to_world_coords(coord: vec3u, size: u32) -> vec3f {
        let uv = (2.0 / f32(size)) * (vec2f(coord.xy) + 0.5) - 1.0;

        var pos: vec3f;
        switch (coord.z) {
            case 0  { pos = vec3(  1.0, -uv.y, -uv.x); }
            case 1  { pos = vec3( -1.0, -uv.y,  uv.x); }
            case 2  { pos = vec3( uv.x,   1.0,  uv.y); }
            case 3  { pos = vec3( uv.x,  -1.0, -uv.y); }
            case 4  { pos = vec3( uv.x, -uv.y,   1.0); }
            default { pos = vec3(-uv.x, -uv.y,  -1.0); }
        }

        return normalize(pos);
    }

    @group(0) @binding(0) var previousMip: texture_2d_array<f32>;

    @group(0) @binding(1) 
    var outputTexture: texture_storage_2d_array<${format}, write>;

    // simga[0] resevered for work offset
    @group(0) @binding(2) var<storage> sigmas : array<f32>;
    
    @compute @workgroup_size(${groups}, 1, 1)
    fn main(@builtin(global_invocation_id) gid: vec3u) {
        let mipSize = textureDimensions(outputTexture).x;

        let idx = gid.x + u32(sigmas[0]);
        let faceSize = mipSize * mipSize;
        let faceIdx = idx % faceSize;
        let coord = vec3u(
            faceIdx % mipSize, 
            faceIdx / mipSize, 
            idx / faceSize,
        ); 

        if (coord.x >= mipSize || coord.y >= mipSize || coord.z >= 6) { 
            return; 
        }

        let previousSize = textureDimensions(previousMip).x;
        let baseCoord = vec3i(vec3u(coord.x * 2, coord.y * 2, coord.z));
        let pos = to_world_coords(vec3u(coord), mipSize);

        let size = arrayLength(&sigmas);
        let level = size - u32(ceil(log2(f32(previousSize))));
        let sigma = sigmas[level];
        let guassian_factor = -0.5 / (sigma * sigma);

        var weight = 0.0;
        var res = vec3(0.0);

        for (var u = -STEPS; u <= STEPS + 1; u += 1) {
            for (var v = -STEPS; v <= STEPS + 1; v += 1) {
                let offsetCoord = baseCoord + vec3i(u, v, 0);
                let sample = cubeSampleCoord(offsetCoord, previousSize);
                if (sample.z == INVALID_FACE) { continue; }

                let samplePos = to_world_coords(sample, previousSize);
                let x = max(0.0, acos(dot(samplePos, pos)));
                let w = exp(x * x * guassian_factor);
                let color = textureLoad(previousMip, sample.xy, sample.z, 0);

                res += color.rgb * w;
                weight += w;
            }
        }

        textureStore(outputTexture, coord.xy, coord.z, vec4(res / weight, 1));
    }
`;

// the minimum angular distance between any pixel on a cubemap
// of the given face width and any pixel lying on a perimeter
// the given number of steps away
function minStepDistance(steps: number, width: number) {
    // the angular distance
    // from the uvf: face = 0, u = 0, and v = width - Math.floor(steps / 2) - 1
    // to the uvf: face = 3, u = 2 * width - baseV - steps - 2, and v = 0 or 1

    // It's likely possible to programitically determine whether the destition
    // pixel should be v = 0 or v = 1, but checking both works fine

    const nextMipWidth = width >> 1;
    const baseV = nextMipWidth - Math.floor(steps / 4) - 1;
    const baseVN = (2 / nextMipWidth) * (baseV + 0.5) - 1;
    const baseUN = (1 / nextMipWidth) - 1;
    const baseMag2 = 1 + baseVN * baseVN + baseUN * baseUN;

    const sampU = 2 * width - (baseV * 2) - steps - 2;
    const sampUN = (2 / width) * (sampU + 0.5) - 1;
    const samp0VN = (1 / width) - 1;
    const samp0Mag2 = 1 + sampUN * sampUN + samp0VN * samp0VN;
    const samp1VN = (3 / width) - 1;
    const samp1Mag2 = 1 + sampUN * sampUN + samp1VN * samp1VN;

    const dot0 = (sampUN + baseVN + samp0VN * baseUN)
        / Math.sqrt(samp0Mag2 * baseMag2);

    const dot1 = (sampUN + baseVN + samp1VN * baseUN)
        / Math.sqrt(samp1Mag2 * baseMag2);

    return Math.min(1 - dot0, 1 - dot1);
}

export type GaussianPyramidDescriptor = {
    device: GPUDevice,
    texture: GPUTexture,
    inPlace?: boolean,
    minWidth?: number,
    steps?: number,
    maxOpsPerPass?: number,
    delayWork?: (fn: () => Promise<void> | void) => void,
    outputTextureLabel?: string,
    labelTag?: string,
};

export default async function cubemapGuassianPyramid({
    device,
    texture,
    outputTextureLabel,
    inPlace = false,
    minWidth = 8,
    steps = 4,
    maxOpsPerPass = 6 * ((32 * 256) ** 2),
    delayWork = (fn) => { void fn(); },
    labelTag = `${cubemapGuassianPyramid.name} --`,
}: GaussianPyramidDescriptor) {
    const { width, format } = texture;
    const mipLevelCount = inPlace
        ? texture.mipLevelCount
        : (Math.log2(width) - Math.log2(minWidth) + 1);

    if (mipLevelCount <= 1) return texture;

    const groups = Math.min(
        device.limits.maxComputeWorkgroupSizeX,
        device.limits.maxComputeInvocationsPerWorkgroup,
    );
    const maxWorkgroups = device.limits.maxComputeWorkgroupsPerDimension;
    const shader = device.createShaderModule({
        label: `${labelTag} shader`,
        code: createMipBlurCode(groups, format),
    });

    const bindgroupLayout = device.createBindGroupLayout({
        label: `${labelTag} bindgroup layout`,
        entries: [
            {
                binding: 0,
                texture: { viewDimension: '2d-array' },
                visibility: GPUShaderStage.COMPUTE,
            },
            {
                binding: 1,
                storageTexture: {
                    access: 'write-only',
                    viewDimension: '2d-array',
                    format,
                },
                visibility: GPUShaderStage.COMPUTE,
            },
            {
                binding: 2,
                buffer: { type: 'read-only-storage' },
                visibility: GPUShaderStage.COMPUTE,
            },
        ],
    });

    const pipeline = device.createComputePipeline({
        label: `${labelTag} pipeline`,
        layout: device.createPipelineLayout({
            label: `${labelTag} -- pipeline layout`,
            bindGroupLayouts: [bindgroupLayout],
        }),
        compute: {
            module: shader,
            entryPoint: 'main',
            constants: { STEPS: Math.ceil(steps) },
        },
    });

    let gaussianPyramid = texture;
    if (!inPlace) {
        const size = { width, height: width, depthOrArrayLayers: 6 };

        gaussianPyramid = device.createTexture({
            label: outputTextureLabel,
            usage: GPUTextureUsage.STORAGE_BINDING
            | GPUTextureUsage.TEXTURE_BINDING
            | GPUTextureUsage.COPY_SRC
            | GPUTextureUsage.COPY_DST,
            dimension: '2d',
            format,
            mipLevelCount,
            size,
        });

        const copyEncoder = device.createCommandEncoder({
            label: `${labelTag} copy encoder`,
        });

        copyEncoder.copyTextureToTexture(
            { texture, mipLevel: 0 },
            { texture: gaussianPyramid, mipLevel: 0 },
            size,
        );

        device.queue.submit([copyEncoder.finish()]);
        await device.queue.onSubmittedWorkDone();
    }

    const mipViews = mapRange(mipLevelCount, (i) => gaussianPyramid.createView({
        label: `${labelTag} mip view ${i}`,
        dimension: '2d-array',
        baseMipLevel: i,
        mipLevelCount: 1,
    }));

    const maxDispatches = Math.max(
        (maxOpsPerPass / (((1 + (steps * 2)) ** 2) * groups)) | 0,
        1,
    );
    const maxLayers = Math.ceil(Math.log2(width));

    const propertyArray = new Float32Array([0, ...mapRange(maxLayers, (i) => {
        const w = width >> i;
        return Math.acos(1 - minStepDistance(Math.min(w, steps), w)) / 3;
    })]);

    const propertyBuffer = createAndCopyBuffer(
        propertyArray,
        GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
        device,
    );

    await new Promise<void>((resolve) => {
        let mipLevel = 0;
        let mipPasses = 0;
        let requiredMipDispatches = 0;
        let currentMipDispatches = 0;
        let batchDispatches = 0;
        let bindgroup: GPUBindGroup;

        async function runPass() {
            if (currentMipDispatches >= requiredMipDispatches) {
                mipLevel += 1;
                currentMipDispatches = 0;
                mipPasses = 0;

                if (mipLevel >= mipLevelCount) {
                    resolve();
                    return;
                }

                const mipPixels = 6 * ((width >> mipLevel) ** 2);
                requiredMipDispatches = Math.ceil(mipPixels / groups);

                bindgroup = device.createBindGroup({
                    layout: bindgroupLayout,
                    entries: [
                        {
                            binding: 0,
                            resource: mipViews[mipLevel - 1],
                        },
                        {
                            binding: 1,
                            resource: mipViews[mipLevel],
                        },
                        {
                            binding: 2,
                            resource: { buffer: propertyBuffer },
                        },
                    ],
                });
            }

            propertyArray[0] = currentMipDispatches * groups;
            device.queue.writeBuffer(propertyBuffer, 0, propertyArray, 0, 1);

            const passDispatches = Math.min(
                requiredMipDispatches - currentMipDispatches,
                maxDispatches - batchDispatches,
                maxWorkgroups,
            );

            const passEncoder = device.createCommandEncoder({
                label: `${labelTag} mip ${mipLevel}, pass ${mipPasses} encoder`,
            });

            const pass = passEncoder.beginComputePass({
                label: `${labelTag} mip ${mipLevel}, pass ${mipPasses}`,
            });

            pass.setPipeline(pipeline);
            pass.setBindGroup(0, bindgroup);
            pass.dispatchWorkgroups(passDispatches, 1, 1);
            pass.end();

            device.queue.submit([passEncoder.finish()]);

            currentMipDispatches += passDispatches;
            batchDispatches += passDispatches;
            mipPasses += 1;

            if (batchDispatches >= maxDispatches) {
                batchDispatches = 0;
                await device.queue.onSubmittedWorkDone();
                delayWork(runPass);
            } else {
                void runPass();
            }
        }

        void runPass();
    });

    return gaussianPyramid;
}
