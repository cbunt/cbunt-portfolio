import { useRef, useEffect, useState, WheelEvent, MouseEvent } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import styled from 'styled-components';

import type Renderer from '../../rendering/renderer';
import type { LoadModelConstructor, ModelSetting } from '../../samples/settings/sample-spec';

import ModelSettingsWidget from './model-settings-gui';
import FullscreenButton from './fullscreen-button';
import { OrbitCameraController } from '../../rendering/camera';

const ViewportStyle = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    canvas {
        width: 100%;
        height: 100%;
        cursor: grab;
        display: block;
    }
`;

const enum MoveState {
    none = 0,
    rotate = 1,
    zoom = 2,
    pan = 4,
}

export type ViewportProps = {
    getModelConstructor: LoadModelConstructor,
};

export default function Viewport({ getModelConstructor }: ViewportProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rendererRef = useRef<Renderer | null>(null);
    const controllerRef = useRef<OrbitCameraController | null>(null);
    const isFocusedRef = useRef(false);
    const canFocus = useRef(true);
    const mainRef = useRef<HTMLDivElement | null>(null);
    const moveRef = useRef(MoveState.none);
    const [settings, setSettings] = useState<Record<string, ModelSetting> | null>(null);

    const handleMouseMove = (e: globalThis.MouseEvent) => {
        if (controllerRef.current == null) return;
        const controller = controllerRef.current;
        const { movementX: x, movementY: y } = e;
        if (moveRef.current & MoveState.rotate) controller.rotate(x, y);
        if (moveRef.current & MoveState.zoom) controller.zoom(10 * y);
        if (moveRef.current & MoveState.pan) controller.pan(-x, y);
    };

    const handleMouseDown = (e: MouseEvent) => {
        moveRef.current = e.buttons & 0b111;
        if (!canFocus.current) return;
        canvasRef.current?.requestPointerLock();
    };

    const handleMouseUp = (e: MouseEvent) => {
        moveRef.current = e.buttons & 0b111;
        if (moveRef.current !== MoveState.none) return;
        isFocusedRef.current = false;
        document.exitPointerLock();
    };

    const unlock = () => {
        document.removeEventListener('mousemove', handleMouseMove, false);
        canvasRef.current?.blur();

        if (canvasRef.current) enableBodyScroll(canvasRef.current);
        if (isFocusedRef.current) {
            isFocusedRef.current = false;
            canFocus.current = false;
            setTimeout(() => { canFocus.current = true; }, 1500);
        }
    };

    const onWheel = (e: WheelEvent<HTMLCanvasElement>) => {
        if (!isFocusedRef.current) return;
        controllerRef.current?.zoom(e.deltaY);
    };

    const handleLockChange = () => {
        if (document.pointerLockElement !== canvasRef.current) {
            unlock();
            return;
        }

        isFocusedRef.current = true;
        if (canvasRef.current) disableBodyScroll(canvasRef.current, { reserveScrollBarGap: true });
        document.addEventListener('mousemove', handleMouseMove, false);
    };

    const cleanup = () => {
        document.removeEventListener('pointerlockchange', handleLockChange);
        if (isFocusedRef.current) unlock();
    };

    useEffect(() => {
        if (canvasRef.current == null) return () => {};
        document.addEventListener('pointerlockchange', handleLockChange, false);

        if (rendererRef.current == null) {
            // dynamically imported to avoid loading in on unsupported browsers
            void Promise.all([
                import('../../rendering/renderer'),
                getModelConstructor(),
            ]).then(async ([{ default: { CreateInitialized } }, modelCtor]) => {
                if (canvasRef.current == null) throw new Error('webgpu render -- canvas uninitialized');

                rendererRef.current = await CreateInitialized(canvasRef.current);
                controllerRef.current = new OrbitCameraController(rendererRef.current.camera);
                const model = new modelCtor(rendererRef.current);

                setSettings(model.settings);
                requestAnimationFrame(rendererRef.current.render);
            });
        }

        return cleanup;
    });

    const settingsWidget = settings != null
        ? (<ModelSettingsWidget settings={settings} />)
        : undefined;

    return (
        <ViewportStyle ref={mainRef}>
            <FullscreenButton element={mainRef} />
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onWheel={onWheel}
                tabIndex={0}
            />
            {settingsWidget}
        </ViewportStyle>
    );
}
