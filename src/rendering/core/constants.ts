import * as ktxp from 'ktx-parse';

export const TypeSizes = {
    mat4x4Count: 16,
    sizeofMat4x4f: 16 * Float32Array.BYTES_PER_ELEMENT,
};

export const VkFormatToWebGPU: Record<number, GPUTextureFormat | undefined> = {
    // 8-bit formats
    [ktxp.VK_FORMAT_R8_UNORM]: 'r8unorm',
    [ktxp.VK_FORMAT_R8_SNORM]: 'r8snorm',
    [ktxp.VK_FORMAT_R8_UINT]: 'r8uint',
    [ktxp.VK_FORMAT_R8_SINT]: 'r8sint',
    // 16-bit formats
    [ktxp.VK_FORMAT_R16_UINT]: 'r16uint',
    [ktxp.VK_FORMAT_R16_SINT]: 'r16sint',
    [ktxp.VK_FORMAT_R16_SFLOAT]: 'r16float',
    [ktxp.VK_FORMAT_R8G8_UNORM]: 'rg8unorm',
    [ktxp.VK_FORMAT_R8G8_SNORM]: 'rg8snorm',
    [ktxp.VK_FORMAT_R8G8_UINT]: 'rg8uint',
    [ktxp.VK_FORMAT_R8G8_SINT]: 'rg8sint',
    // 32-bit formats
    [ktxp.VK_FORMAT_R32_UINT]: 'r32uint',
    [ktxp.VK_FORMAT_R32_SINT]: 'r32sint',
    [ktxp.VK_FORMAT_R32_SFLOAT]: 'r32float',
    [ktxp.VK_FORMAT_R16G16_UINT]: 'rg16uint',
    [ktxp.VK_FORMAT_R16G16_SINT]: 'rg16sint',
    [ktxp.VK_FORMAT_R16G16_SFLOAT]: 'rg16float',
    [ktxp.VK_FORMAT_R8G8B8A8_UNORM]: 'rgba8unorm',
    [ktxp.VK_FORMAT_R8G8B8A8_SRGB]: 'rgba8unorm-srgb',
    [ktxp.VK_FORMAT_R8G8B8A8_SNORM]: 'rgba8snorm',
    [ktxp.VK_FORMAT_R8G8B8A8_UINT]: 'rgba8uint',
    [ktxp.VK_FORMAT_R8G8B8A8_SINT]: 'rgba8sint',
    [ktxp.VK_FORMAT_B8G8R8A8_UNORM]: 'bgra8unorm',
    [ktxp.VK_FORMAT_B8G8R8A8_SRGB]: 'bgra8unorm-srgb',
    // Packed 32-bit formats
    [ktxp.VK_FORMAT_E5B9G9R9_UFLOAT_PACK32]: 'rgb9e5ufloat',
    [ktxp.VK_FORMAT_A2R10G10B10_UINT_PACK32]: 'rgb10a2uint',
    [ktxp.VK_FORMAT_A2R10G10B10_UNORM_PACK32]: 'rgb10a2unorm',
    [ktxp.VK_FORMAT_B10G11R11_UFLOAT_PACK32]: 'rg11b10ufloat',
    // 64-bit formats
    [ktxp.VK_FORMAT_R32G32_UINT]: 'rg32uint',
    [ktxp.VK_FORMAT_R32G32_SINT]: 'rg32sint',
    [ktxp.VK_FORMAT_R32G32_SFLOAT]: 'rg32float',
    [ktxp.VK_FORMAT_R16G16B16A16_UINT]: 'rgba16uint',
    [ktxp.VK_FORMAT_R16G16B16A16_SINT]: 'rgba16sint',
    [ktxp.VK_FORMAT_R16G16B16A16_SFLOAT]: 'rgba16float',
    // 128-bit formats
    [ktxp.VK_FORMAT_R32G32B32A32_UINT]: 'rgba32uint',
    [ktxp.VK_FORMAT_R32G32B32A32_SINT]: 'rgba32sint',
    [ktxp.VK_FORMAT_R32G32B32A32_SFLOAT]: 'rgba32float',
    // BC compressed formats usable if "texture-compression-bc" is both
    // supported by the device/user agent and enabled in requestDevice.
    [ktxp.VK_FORMAT_BC1_RGBA_UNORM_BLOCK]: 'bc1-rgba-unorm',
    [ktxp.VK_FORMAT_BC1_RGBA_SRGB_BLOCK]: 'bc1-rgba-unorm-srgb',
    [ktxp.VK_FORMAT_BC2_UNORM_BLOCK]: 'bc2-rgba-unorm',
    [ktxp.VK_FORMAT_BC2_SRGB_BLOCK]: 'bc2-rgba-unorm-srgb',
    [ktxp.VK_FORMAT_BC3_UNORM_BLOCK]: 'bc3-rgba-unorm',
    [ktxp.VK_FORMAT_BC3_SRGB_BLOCK]: 'bc3-rgba-unorm-srgb',
    [ktxp.VK_FORMAT_BC4_UNORM_BLOCK]: 'bc4-r-unorm',
    [ktxp.VK_FORMAT_BC4_SNORM_BLOCK]: 'bc4-r-snorm',
    [ktxp.VK_FORMAT_BC5_UNORM_BLOCK]: 'bc5-rg-unorm',
    [ktxp.VK_FORMAT_BC5_SNORM_BLOCK]: 'bc5-rg-snorm',
    [ktxp.VK_FORMAT_BC6H_UFLOAT_BLOCK]: 'bc6h-rgb-ufloat',
    [ktxp.VK_FORMAT_BC6H_SFLOAT_BLOCK]: 'bc6h-rgb-float',
    [ktxp.VK_FORMAT_BC7_UNORM_BLOCK]: 'bc7-rgba-unorm',
    [ktxp.VK_FORMAT_BC7_SRGB_BLOCK]: 'bc7-rgba-unorm-srgb',
    // Currently unsupported extension formats:
    // ETC2 compressed formats usable if "texture-compression-etc2" is both
    // supported by the device/user agent and enabled in requestDevice.
    // "etc2-rgb8unorm",
    // "etc2-rgb8unorm-srgb",
    // "etc2-rgb8a1unorm",
    // "etc2-rgb8a1unorm-srgb",
    // "etc2-rgba8unorm",
    // "etc2-rgba8unorm-srgb",
    // "eac-r11unorm",
    // "eac-r11snorm",
    // "eac-rg11unorm",
    // "eac-rg11snorm",
    // ASTC compressed formats usable if "texture-compression-astc" is both
    // supported by the device/user agent and enabled in requestDevice.
    // "astc-4x4-unorm",
    // "astc-4x4-unorm-srgb",
    // "astc-5x4-unorm",
    // "astc-5x4-unorm-srgb",
    // "astc-5x5-unorm",
    // "astc-5x5-unorm-srgb",
    // "astc-6x5-unorm",
    // "astc-6x5-unorm-srgb",
    // "astc-6x6-unorm",
    // "astc-6x6-unorm-srgb",
    // "astc-8x5-unorm",
    // "astc-8x5-unorm-srgb",
    // "astc-8x6-unorm",
    // "astc-8x6-unorm-srgb",
    // "astc-8x8-unorm",
    // "astc-8x8-unorm-srgb",
    // "astc-10x5-unorm",
    // "astc-10x5-unorm-srgb",
    // "astc-10x6-unorm",
    // "astc-10x6-unorm-srgb",
    // "astc-10x8-unorm",
    // "astc-10x8-unorm-srgb",
    // "astc-10x10-unorm",
    // "astc-10x10-unorm-srgb",
    // "astc-12x10-unorm",
    // "astc-12x10-unorm-srgb",
    // "astc-12x12-unorm",
};

export const TextureFormatToSize: Partial<Record<GPUTextureFormat, number>> = {
    // 8-bit formats
    r8unorm: 1,
    r8snorm: 1,
    r8uint: 1,
    r8sint: 1,
    // 16-bit formats
    r16uint: 2,
    r16sint: 2,
    r16float: 2,
    rg8unorm: 2,
    rg8snorm: 2,
    rg8uint: 2,
    rg8sint: 2,
    // 32-bit formats
    r32uint: 4,
    r32sint: 4,
    r32float: 4,
    rg16uint: 4,
    rg16sint: 4,
    rg16float: 4,
    rgba8unorm: 4,
    'rgba8unorm-srgb': 4,
    rgba8snorm: 4,
    rgba8uint: 4,
    rgba8sint: 4,
    bgra8unorm: 4,
    'bgra8unorm-srgb': 4,
    // Packed 32-bit formats
    rgb9e5ufloat: 4,
    rgb10a2uint: 4,
    rgb10a2unorm: 4,
    rg11b10ufloat: 4,
    // 64-bit formats
    rg32uint: 8,
    rg32sint: 8,
    rg32float: 8,
    rgba16uint: 8,
    rgba16sint: 8,
    rgba16float: 8,
    // 128-bit formats
    rgba32uint: 16,
    rgba32sint: 16,
    rgba32float: 16,
};

export const TextureFormatToChannelSize: Partial<Record<GPUTextureFormat, number>> = {
    // 8-bit formats
    r8unorm: 1,
    r8snorm: 1,
    r8uint: 1,
    r8sint: 1,
    // 16-bit formats
    r16uint: 2,
    r16sint: 2,
    r16float: 2,
    rg8unorm: 1,
    rg8snorm: 1,
    rg8uint: 1,
    rg8sint: 1,
    // 32-bit formats
    r32uint: 4,
    r32sint: 4,
    r32float: 4,
    rg16uint: 2,
    rg16sint: 2,
    rg16float: 2,
    rgba8unorm: 1,
    'rgba8unorm-srgb': 1,
    rgba8snorm: 1,
    rgba8uint: 1,
    rgba8sint: 1,
    bgra8unorm: 1,
    'bgra8unorm-srgb': 1,
    // Packed 32-bit formats
    rgb9e5ufloat: 4,
    rgb10a2uint: 4,
    rgb10a2unorm: 4,
    rg11b10ufloat: 4,
    // 64-bit formats
    rg32uint: 4,
    rg32sint: 4,
    rg32float: 4,
    rgba16uint: 2,
    rgba16sint: 2,
    rgba16float: 2,
    // 128-bit formats
    rgba32uint: 4,
    rgba32sint: 4,
    rgba32float: 4,
};

export const WebGPUToVkFormat = Object.fromEntries(
    Object.entries(VkFormatToWebGPU).map(([vk, wgpu]) => [wgpu, parseInt(vk, 10)]),
) as Record<GPUTextureFormat, ktxp.VKFormat>;

export const textureTypeToDimension: Record<string, GPUTextureViewDimension> = {
    texture_cube: 'cube',
    texture_3d: '3d',
    texture_2d: '2d',
};
