// declaration.d.ts
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.png' {
    const url: string;
    export default url;
}

declare module '*.jpg' {
    const url: string;
    export default url;
}

declare module '*.mp4' {
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

declare const SAMPLES__: string[];
declare const HDR_BASE_URL__: string;
declare const GLTF_INDEX_FILE__: string;
declare const GLTF_BASE_URL__: string;
