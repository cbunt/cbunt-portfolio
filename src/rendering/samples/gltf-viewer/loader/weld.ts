import AttributeWrapper from './attribute-wrapper';

/**
 * Adapted from gltf-transform's version:
 * github.com/donmccurdy/glTF-Transform/blob/main/packages/functions/src/weld.ts
 */
class HashTable {
    private attributes: { u8: Uint8Array, byteStride: number }[] = [];
    private u8: Uint8Array;
    private u32: Uint32Array;

    constructor(prim: Record<string, AttributeWrapper>) {
        let byteStride = 0;
        for (const attribute of Object.values(prim)) {
            byteStride += this.initAttribute(attribute);
        }
        const paddedByteStride = (byteStride + 3) & ~3;
        this.u8 = new Uint8Array(paddedByteStride);
        this.u32 = new Uint32Array(this.u8.buffer);
    }

    private initAttribute(attribute: AttributeWrapper): number {
        const u8 = attribute.data instanceof Uint8Array
            ? attribute.data
            : new Uint8Array(attribute.data.buffer);
        const byteStride = attribute.bytesPerComponent * attribute.componentsPerElement;
        this.attributes.push({ u8, byteStride });
        return byteStride;
    }

    hash(index: number): number {
        let byteOffset = 0;
        for (const { u8, byteStride } of this.attributes) {
            for (let i = 0; i < byteStride; i += 1) {
                this.u8[byteOffset + i] = u8[index * byteStride + i];
            }
            byteOffset += byteStride;
        }
        return this.murmurHash2();
    }

    equal(a: number, b: number): boolean {
        for (const { u8, byteStride } of this.attributes) {
            for (let j = 0; j < byteStride; j += 1) {
                if (u8[a * byteStride + j] !== u8[b * byteStride + j]) {
                    return false;
                }
            }
        }
        return true;
    }

    hashLookup(table: TypedArray, buckets: number, key: number, empty: number): number {
        const hashmod = buckets - 1;
        const hashval = this.hash(key);
        let bucket = hashval & hashmod;

        for (let probe = 0; probe <= hashmod; probe += 1) {
            const item = table[bucket];

            if (item === empty || this.equal(item, key)) {
                return bucket;
            }

            bucket = (bucket + probe + 1) & hashmod; // Hash collision.
        }

        throw new Error('Hash table full.');
    }

    /**
     * References:
     * - https://github.com/mikolalysenko/murmurhash-js/blob/f19136e9f9c17f8cddc216ca3d44ec7c5c502f60/murmurhash2_gc.js#L14
     * - https://github.com/zeux/meshoptimizer/blob/e47e1be6d3d9513153188216455bdbed40a206ef/src/indexgenerator.cpp#L12
     */
    murmurHash2(): number {
        const m = 0x5bd1e995;
        const r = 24;
        let h = 0;

        for (let k of this.u32) {
            k = Math.imul(k, m) >>> 0;
            k = (k ^ (k >> r)) >>> 0;
            k = Math.imul(k, m) >>> 0;

            h = Math.imul(h, m) >>> 0;
            h = (h ^ k) >>> 0;
        }

        return h;
    }
}

function ceilPowerOfTwo(value: number): number {
    return 2 ** Math.ceil(Math.log(value) / Math.LN2);
}

/**
 * Weld and merge, combining vertices that are bitwise-equal.
 *
 * Adapted from gltf-transform's _weldPrimitiveStrict:
 * github.com/donmccurdy/glTF-Transform/blob/main/packages/functions/src/weld.ts#L193
 */
export default function weld(prim: Record<string, AttributeWrapper>) {
    const srcVertexCount = prim.POSITION.count;
    const hash = new HashTable(prim);
    const tableSize = ceilPowerOfTwo(srcVertexCount + (srcVertexCount / 4));
    const is16Bit = srcVertexCount < (2 ** 16 - 1);
    const empty = 2 ** (is16Bit ? 16 : 32) - 1;
    const indexFormat: GPUIndexFormat = is16Bit ? 'uint16' : 'uint32';
    const writeMap = is16Bit ? new Uint16Array(srcVertexCount) : new Uint32Array(srcVertexCount);
    const table = is16Bit ? new Uint16Array(tableSize) : new Uint32Array(tableSize);
    table.fill(empty);

    let dstVertexCount = 0;

    for (let i = 0; i < srcVertexCount; i += 1) {
        const hashIndex = hash.hashLookup(table, tableSize, i, empty);
        const dstIndex = table[hashIndex];

        if (dstIndex === empty) {
            table[hashIndex] = i;
            writeMap[i] = dstVertexCount;
            dstVertexCount += 1;
        } else {
            writeMap[i] = writeMap[dstIndex];
        }
    }

    for (const attribute of Object.values(prim)) {
        attribute.remap(writeMap, dstVertexCount);
    }

    // The gltf-transform version checks for degenerate triangles to remove.
    // This is omitted here.
    return { indexArray: writeMap, indexFormat, vertexCount: dstVertexCount };
}
