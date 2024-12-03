import { useCallback, useEffect, useState, MouseEvent, RefObject } from 'react';
import { PolymorphicProps } from '../../../utils/frontend';
import Distortion from 'react-distortion';

import styles from './fullscreen-button.module.css';

export type FullscreenButtonProps = PolymorphicProps<
    undefined,
    'button',
    { element?: RefObject<HTMLElement | null> }
>;

const openTransforms = [
    'translate(10 10)',
    'rotate(90 -1 9)',
    'rotate(-90 9 -1)',
    'rotate(180 4 4)',
];

const closedTransforms = [
    '', 'rotate(90 9 9)', 'rotate(180 9 9)', 'rotate(-90 9 9)',
];

export default function FullscreenButton({
    element,
    onClick,
    ...rest
}: Omit<FullscreenButtonProps, 'children'>) {
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
        return () => {
            document.removeEventListener('fullscreenchange', listenerHandler);
        };
    }, [handleChange]);

    const transforms = open ? openTransforms : closedTransforms;
    const keyPrefix = open ? 'open' : 'closed';

    const arrows = transforms.map((val, i) => (
        <use href="#arrow" key={`${keyPrefix}-${i}`} transform={val} />
    ));

    return (
        <Distortion
            tabIndex={0}
            as="button"
            type="button"
            className={styles['fullscreen-button']}
            aria-label="fullscreen"
            onClick={handleChange}
            defaultFilter={{
                scale: 3,
            }}
            hoverFilter={{
                animation: 'alternating loop',
                scale: 7,
            }}
            {...rest}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="-1.62 -1.62 21.24 21.24"
                fill="currentcolor"
                stroke="currentcolor"
                strokeWidth=".738"
            >
                <defs>
                    <path
                        id="arrow"
                        d={`
                            M7.707 6.242 4.42 2.977 5.71 1.7A1 1 0 0 0 5 0H1a1
                            1 0 0 0-1 .993v3.97a.98.98 0 0 0 .62.913 1.01 1.01
                            0 0 0 1.09-.208L3 4.388 6.288 7.65a1.01 1.01 0 0 0
                            1.42 0 .994.994 0 0 0 0-1.41z
                        `}
                    />
                </defs>
                {arrows}
            </svg>
        </Distortion>
    );
}
