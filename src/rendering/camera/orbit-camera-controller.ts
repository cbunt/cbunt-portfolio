import { quat, vec3 } from 'wgpu-matrix';
import Camera from './camera';
import { clamp } from '../../utils/general';

export class OrbitCameraController {
    xSensitivity = 0.25;
    ySensitivity = 0.25;
    panSpeed = 0.0005;

    zoomSensitivity = 0.001;
    minZoomSpeed = 0.1;
    maxZoomSpeed = 5;
    minZoom = 0;
    maxZoom = 50;
    currentZoom = 2.5;
    readonly focusPoint = vec3.create();

    rotationY = 0;
    rotationX = 0;
    readonly movement = vec3.create();

    constructor(public camera: Camera) { this.update(); }

    rotate(x: number, y: number) {
        this.rotationY -= x * this.xSensitivity;
        this.rotationY = (this.rotationY + 360) % 360;

        this.rotationX -= y * this.ySensitivity;
        this.rotationX = clamp(this.rotationX, -90, 90);

        quat.fromEuler(this.rotationX * (Math.PI / 180), this.rotationY * (Math.PI / 180), 0, 'zyx', this.camera.rotation);
        this.update();
    }

    pan(x: number, y: number) {
        const speed = this.panSpeed * Math.max(this.currentZoom, 0.1);
        const delta = vec3.transformQuat([x * speed, y * speed, 0], this.camera.rotation);
        vec3.add(delta, this.focusPoint, this.focusPoint);
        this.update();
    }

    zoom(delta: number) {
        const changeAbs = this.currentZoom * Math.abs(delta) * this.zoomSensitivity;
        const changeScaled = Math.sign(delta) * clamp(changeAbs, this.minZoomSpeed, this.maxZoomSpeed);
        this.currentZoom = clamp(this.currentZoom + changeScaled, this.minZoom, this.maxZoom);
        this.update();
    }

    update() {
        const rot = vec3.transformQuat([0, 0, this.currentZoom], this.camera.rotation, []);
        vec3.add(rot, this.focusPoint, this.camera.location);
    }
}
