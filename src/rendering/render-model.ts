export type ViewInfo = {
    view: GPUTextureView,
    size: GPUExtent3D,
    format: GPUTextureFormat,
};

export type SkyboxTarget = {
    skyTexture: GPUTextureView,
    useNearestSample: boolean,
    mipLevel: number,
};

export type RenderModel = {
    render(encoder: GPUCommandEncoder): GPURenderPassEncoder,
    setTarget(view: ViewInfo): void,
    setSkybox(resource: URL | string | GPUTexture): Promise<void>,
    depthTextureView: GPUTextureView,
};

export type ModelConstructor = new(
    device: GPUDevice,
    skyboxTarget: SkyboxTarget,
    target: ViewInfo,
) => RenderModel;
