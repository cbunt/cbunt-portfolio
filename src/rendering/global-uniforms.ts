import Camera from './camera/camera';

const label = 'global uniforms';

export default class GlobalUniforms {
    static readonly code = (group: number) => /* wgsl */`
        struct GlobalUniforms {
            worldToView: mat4x4f,
            viewToClip: mat4x4f,
            worldToClip: mat4x4f,
            inverseWorldToView: mat4x4f,
            inverseViewToClip: mat4x4f,
            inverseWorldToClip: mat4x4f,
        }

        @group(${group}) @binding(0) var<uniform> globals: GlobalUniforms;
    `;

    static readonly bufferSize = Camera.bufferLength;

    static readonly layoutDescriptor: GPUBindGroupLayoutDescriptor = {
        label,
        entries: [
            {
                binding: 0,
                buffer: { minBindingSize: GlobalUniforms.bufferSize },
                visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
            },
        ],
    };

    static readonly bufferDescriptor: GPUBufferDescriptor = {
        label,
        size: GlobalUniforms.bufferSize,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    };

    deviceBuffer: GPUBuffer;
    bindGroupLayout: GPUBindGroupLayout;
    bindGroupDescriptor!: GPUBindGroupDescriptor;
    bindgroup!: GPUBindGroup;

    constructor(device: GPUDevice) {
        this.deviceBuffer = device.createBuffer(GlobalUniforms.bufferDescriptor);
        this.bindGroupLayout = device.createBindGroupLayout(GlobalUniforms.layoutDescriptor);

        this.bindGroupDescriptor = {
            label,
            layout: this.bindGroupLayout,
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: this.deviceBuffer,
                        offset: 0,
                        size: GlobalUniforms.bufferSize,
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
