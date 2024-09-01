// declaration.d.ts
declare module '*.css' {
    const content: Record<string, string>;
    export default content;
}

declare module '*.wgsl' {
    const shader: string;
    export default shader;
}

declare module '*.ktx2' {
    const url: string;
    export default url;
}

declare module '*.bin' {
    const url: string;
    export default url;
}

declare module '*.gltf' {
    const url: string;
    export default url;
}

declare module '*.png' {
    const url: string;
    export default url;
}

declare module '*.hdr' {
    const url: string;
    export default url;
}

declare module '*.json' {
    const content: object;
    export default content;
}

declare module '*.glb' {
    const url: string;
    export default url;
}

declare module '*?raw' {
    const text: string;
    export default text;
}

declare type TypedArray =
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array
    | Float64Array;

declare type TypedArrayConstructor =
    | Int8ArrayConstructor
    | Uint8ArrayConstructor
    | Uint8ClampedArrayConstructor
    | Int16ArrayConstructor
    | Uint16ArrayConstructor
    | Int32ArrayConstructor
    | Uint32ArrayConstructor
    | Float32ArrayConstructor
    | Float64ArrayConstructor;

declare type TypedArrayLike = Pick<TypedArray, 'buffer' | 'byteLength' | 'byteOffset'>;

declare const SAMPLES__: string[];
declare const HDRS__: string[];
declare const GLTF_INDEX_FILE__: string;
declare const GLTF_BASE_URL__: string;
