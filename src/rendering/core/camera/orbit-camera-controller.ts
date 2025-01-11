import { quat, Vec3, vec3 } from 'wgpu-matrix';
import Camera from './camera';
import { clamp } from '../../../utils/general';

const DEG_TO_RAD = Math.PI / 180;

export class OrbitCameraController {
    xSensitivity = 0.2;
    ySensitivity = 0.2;
    panSpeed = 0.0005;

    zoomSensitivity = 0.001;
    minZoomSpeed = 0.1;
    maxZoomSpeed = 5;
    minZoom = 0;
    maxZoom = 50;

    phi = 0;
    theta = 0;

    focusPoint: Vec3;

    constructor(
        public camera: Camera,
        focusPoint: [number, number, number] = [0, 0, 0],
        public currentZoom = 2.5,
    ) {
        this.focusPoint = vec3.create(...focusPoint);
        this.update();
    }

    rotate(x: number, y: number) {
        this.phi -= x * this.xSensitivity;
        this.phi = (this.phi + 360) % 360;

        this.theta -= y * this.ySensitivity;
        this.theta = clamp(this.theta, -90, 90);

        quat.fromEuler(this.theta * DEG_TO_RAD, this.phi * DEG_TO_RAD, 0, 'zyx', this.camera.rotation);
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
