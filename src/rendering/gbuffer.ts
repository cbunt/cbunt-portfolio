type TextureData = {
    format: GPUTextureFormat,
    name: string,
    clearValue?: GPUColor,
    texture?: GPUTexture,
    view?: GPUTextureView,
};

export const enum GBufferGroupIndices {
    Normal = 0,
    Albedo,
    Emission,
    MetallicRoughness,
    Depth,
}

export default class GBuffer {
    static readonly code = (group: number) => /* wgsl */`
        @group(${group}) @binding(${GBufferGroupIndices.Normal}) 
        var gBufferNormal: texture_2d<f32>;
        
        @group(${group}) @binding(${GBufferGroupIndices.Albedo}) 
        var gBufferAlbedo: texture_2d<f32>;
        
        @group(${group}) @binding(${GBufferGroupIndices.Emission}) 
        var gBufferEmission: texture_2d<f32>;

        @group(${group}) @binding(${GBufferGroupIndices.MetallicRoughness}) 
        var gBufferMetallicRoughness: texture_2d<f32>;
        
        @group(${group}) @binding(${GBufferGroupIndices.Depth})  
        var gBufferDepth: texture_depth_2d;
    `;

    static readonly layoutDescription: GPUBindGroupLayoutDescriptor = {
        label: 'gbuffer bind group layout',
        entries: [
            {
                binding: GBufferGroupIndices.Normal,
                visibility: GPUShaderStage.FRAGMENT,
                texture: { sampleType: 'unfilterable-float' },
            },
            {
                binding: GBufferGroupIndices.Albedo,
                visibility: GPUShaderStage.FRAGMENT,
                texture: { sampleType: 'float' },
            },
            {
                binding: GBufferGroupIndices.Emission,
                visibility: GPUShaderStage.FRAGMENT,
                texture: { sampleType: 'float' },
            },
            {
                binding: GBufferGroupIndices.MetallicRoughness,
                visibility: GPUShaderStage.FRAGMENT,
                texture: { sampleType: 'unfilterable-float' },
            },
            {
                binding: GBufferGroupIndices.Depth,
                visibility: GPUShaderStage.FRAGMENT,
                texture: { sampleType: 'depth' },
            },
        ],
    };

    normal: TextureData = {
        format: 'rgba16float',
        name: 'normal',
        clearValue: { r: 0, g: 0, b: 1, a: 1 },
    };

    albedo: TextureData = {
        format: 'rgba8unorm',
        name: 'albedo',
        clearValue: { r: 0, g: 0, b: 0, a: 1 },
    };

    emission: TextureData = {
        format: 'rgba16float',
        name: 'emission',
        clearValue: { r: 0, g: 0, b: 0, a: 1 },
    };

    metallicRoughness: TextureData = {
        format: 'rg8unorm',
        name: 'metallic roughness',
        clearValue: { r: 0, g: 0, b: 0, a: 0 },
    };

    depth: TextureData = { format: 'depth32float', name: 'depth' };

    textures = [
        this.normal,
        this.albedo,
        this.emission,
        this.metallicRoughness,
        this.depth,
    ];

    targets = this.textures.slice(0, -1).map(({ format }) => ({ format }));

    bindGroupLayout: GPUBindGroupLayout;
    bindgroup!: GPUBindGroup;
    passDescriptor!: GPURenderPassDescriptor;

    constructor(public readonly device: GPUDevice, size: GPUExtent3D) {
        this.device = device;
        this.bindGroupLayout = this.device.createBindGroupLayout(GBuffer.layoutDescription);

        let width: number, height: number | undefined;
        if ('width' in size) {
            ({ width, height } = size);
        } else {
            ([width, height] = size);
        }
        height ??= width;

        this.resize({ width, height });
    }

    resize(size: GPUExtent3DStrict) {
        this.textures.forEach((tex) => { this.createTexture(tex, size); });

        const entries = this.textures.map(({ view }, idx) => ({
            binding: idx,
            resource: view!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
        }));

        this.bindgroup = this.device.createBindGroup({
            label: 'gbuffer bind group',
            layout: this.bindGroupLayout,
            entries,
        });

        const colorAttachments = this.textures.slice(0, -1).map(({ view, clearValue }) => ({
            view: view!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
            clearValue: clearValue!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
            loadOp: 'clear',
            storeOp: 'store',
        })) as GPURenderPassColorAttachment[];

        this.passDescriptor = {
            label: 'forward pass encoder',
            colorAttachments,
            depthStencilAttachment: {
                view: this.depth.view!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
                depthClearValue: 1.0,
                depthLoadOp: 'clear',
                depthStoreOp: 'store',
            },
        };
    }

    createTexture(tex: TextureData, size: GPUExtent3DStrict) {
        const label = `gbuffer ${tex.name}`;
        tex.texture = this.device.createTexture({
            label,
            size,
            format: tex.format,
            usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
        });
        tex.view = tex.texture.createView({ label });
    }
}
