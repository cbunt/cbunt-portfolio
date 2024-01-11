import Camera from './camera';

export default class ForwardUniforms {
    static readonly code = (group: number) => /* wgsl */`
        struct ForwardUniforms {
            worldToView: mat4x4f,
            viewToClip: mat4x4f,
            worldToClip: mat4x4f,
            inverseWorldToView: mat4x4f,
            inverseViewToClip: mat4x4f,
            inverseWorldToClip: mat4x4f,
        }

        @group(${group}) @binding(0) var<uniform> globals: ForwardUniforms;
    `;

    static readonly bufferSize = Camera.bufferLength;

    static readonly layoutDescriptor: GPUBindGroupLayoutDescriptor = {
        label: 'Forward uniforms layout',
        entries: [
            {
                binding: 0,
                buffer: { minBindingSize: ForwardUniforms.bufferSize },
                visibility: GPUShaderStage.VERTEX,
            },
        ],
    };

    static readonly bufferDescriptor: GPUBufferDescriptor = {
        label: 'Forward uniforms buffer',
        size: ForwardUniforms.bufferSize,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    };

    deviceBuffer: GPUBuffer;
    bindGroupLayout: GPUBindGroupLayout;
    bindGroupDescriptor!: GPUBindGroupDescriptor;
    bindgroup!: GPUBindGroup;

    constructor(device: GPUDevice) {
        this.deviceBuffer = device.createBuffer(ForwardUniforms.bufferDescriptor);
        this.bindGroupLayout = device.createBindGroupLayout(ForwardUniforms.layoutDescriptor);

        this.bindGroupDescriptor = {
            label: 'forward pass uniforms bind group',
            layout: this.bindGroupLayout,
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: this.deviceBuffer,
                        offset: 0,
                        size: ForwardUniforms.bufferSize,
                    },
                },
            ],
        };

        this.bindgroup = device.createBindGroup(this.bindGroupDescriptor);
    }

    updateDeviceBuffer(queue: GPUQueue, camera: Camera) {
        camera.cacheView();
        queue.writeBuffer(this.deviceBuffer, 0, camera.buffer);
    }
}
