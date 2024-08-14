/* eslint @stylistic/max-len: "error" */

import {
    toWorldDir,
    cubemapSampleConversions,
} from '../../shaders/cubemap-sampling.shader';

import { createAndCopyBuffer } from '../../utils/data-copy';
import { mapRange } from '../../utils/general';

const createMipBlurCode = (
    groups: number,
    format: GPUTextureFormat,
) => /* wgsl */`
    ${cubemapSampleConversions}
    ${toWorldDir}

    override STEPS: i32 = 4;

    @group(0) @binding(0) var previousMip: texture_2d_array<f32>;

    @group(0) @binding(1) 
    var outputTexture: texture_storage_2d_array<${format}, write>;

    // sigma[0] reserved for work offset
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
        let pos = toWorldDir(vec3u(coord), mipSize);

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

                let samplePos = toWorldDir(sample, previousSize);
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

/**
 *  the minimum angular distance between any pixel on a cubemap
 *  of the given face width and any pixel lying on a perimeter
 *  the given number of steps away
 */
function minStepDistance(steps: number, width: number) {
    // the angular distance
    // from the uvf: face = 0, u = 0, and v = width - Math.floor(steps / 2) - 1
    // to the uvf: face = 3, u = 2 * width - baseV - steps - 2, and v = 0 or 1

    // It's likely possible to programmatically determine whether the
    // destination pixel should be v = 0 or v = 1, but checking both works fine

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

    /**
     *  If the pyramid should overwrite the existing mips
     *  of the given texture
     *
     *  @defaultValue `false`
     */
    inPlace?: boolean,

    /**
     *  The maximum width of the smallest mip level.
     *
     *  @defaultValue `8`
     */
    minWidth?: number,

    /**
     *  The kernel extent distance, in pixels.
     *
     *  @defaultValue `4`
     */
    steps?: number,

    /**
     *  A function to delay the processing of additional pixels,
     *  e.g. `requestAnimationFrame`. Spaces work to allow additional
     *  rendering and interactivity during heavy blurring workloads.
     *
     *  If undefined, all pixels are processed at once.
     */
    delayWork?: (fn: () => Promise<void> | void) => void,

    /**
     *  The maximum number of pixels to process within a batch.
     *  Unused if `delayWork` is undefined.
     *
     *  @defaultValue 6 * ((17 * 256) ** 2)
     *
     *  Allowing cubemap 256 pixels in width with `steps = 8` to run
     *  in a single pass. This is a conservatively low default for
     *  compatibility with lower-end hardware.
     */
    maxOpsPerPass?: number,

    /**
     *  A prefix string for error message thrown from the function
     *
     *  @defaultValue `cubemapGuassianPyramid --`
     */
    label?: string,

    /**
     *  The label to pass the output GPUTexture.
     *
     *  Unused if `inPlace == true`
     */
    outputTextureLabel?: string,
};

export default async function cubemapGuassianPyramid({
    device,
    texture,
    outputTextureLabel,
    inPlace = false,
    minWidth = 8,
    steps = 4,
    maxOpsPerPass = 6 * ((17 * 256) ** 2),
    label = cubemapGuassianPyramid.name,
    delayWork,
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
        label,
        code: createMipBlurCode(groups, format),
    });

    const bindgroupLayout = device.createBindGroupLayout({
        label,
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
        label,
        layout: device.createPipelineLayout({
            label,
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
            label: `${label} copy encoder`,
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
        label: `${label} mip view ${i}`,
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
                label: `${label} mip ${mipLevel}, pass ${mipPasses} encoder`,
            });

            const pass = passEncoder.beginComputePass({
                label: `${label} mip ${mipLevel}, pass ${mipPasses}`,
            });

            pass.setPipeline(pipeline);
            pass.setBindGroup(0, bindgroup);
            pass.dispatchWorkgroups(passDispatches, 1, 1);
            pass.end();

            device.queue.submit([passEncoder.finish()]);

            currentMipDispatches += passDispatches;
            batchDispatches += passDispatches;
            mipPasses += 1;

            if (delayWork != null && batchDispatches >= maxDispatches) {
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
