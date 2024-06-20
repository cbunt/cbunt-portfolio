import { ElementType, ReactNode, useId, useState, useEffect, EventHandler, useCallback, useRef, SyntheticEvent } from 'react';
import styled from 'styled-components';
import { PolymorphicProps } from '../../utils/frontend';

export type DistortionFilterProps = {
    baseFrequency?: number,
    numOctaves?: number,
    scale?: number,
    border?: boolean,
};

export type DistrotionMode = 'none' | 'static' | 'animated' | 'loop';

export type DistortionModeProps =
    DistrotionMode
    | (DistortionFilterProps & { mode: 'loop' })
    | (DistortionFilterProps & { mode: DistrotionMode });

export const DistortedBorder = styled.div<{ $filterid: string }>`
    filter: url(#${({ $filterid }) => $filterid});

    box-sizing: border-box;
    pointer-events: none;
    position: absolute;
    z-index: 1;
    background-color: #0000;

    width: calc(100% + var(--border-width, 0px));
    height: calc(100% + var(--border-width, 0px));
    top: calc(-0.5 * var(--border-width, 0px));
    left: calc(-0.5 * var(--border-width, 0px));
    
    border: inherit;
    border-width: var(--border-width, inherit);
    border-radius: inherit;
    color: inherit;
    border-color: var(--border-color, currentcolor);
`;

export type DistortionElementProps<E extends ElementType> = PolymorphicProps<E, 'div', {
    steps?: number,
    baseSeed?: number,
    minRefresh?: number,
    animationInterval?: number,
    overrideMode?: DistrotionMode,
    baseMode?: DistrotionMode,
    whileHover?: DistortionModeProps,
    whileActive?: DistortionModeProps,
    whileFocus?: DistortionModeProps,
    children?: ReactNode,
    refreshSeedCallback?: (fn: (increment?: boolean) => void) => void,
} & DistortionFilterProps>;

export function getDistortionSeed() { return Math.random() * (2 ** 16 - 1) | 0; }

const DistortionWrapper = styled.div<{ $showfilter: boolean, $svgid: string }>`
    ${({ $showfilter: showfilter, $svgid: svgid }) => (showfilter ? `filter: url(#${svgid});` : '')}
`;

export default function DistortionElement<E extends ElementType>({
    baseMode = 'static',
    baseFrequency = 0.015,
    border = false,
    numOctaves = 3,
    scale = 5,
    steps = 5,
    baseSeed,
    minRefresh = 100,
    animationInterval = 400,
    overrideMode,
    whileHover,
    whileActive,
    whileFocus,
    refreshSeedCallback,
    children,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    ...rest
}: DistortionElementProps<E>) {
    const filterId = useId();
    const seedTime = useRef(Date.now());
    const defaultFilter = { scale, numOctaves, baseFrequency, border };
    const [filterProps, setFilterProps] = useState(defaultFilter);
    const [filter, setFilter] = useState(baseMode !== 'none');
    const [seed, setSeed] = useState(baseSeed ?? getDistortionSeed());
    const [seedOffset, setSeedOffset] = useState(0);

    const [state, setState] = useState({
        hover: whileHover != null ? false : undefined,
        focus: whileFocus != null ? false : undefined,
        active: whileActive != null ? false : undefined,
    });

    const refreshSeed = () => {
        if (Date.now() - seedTime.current < minRefresh) return;
        seedTime.current = (Date.now());
        setSeed(getDistortionSeed());
    };

    useEffect(() => refreshSeedCallback?.(refreshSeed), [refreshSeedCallback]);

    const setMode = (value?: DistortionModeProps) => {
        if (value == null) return;

        let newMode;
        let newFilter;
        if (typeof value === 'string') {
            newMode = value;
            newFilter = defaultFilter;
        } else {
            const { mode, ...restFilter } = value;
            newMode = mode;
            newFilter = { ...defaultFilter, ...restFilter };
        }
        switch (newMode) {
            case 'none': {
                if (filter) setFilter(false);
                setFilterProps(defaultFilter);
                return undefined;
            }
            case 'static': {
                if (!filter) setFilter(true);
                if (seedOffset !== 0) setSeedOffset(0);
                setFilterProps(newFilter);
                return undefined;
            }
            case 'animated': {
                if (!filter) setFilter(true);
                if (seedOffset !== 0) setSeedOffset(0);
                setFilterProps(newFilter);
                const interval = setInterval(refreshSeed, animationInterval);
                return () => { clearInterval(interval); };
            }
            case 'loop': {
                if (!filter) setFilter(true);
                setFilterProps(seedOffset % 2 === 1 ? defaultFilter : newFilter);
                const interval = setInterval(() => {
                    setFilterProps((curr) => (curr === defaultFilter ? newFilter : defaultFilter));
                    setSeedOffset((curr) => (curr + 1) % steps);
                }, animationInterval);
                return () => { clearInterval(interval); };
            }
            default: return undefined;
        }
    };

    useEffect(() => {
        if (overrideMode != null) return setMode(overrideMode);
        if (state.active) return setMode(whileActive);
        if (state.focus) return setMode(whileFocus);
        if (state.hover) return setMode(whileHover);
        return setMode(baseMode);
    }, [state, whileActive, whileFocus, whileHover, baseMode, overrideMode]);

    const stateCallback = useCallback(function<E extends SyntheticEvent, T>(
        value: boolean,
        name: string,
        prop?: T,
        fn?: EventHandler<E>,
    ) {
        if (prop != null) {
            return useCallback((e: E) => {
                setState((curr) => ({ ...curr, [name]: value }));
                fn?.(e);
            }, [fn]);
        }
        return fn;
    }, []);

    return (
        <DistortionWrapper
            onFocus={stateCallback(true, 'focus', whileFocus, onFocus)}
            onBlur={stateCallback(false, 'focus', whileFocus, onBlur)}
            onMouseEnter={stateCallback(true, 'hover', whileHover, onMouseEnter)}
            onMouseLeave={stateCallback(false, 'hover', whileHover, onMouseLeave)}
            onMouseDown={stateCallback(true, 'active', whileActive, onMouseDown)}
            onMouseUp={stateCallback(false, 'active', whileActive, onMouseUp)}
            $showfilter={filter}
            $svgid={filterId}
            {...rest}
        >
            {children}
            {filterProps.border ? <DistortedBorder $filterid={filterId} /> : undefined}
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    <filter id={filterId}>
                        <feTurbulence
                            id="turbulence"
                            type="fractalNoise"
                            result="noise"
                            baseFrequency={filterProps.baseFrequency}
                            numOctaves={filterProps.numOctaves}
                            seed={seed + seedOffset}
                        />
                        <feDisplacementMap
                            id="displacement"
                            in="SourceGraphic"
                            in2="noise"
                            xChannelSelector="R"
                            yChannelSelector="G"
                            scale={filterProps.scale}
                        />
                    </filter>
                </defs>
            </svg>
        </DistortionWrapper>
    );
}
