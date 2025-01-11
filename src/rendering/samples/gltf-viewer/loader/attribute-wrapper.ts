/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { GLTFAccessorPostprocessed } from '@loaders.gl/gltf';
import { ComponentType } from './type-conversions';

export default class AttributeWrapper {
    data: TypedArray;
    processed: boolean;
    componentsPerElement: number;
    bytesPerComponent: number;
    count: number;

    copyFrom: (srcIdx: number, dstIdx: number, dst: Float32Array) => void;

    at?: (i: number, j: number) => number;
    view?: DataView;

    unwelded = false;

    constructor(accessor: GLTFAccessorPostprocessed);
    constructor(array: Float32Array, componentCount: number);

    constructor(accessor: GLTFAccessorPostprocessed | Float32Array, componentCount?: number) {
        if (accessor instanceof Float32Array) {
            this.data = accessor;
            this.componentsPerElement = componentCount!;
            this.count = accessor.length / componentCount!;
            this.processed = true;
            this.bytesPerComponent = 4;
            this.copyFrom = this.copyProcessed.bind(this);
        } else {
            this.data = accessor.value;
            this.componentsPerElement = accessor.components;
            this.count = accessor.count;
            this.bytesPerComponent = accessor.bytesPerComponent;
            this.processed = false;
            this.view = new DataView(this.data.buffer);
            this.copyFrom = this.copyUnprocessed.bind(this);

            switch (accessor.componentType as ComponentType) {
                case ComponentType.int8: {
                    this.at = (i, j) => this.view!.getInt8(i * this.componentsPerElement + j);
                    break;
                }
                case ComponentType.uint8: {
                    this.at = (i, j) => this.view!.getUint8(i * this.componentsPerElement + j);
                    break;
                }
                case ComponentType.int16: {
                    this.at = (i, j) => {
                        const offset = 2 * (i * this.componentsPerElement + j);
                        return this.view!.getInt16(offset, true);
                    };
                    break;
                }
                case ComponentType.uint16: {
                    this.at = (i, j) => {
                        const offset = 2 * (i * this.componentsPerElement + j);
                        return this.view!.getUint16(offset, true);
                    };
                    break;
                }
                case ComponentType.uint32: {
                    this.at = (i, j) => {
                        const offset = 4 * (i * this.componentsPerElement + j);
                        return this.view!.getUint32(offset, true);
                    };
                    break;
                }
                case ComponentType.float32: {
                    this.at = (i, j) => {
                        const offset = 4 * (i * this.componentsPerElement + j);
                        return this.view!.getFloat32(offset, true);
                    };
                    break;
                }
                default: throw new Error(`gltf importer -- invalid componentType ${accessor.componentType}`);
            }

            if (accessor.normalized) {
                let val: number;
                switch (accessor.componentType as ComponentType) {
                    case ComponentType.uint8: val = 255; break;
                    case ComponentType.int8: val = 127; break;
                    case ComponentType.uint16: val = 65535; break;
                    case ComponentType.int16: val = 32767; break;
                    case ComponentType.uint32: val = 4294967295; break;
                    default: throw new Error(`gltf importer -- invalid componentType ${accessor.componentType}`);
                }

                this.at = (i, j) => this.at!(i, j) / val;
            }
        }
    }

    get array(): Float32Array {
        if (!this.processed) this.process();
        return this.data as Float32Array;
    }

    copyProcessed(srcIdx: number, dstIdx: number, dst: Float32Array) {
        for (let j = 0; j < this.componentsPerElement; j += 1) {
            dst[dstIdx + j] = this.data[(srcIdx * this.componentsPerElement) + j];
        }
    }

    copyUnprocessed(srcIdx: number, dstIdx: number, dst: Float32Array) {
        for (let j = 0; j < this.componentsPerElement; j += 1) {
            dst[dstIdx + j] = this.at!(srcIdx, j);
        }
    }

    markProcessed() {
        this.processed = true;
        this.copyFrom = this.copyProcessed.bind(this);
        delete this.view;
        delete this.at;
    }

    process() {
        if (this.processed) return;
        const newView = new Float32Array(this.count * this.componentsPerElement);

        for (let i = 0; i < this.count; i += 1) {
            this.copyFrom(i, i * this.componentsPerElement, newView);
        }

        this.data = newView;
        this.markProcessed();
    }

    unweld(indexArray: TypedArray): void {
        if (this.unwelded) return;
        this.unwelded = true;
        const newView = new Float32Array(indexArray.length * this.componentsPerElement);

        for (let i = 0; i < indexArray.length; i += 1) {
            this.copyFrom(indexArray[i], i * this.componentsPerElement, newView);
        }

        this.count = indexArray.length;
        this.data = newView;
        this.markProcessed();
    }

    remap(remap: TypedArray, dstCount: number): void {
        const dstArray = new Float32Array(dstCount * this.componentsPerElement);
        const done = new Uint8Array(dstCount);

        for (let srcIndex = 0; srcIndex < this.count; srcIndex += 1) {
            const dstIndex = remap[srcIndex];
            if (done[dstIndex]) continue;
            this.copyFrom(srcIndex, dstIndex * this.componentsPerElement, dstArray);
            done[dstIndex] = 1;
        }

        this.data = dstArray;
        this.markProcessed();
    }
}
