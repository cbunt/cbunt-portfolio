import { MutableRefObject, useCallback, useEffect, useState, MouseEvent } from 'react';
import styled from 'styled-components';
import { PolymorphicProps, svgToDataURL } from '../../utils/frontend';
import Distortion from 'react-distortion';

const FullscreenStyle = styled(Distortion as typeof Distortion<'button'>).attrs<{ open?: boolean }>({
    forwardedAs: 'button',
    defaultFilter: {
        scale: 3,
    },
    hoverFilter: {
        animation: 'alternating loop',
        scale: 7,
    },
})`
    --open-svg: ${({ open }) => svgToDataURL(`
        <svg width="199" height="199" viewBox="-1.62 -1.62 21.24 21.24" xmlns="http://www.w3.org/2000/svg" fill="currentcolor" stroke="currentcolor" stroke-width=".738">
            <defs>
                <path 
                    id="arrow"
                    d="M7.707 6.242 4.42 2.977 5.71 1.7A1 1 0 0 0 5 0H1a1 1 0 0 0-1 .993v3.97a.98.98 0 0 0 .62.913 1.01 1.01 0 0 0 1.09-.208L3 4.388 6.288 7.65a1.01 1.01 0 0 0 1.42 0 .994.994 0 0 0 0-1.41z" 
                />
            </defs>
        ${open
                ? `
                <use href="#arrow" transform="translate(10 10)"/>
                <use href="#arrow" transform="rotate(90 -1 9)"/>
                <use href="#arrow" transform="rotate(-90 9 -1)"/>
                <use href="#arrow" transform="rotate(180 4 4)"/>`
                : `
                <use href="#arrow"/>
                <use href="#arrow" transform="rotate(90 9 9)"/>
                <use href="#arrow" transform="rotate(180 9 9)"/>
                <use href="#arrow" transform="rotate(-90 9 9)"/>`
        }
        </svg>
    `)};

    padding: 0;
    appearance: none;
    border: none;
    background: none;

    display: flex;
    position: absolute;
    right: 20px;
    top: 20px;

    width: 5%;
    min-width: 30px;
    max-width: 65px;
    aspect-ratio: 1;

    cursor: pointer;
    transform-origin: center;
    transition: var(--scale-transition);
    color: color-mix(in oklab, var(--background-color) 85%, var(--hi-vis-gray));

    &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #0000;
        background-image: var(--open-svg);
        background-size: cover;
        filter: 
            drop-shadow(2px 2px 0px color-mix(in oklab, currentcolor 65%, var(--hi-vis-gray))) 
            drop-shadow(-1px -1px 0px color-mix(in oklab, currentcolor 75%, var(--hi-vis-gray)));
    }

    &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: currentColor;
        mask-image: var(--open-svg);
        mask-size: cover;
    }

    &:hover {
        transform: scale(1.08);

        &:before { 
            filter: 
                drop-shadow(2px 2px 0px var(--accent-3))
                drop-shadow(-1px -1px 0px var(--accent-2));
        }
    }

    &:active {
        transform: scale(0.98);
    }
`;

export type FullscreenButttonProps = PolymorphicProps<undefined, 'button', { element?: MutableRefObject<HTMLElement | null> }>;

export default function FullscreenButton({
    element,
    onClick,
    ...rest
}: Omit<FullscreenButttonProps, 'children'>) {
    const checkOpen = useCallback(() => element?.current != null
        && document.fullscreenElement === element.current, [element]);

    const [open, setOpen] = useState(checkOpen());

    const listenerHandler = () => { setOpen(checkOpen()); };

    const handleChange = useCallback((ev: MouseEvent<HTMLButtonElement>) => {
        const check = checkOpen();
        onClick?.(ev);

        if (element == null || element.current == null) return;
        if (check) void document.exitFullscreen();
        else void element.current.requestFullscreen();

        setOpen(check);
    }, [checkOpen]);

    useEffect(() => {
        document.addEventListener('fullscreenchange', listenerHandler, false);
        return () => { document.removeEventListener('fullscreenchange', listenerHandler); };
    }, [handleChange]);

    return <FullscreenStyle type="button" aria-label="fullscreen" onClick={handleChange} {...rest} open={open} />;
}
