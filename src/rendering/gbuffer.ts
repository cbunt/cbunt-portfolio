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

    normal = this.createTexture({
        format: 'rgba16float',
        name: 'normal',
        clearValue: { r: 0, g: 0, b: 1, a: 1 },
    });

    albedo = this.createTexture({
        format: 'rgba8unorm',
        name: 'albedo',
        clearValue: { r: 0, g: 0, b: 0, a: 1 },
    });

    emission = this.createTexture({
        format: 'rgba16float',
        name: 'emission',
        clearValue: { r: 0, g: 0, b: 0, a: 1 },
    });

    metallicRoughness = this.createTexture({
        format: 'rg8unorm',
        name: 'metallic roughness',
        clearValue: { r: 0, g: 0, b: 0, a: 0 },
    });

    depth = this.createTexture({
        format: 'depth32float',
        name: 'depth',
    });

    textures = [
        this.normal,
        this.albedo,
        this.emission,
        this.metallicRoughness,
        this.depth,
    ];

    targets = this.textures.slice(0, -1).map(({ format }) => ({ format }));

    bindGroupLayout = this.device.createBindGroupLayout(GBuffer.layoutDescription);
    bindgroup = this.updateBindgroup();
    passDescriptor = this.updatePassDescriptor();

    get size() { return this._size; }
    set size(value: GPUExtent3D) {
        this._size = value;

        this.textures.forEach((tex) => { this.createTexture(tex); });
        this.bindgroup = this.updateBindgroup();
        this.passDescriptor = this.updatePassDescriptor();
    }

    constructor(
        public readonly device: GPUDevice,
        private _size: GPUExtent3D,
    ) { }

    updateBindgroup() {
        const entries = this.textures.map(({ view }, idx) => ({
            binding: idx,
            resource: view,
        }));

        return this.device.createBindGroup({
            label: 'gbuffer bind group',
            layout: this.bindGroupLayout,
            entries,
        });
    }

    updatePassDescriptor() {
        const colorAttachments = this.textures.slice(0, -1).map(({ view, clearValue }) => ({
            view: view,
            clearValue: clearValue,
            loadOp: 'clear',
            storeOp: 'store',
        }));

        return {
            label: 'forward pass encoder',
            colorAttachments,
            depthStencilAttachment: {
                view: this.depth.view,
                depthLoadOp: 'clear',
                depthStoreOp: 'store',
                depthClearValue: 1.0,
            },
        } as GPURenderPassDescriptor;
    }

    createTexture(tex: TextureData) {
        const label = `gbuffer ${tex.name}`;
        tex.texture = this.device.createTexture({
            label,
            size: this._size,
            format: tex.format,
            usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
        });
        tex.view = tex.texture.createView({ label });
        return tex as TextureData & Required<Pick<TextureData, 'texture' | 'view'>>;
    }
}
