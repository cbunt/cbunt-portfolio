import { useEffect, useState, RefObject } from 'react';
import Distortion from 'react-distortion';

import styles from './fullscreen-button.module.scss';
import { interactiveConditionalFilters } from '../../distortion-styles';

export type FullscreenButtonProps = { element?: RefObject<HTMLElement | null> };

const ARROW_ID = 'arrow';
const ARROW_HREF = `#${ARROW_ID}`;

const ARROW_PATH = `
    M 7.71 6.24 
    L 4.42 2.97 
    L 5.71 1.69 
    A 1 1 0 0 0 5 -0.01 
    H 1 
    A 1 1 0 0 0 0 0.98 
    V 4.95 
    A 1 1 0 0 0 1.71 5.66 
    L 3 4.38 
    L 6.29 7.64 
    A 1 1 0 0 0 7.71 6.23 
    Z
`.replaceAll(/\s*([A-Z])\s*/g, '$1');

const openArrows = (
    <>
        <use href={ARROW_HREF} transform="translate(10 10)" />
        <use href={ARROW_HREF} transform="rotate(90 -1 9)" />
        <use href={ARROW_HREF} transform="rotate(-90 9 -1)" />
        <use href={ARROW_HREF} transform="rotate(180 4 4)" />
    </>
);

const closedArrows = (
    <>
        <use href={ARROW_HREF} />
        <use href={ARROW_HREF} transform="rotate(90 9 9)" />
        <use href={ARROW_HREF} transform="rotate(180 9 9)" />
        <use href={ARROW_HREF} transform="rotate(-90 9 9)" />
    </>
);

const isFullscreen = (element?: HTMLElement | null) => element && document.fullscreenElement === element;

export default function FullscreenButton({
    element,
    ...rest
}: FullscreenButtonProps) {
    const [open, setOpen] = useState(isFullscreen(element?.current));

    useEffect(() => {
        const listener = () => { setOpen(isFullscreen(element?.current)); };
        document.addEventListener('fullscreenchange', listener, false);
        return () => {
            document.removeEventListener('fullscreenchange', listener);
        };
    }, []);

    return (
        <Distortion
            as="button"
            type="button"
            className={styles['fullscreen-button']}
            aria-label="fullscreen button"
            onClick={open
                ? () => { void document.exitFullscreen(); }
                : () => { void element?.current?.requestFullscreen(); }}
            {...interactiveConditionalFilters}
            {...rest}
        >
            <svg viewBox="0 0 19 19">
                <defs>
                    <path id={ARROW_ID} d={ARROW_PATH} />
                </defs>
                {open ? openArrows : closedArrows}
            </svg>
        </Distortion>
    );
}
