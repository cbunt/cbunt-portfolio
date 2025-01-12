import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useRef, useEffect, useReducer } from 'react';

import type { WheelEvent, MouseEvent, RefObject, MouseEventHandler, JSX } from 'react';
import type { LoadModelConstructor } from '../../rendering/samples/settings/sample-spec';

import ModelSettingsWidget from './model-settings-gui';
import FullscreenButton from './fullscreen-button/fullscreen-button';
import { OrbitCameraController } from '../../rendering/core/camera/orbit-camera-controller';

const enum MoveState {
    none = 0,
    rotate = 1,
    zoom = 2,
    pan = 4,
}

type ViewportState = {
    controller?: OrbitCameraController,
    focused: boolean,
    canFocus: boolean,
    moveState: MoveState,
    settings?: JSX.Element,
    mouseHandler?: MouseEventHandler,
};

type ViewportAction =
    ({ type: 'update' } & Partial<ViewportState>)
    | { type: 'mouseMove', x: number, y: number };

export type ViewportProps = {
    getModelConstructor: LoadModelConstructor,
    viewportRef: RefObject<HTMLDivElement>,
};

function reducer(state: ViewportState, action: ViewportAction) {
    switch (action.type) {
        case 'update': {
            const { type, ...rest } = action;
            return { ...state, ...rest };
        };
        case 'mouseMove': {
            const { x, y } = action;
            if (state.moveState & MoveState.rotate) state.controller?.rotate(x, y);
            if (state.moveState & MoveState.zoom) state.controller?.zoom(10 * y);
            if (state.moveState & MoveState.pan) state.controller?.pan(-x, y);
            return state;
        }
        default: return state;
    }
}

export default function Viewport({ getModelConstructor, viewportRef }: ViewportProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [{ controller, focused, canFocus, settings }, dispatch] = useReducer(reducer, {
        controller: undefined,
        focused: false,
        canFocus: true,
        moveState: MoveState.none,
        mouseHandler: undefined,
    });

    const onMouseDown = (e: MouseEvent) => {
        if (!canFocus) return;

        void canvasRef.current?.requestPointerLock();

        dispatch({
            type: 'update',
            moveState: e.buttons & 0b111,
            focused: true,
        });
    };

    const onMouseUp = (e: MouseEvent) => {
        const moveState = (e.buttons & 0b111) as MoveState;
        const moving = moveState !== MoveState.none;

        dispatch({
            type: 'update',
            focused: moving,
            moveState,
        });

        if (!moving) {
            document.exitPointerLock();
        }
    };

    const onWheel = focused
        ? (e: WheelEvent<HTMLCanvasElement>) => { controller?.zoom(e.deltaY); }
        : undefined;

    const unlock = () => {
        if (canvasRef.current) {
            canvasRef.current.blur();
            enableBodyScroll(canvasRef.current);
        }

        if (focused) {
            dispatch({ type: 'update', focused: false, canFocus: false });
            setTimeout(() => { dispatch({ type: 'update', canFocus: true }); }, 1500);
        }
    };

    const handleLockChange = () => {
        if (document.pointerLockElement !== canvasRef.current) {
            unlock();
            return;
        }

        dispatch({ type: 'update', focused: true });

        if (canvasRef.current) disableBodyScroll(canvasRef.current, { reserveScrollBarGap: true });
    };

    useEffect(() => {
        // dynamically imported to avoid loading in on unsupported browsers
        Promise.all([
            import('../../rendering/core/renderer'),
            getModelConstructor(),
        ]).then(async ([rendererModule, ModelConstructor]) => {
            if (canvasRef.current == null) throw new Error('webgpu render -- canvas uninitialized');

            const renderer = await rendererModule.default.CreateInitialized(canvasRef.current);
            const model = new ModelConstructor(renderer);

            dispatch({
                type: 'update',
                controller: new OrbitCameraController(renderer.camera, [-0.5, 3.5, 0], 20),
                settings: <ModelSettingsWidget {...model.settings} />,
            });

            requestAnimationFrame(renderer.render);
        }).catch((e: unknown) => {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, no-console
            console.warn(`failed to initialize renderer:\n${e}`);
        });

        document.addEventListener('pointerlockchange', handleLockChange, false);

        return () => {
            document.removeEventListener('pointerlockchange', handleLockChange);
            unlock();
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={({ movementX: x, movementY: y }) => {
                    if (!focused) return;
                    dispatch({ type: 'mouseMove', x, y });
                }}
                onWheel={onWheel}
            />
            {settings}
            <FullscreenButton element={viewportRef} />
        </>
    );
}
