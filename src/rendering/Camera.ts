import { Vec3, Mat4, mat4, Quat } from 'wgpu-matrix';
import { TypeSizes } from './constants';

export type CameraParams = {
    nearPlane: number,
    farPlane: number,
    fov: number,
    width: number,
    height: number,
    projection: 'perspective' | 'ortho',
};

export default class Camera {
    static readonly orientation = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, -1, 0,
        0, 0, 0, 1,
    ]);

    static readonly worldToViewOffset = 0;
    static readonly viewToClipOffset = this.worldToViewOffset + TypeSizes.sizeofMat4x4f;
    static readonly worldToClipOffset = this.viewToClipOffset + TypeSizes.sizeofMat4x4f;
    static readonly viewToWorldOffset = this.worldToClipOffset + TypeSizes.sizeofMat4x4f;
    static readonly clipToViewOffset = this.viewToWorldOffset + TypeSizes.sizeofMat4x4f;
    static readonly clipToWorldOffset = this.clipToViewOffset + TypeSizes.sizeofMat4x4f;

    static readonly bufferLength = this.clipToWorldOffset + TypeSizes.sizeofMat4x4f;

    /**
   *  An ArrayBuffer containing the camera's worldToView, viewToClip, worldToClip,
   *  viewToWorld, clipToView, and clipToWorld matrices as Float32Arrays for
   *  easier transfer. Ordered as listed above.
   */
    readonly buffer: ArrayBuffer = new ArrayBuffer(Camera.bufferLength);

    readonly worldToView: Mat4 = new Float32Array(
        this.buffer,
        Camera.worldToViewOffset,
        TypeSizes.mat4x4Count,
    );

    readonly viewToClip: Mat4 = new Float32Array(
        this.buffer,
        Camera.viewToClipOffset,
        TypeSizes.mat4x4Count,
    );

    readonly worldToClip: Mat4 = new Float32Array(
        this.buffer,
        Camera.worldToClipOffset,
        TypeSizes.mat4x4Count,
    );

    readonly viewToWorld: Mat4 = new Float32Array(
        this.buffer,
        Camera.viewToWorldOffset,
        TypeSizes.mat4x4Count,
    );

    readonly clipToView: Mat4 = new Float32Array(
        this.buffer,
        Camera.clipToViewOffset,
        TypeSizes.mat4x4Count,
    );

    readonly clipToWorld: Mat4 = new Float32Array(
        this.buffer,
        Camera.clipToWorldOffset,
        TypeSizes.mat4x4Count,
    );

    readonly location: Vec3 = new Float32Array([0, 0, 0]);
    readonly rotation: Quat = new Float32Array([0, 0, 0, 1]);

    params: CameraParams = {
        nearPlane: 0.3,
        farPlane: 500.0,
        fov: 60,
        width: 1920,
        height: 1080,
        projection: 'perspective',
    };

    constructor(viewParams: Partial<CameraParams> = {}) {
        this.updateParams(viewParams);
    }

    updateParams(val: Partial<CameraParams>) {
        this.params = { ...this.params, ...val };
        this.#cacheProjection();
    }

    cacheView(): void {
        mat4.fromQuat(this.rotation, this.viewToWorld);
        mat4.setTranslation(this.viewToWorld, this.location, this.viewToWorld);
        // mat4.mul(this.viewToWorld, Camera.orientation, this.viewToWorld);
        mat4.invert(this.viewToWorld, this.worldToView);
        mat4.mul(this.viewToClip, this.worldToView, this.worldToClip);
        mat4.mul(this.viewToWorld, this.clipToView, this.clipToWorld);
    }

    #cacheProjection(): void {
        if (this.params.projection === 'perspective') {
            mat4.perspective(
                this.params.fov * (Math.PI / 180),
                this.params.width / this.params.height,
                this.params.nearPlane,
                this.params.farPlane,
                this.viewToClip,
            );
        } else {
            const x = this.params.width / 2;
            const y = this.params.height / 2;

            mat4.ortho(
                -x,
                x,
                -y,
                y,
                this.params.nearPlane,
                this.params.farPlane,
                this.viewToClip,
            );
        }

        mat4.invert(this.viewToClip, this.clipToView);
    }
}
