import { quat, vec3 } from 'wgpu-matrix';
import Camera from './camera';

export const enum Directions {
    none = 0,
    backward = 1 << 0,
    forward = 1 << 1,
    right = 1 << 2,
    left = 1 << 3,
    up = 1 << 4,
    down = 1 << 5,
}

export class FpsCameraController {
    xSensitivity = -0.5;
    ySensitivity = -0.5;
    moveSpeed = 1 / 350;
    lastTime = 0;

    directions = Directions.none;
    rotationY = 0;
    rotationX = 0;
    readonly movement = vec3.create();

    constructor(public camera: Camera) { }

    changeMovement(dir: Directions, type: 'add' | 'remove') {
        if (type === 'add') {
            this.directions |= dir;
        } else {
            this.directions &= ~dir;
        }
    }

    freeze() {
        this.directions = Directions.none;
    }

    rotate(x: number, y: number) {
        this.rotationY += x * this.xSensitivity;
        this.rotationY = (this.rotationY + 360) % 360;

        this.rotationX += y * this.ySensitivity;
        this.rotationX = Math.min(90, Math.max(-90, this.rotationX));

        quat.fromEuler(this.rotationX * (Math.PI / 180), this.rotationY * (Math.PI / 180), 0, 'zyx', this.camera.rotation);
    }

    step(time: number) {
        const deltaTime = time - this.lastTime;
        this.lastTime = time;

        this.movement[0] = ((this.directions & Directions.right) ? 1 : 0)
        - ((this.directions & Directions.left) ? 1 : 0);
        this.movement[1] = ((this.directions & Directions.up) ? 1 : 0)
        - ((this.directions & Directions.down) ? 1 : 0);
        this.movement[2] = ((this.directions & Directions.backward) ? 1 : 0)
        - ((this.directions & Directions.forward) ? 1 : 0);

        vec3.normalize(this.movement, this.movement);
        vec3.transformQuat(this.movement, this.camera.rotation, this.movement);
        vec3.addScaled(
            this.camera.location,
            this.movement,
            deltaTime * this.moveSpeed,
            this.camera.location,
        );
    }
}
