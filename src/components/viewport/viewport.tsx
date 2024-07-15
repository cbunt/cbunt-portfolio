import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import type Renderer from '../../rendering/renderer';
import type { FullRenderModel, LoadModelConstructor, ModelSetting } from '../../samples/sample-spec';

import { CameraController, Directions } from '../../rendering/camera-controller';
import ModelSettingsWidget from './model-settings-gui';
import FullscreenButton from './fullscreen-button';

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

const KeyCodesToDirection: Record<string, Directions | undefined> = {
    KeyW: Directions.forward,
    KeyA: Directions.left,
    KeyS: Directions.backward,
    KeyD: Directions.right,
    Space: Directions.up,
    ShiftLeft: Directions.down,
};

export type ViewportProps = {
    getModelConstructor: LoadModelConstructor,
};

export default function Viewport({ getModelConstructor }: ViewportProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rendererRef = useRef<Renderer | null>(null);
    const controllerRef = useRef<CameraController | null>(null);
    const isFocusedRef = useRef(false);
    const canFocus = useRef(true);
    const mainRef = useRef<HTMLDivElement | null>(null);
    const [settings, setSettings] = useState<Record<string, ModelSetting> | null>(null);

    const handleKeyChange = (e: React.KeyboardEvent) => {
        const dir = KeyCodesToDirection[e.code];
        if (e.repeat || dir == null) return;

        if (e.type === 'keydown') {
            controllerRef.current?.changeMovement(dir, 'add');
        } else if (e.type === 'keyup') {
            controllerRef.current?.changeMovement(dir, 'remove');
        }
    };
    const handleMouseMove = (e: MouseEvent) => {
        controllerRef.current?.rotate(e.movementX, e.movementY);
    };

    const handleMouseDown = () => {
        if (!canFocus.current) return;
        canvasRef.current?.requestPointerLock();
    };

    const handleMouseUp = () => {
        isFocusedRef.current = false;
        document.exitPointerLock();
    };

    const handleAnimation = (t: number) => {
        if (!isFocusedRef.current) return;
        controllerRef.current?.step(t);
        requestAnimationFrame(handleAnimation);
    };

    const unlock = () => {
        document.removeEventListener('mousemove', handleMouseMove, false);
        canvasRef.current?.blur();
        controllerRef.current?.freeze();
        if (isFocusedRef.current) {
            isFocusedRef.current = false;
            canFocus.current = false;
            setTimeout(() => { canFocus.current = true; }, 1500);
        }
    };

    const handleLockChange = () => {
        if (document.pointerLockElement !== canvasRef.current) {
            unlock();
            return;
        }

        isFocusedRef.current = true;
        document.addEventListener('mousemove', handleMouseMove, false);
        requestAnimationFrame(handleAnimation);
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
                controllerRef.current = new CameraController(rendererRef.current.camera);

                const model = rendererRef.current.setModel(modelCtor) as FullRenderModel;
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
                onKeyDown={handleKeyChange}
                onKeyUp={handleKeyChange}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                tabIndex={0}
            />
            {settingsWidget}
        </ViewportStyle>
    );
}
