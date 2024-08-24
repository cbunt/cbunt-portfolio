import { mat3, mat4, Mat3, Mat4 } from 'wgpu-matrix';

import { TypeSizes } from '../constants';
import { createAndCopyBuffer } from '../../utils/data-copy';
import { PipelineFeatureFlags } from './pipeline-feature-flags';
import DescriptorMap from './descriptor-map';

export type PrimitiveDescriptor = {
    name?: string,
    // vertexBufferLayouts: GPUVertexBufferLayout;
    features: PipelineFeatureFlags,
    vertexCount: number,
    vertexArray: ArrayBuffer | TypedArray | GPUBuffer,
    indexArray?: ArrayBuffer | TypedArray,
    indexFormat?: GPUIndexFormat,
};

export type IndexData = {
    indexBuffer: GPUBuffer,
    indexCount: number,
    indexFormat: GPUIndexFormat,
};

export class PrimitiveDrawData {
    name: string;
    vertexBuffer: GPUBuffer;
    indexData?: IndexData;
    instanceBuffer: GPUBuffer;
    instanceBindGroup: GPUBindGroup;
    vertexCount: number;
    features: number;

    instanceSize: number;

    instances: ArrayBuffer;
    modelMatrices: Mat4[];
    normalMatrices!: Mat3[];
    max: number;

    instanceCount: number = 0;
    dirty: boolean = false;

    constructor(
        primitive: PrimitiveDescriptor,
        device: GPUDevice,
        max: number,
        descriptorMap: DescriptorMap,
        instances?: Mat4[],
    ) {
        this.max = max;
        this.features = primitive.features;
        this.name = primitive.name ?? 'mesh';
        this.vertexCount = primitive.vertexCount;

        if (primitive.vertexArray instanceof GPUBuffer) {
            this.vertexBuffer = primitive.vertexArray;
        } else {
            this.vertexBuffer = createAndCopyBuffer(
                primitive.vertexArray,
                GPUBufferUsage.VERTEX,
                device,
                `${this.name} vertex buffer`,
            );
        }

        if (primitive.indexArray && primitive.indexFormat) {
            const { indexArray, indexFormat } = primitive;
            this.indexData = {
                indexFormat,
                indexCount: indexArray.byteLength / (indexFormat === 'uint16' ? 2 : 4),
                indexBuffer: createAndCopyBuffer(
                    primitive.indexArray,
                    GPUBufferUsage.INDEX,
                    device,
                    `${this.name} index buffer`,
                ),
            };
        }

        this.instanceSize = TypeSizes.sizeofMat4x4f;
        if (this.features & PipelineFeatureFlags.VertexNormals) {
            this.instanceSize += 12 * 4;
        }

        this.instances = new ArrayBuffer(max * this.instanceSize);
        this.modelMatrices = new Array(max) as Float32Array[];

        for (let i = 0; i < max; i += 1) {
            const offset = i * this.instanceSize;
            this.modelMatrices[i] = new Float32Array(this.instances, offset, 16);
        }

        if (this.features & PipelineFeatureFlags.VertexNormals) {
            this.normalMatrices = new Array(max) as Float32Array[];

            for (let i = 0; i < max; i += 1) {
                const offset = (i * this.instanceSize) + TypeSizes.sizeofMat4x4f;
                this.normalMatrices[i] = new Float32Array(this.instances, offset, 12);
            }
        }

        this.instanceBuffer = device.createBuffer({
            label: `${this.name} instance buffer`,
            size: this.instances.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.UNIFORM,
        });

        this.instanceBindGroup = device.createBindGroup({
            label: `PrimitiveDrawData instance bind group`,
            layout: descriptorMap.forwardBindgroupLayout,
            entries: [{
                binding: 0,
                resource: { buffer: this.instanceBuffer },
            }],
        });

        if (instances) {
            for (const instance of instances) {
                this.addInstance(instance);
            }
        }
    }

    draw(passEncoder: GPURenderPassEncoder, queue: GPUQueue) {
        if (this.dirty) {
            queue.writeBuffer(this.instanceBuffer, 0, this.instances);
            this.dirty = false;
        }

        passEncoder.setVertexBuffer(0, this.vertexBuffer);
        passEncoder.setBindGroup(2, this.instanceBindGroup);

        if (this.indexData != null) {
            const { indexBuffer, indexCount, indexFormat } = this.indexData;
            passEncoder.setIndexBuffer(indexBuffer, indexFormat);
            passEncoder.drawIndexed(indexCount, this.instanceCount);
        } else {
            passEncoder.draw(this.vertexCount, this.instanceCount);
        }
    }

    addInstance(transform: Mat4) {
        if (this.instanceCount === this.max) return;
        mat4.copy(transform, this.modelMatrices[this.instanceCount]);
        this.calculateNormalMatrix(this.instanceCount);
        this.instanceCount += 1;
        this.dirty = true;
    }

    calculateNormalMatrix(idx: number) {
        if (!(this.features & PipelineFeatureFlags.VertexNormals)) return;
        const normalMatrix = this.normalMatrices[idx];
        mat3.fromMat4(this.modelMatrices[idx], normalMatrix);
        mat3.invert(normalMatrix, normalMatrix);
        mat3.transpose(normalMatrix, normalMatrix);
    }
}
