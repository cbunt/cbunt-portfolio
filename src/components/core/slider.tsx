import { ChangeEvent, useState, useId, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

import DistortionElement from './distortion-element';
import CustomTooltip from './tooltip';
import { clamp } from '../../utils/general';
import { ValueKeyCallback } from '../../samples/property-listener';

const StyledSlider = styled.input.attrs({ type: 'range' })`
    --brightness-hover: 70%;
    --track-color: var(--accent-2);
    --slider-color: oklch(from var(--track-color) calc(l * var(--ok-l2)) calc(c * 0.6) h);

    border-radius: 4px;
    border: solid max(2.5px, 0.1rem) var(--track-color);

    background: #0000;
    transition: 
        background-color 0.3s,
        var(--scale-transition);

    color: var(--slider-color);
    appearance: none;
    overflow: hidden;
    height: max(12px, 0.7rem);
    width: 100%;
    cursor: ew-resize;

    label:not(:hover) + div:has(&) {
        input:hover {
            transform: scale(1.02);

            &::-webkit-slider-thumb {
                color: color-mix(in oklch, var(--slider-color) 50%, var(--track-color));
            }

            &::-moz-range-progress {
                color: color-mix(in oklch, var(--slider-color) 50%, var(--track-color));
            }
        }

        input:active {
            transform: scale(0.98);
        }
    }

    /* === WebKit specific styles === */
    &::-webkit-slider-thumb {
        transition: all 0.3s;
        width: 0;
        appearance: inherit;
        box-shadow: calc(-100vmax + 2px) 0 0
        100vmax currentcolor;
        filter: inherit;
    }

    /* === Firefox specific styles === */
    &::-moz-range-track,
    &::-moz-range-thumb {
        visibility: hidden;
    }

    &::-moz-range-progress {
        background: currentcolor;
        transition: all 0.3s;
        height: 100%;
    }
`;

const ValueTextBackground = styled(DistortionElement).attrs({
    scale: 7,
    minRefresh: 200,
})`
    border-radius: 5px;
    background-color: var(--background-color);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
`;

const ValueTextContainer = styled.div`
    width: 100%;
    position: relative;
    border-radius: 3px;
    background-color: #0000;

    &:has(*:focus-visible) ${ValueTextBackground} {
        outline: 2px solid var(--hi-vis-gray);
    }
`;

const ValueTextInput = styled.input.attrs({ type: 'number' })`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    font: inherit;
    color: inherit;
    appearance: none;
    border: none;
    border-radius: 3px;
    padding-left: 6px;
    background-color: inherit;
    caret-color: var(--hi-vis-gray);

    &::-webkit-inner-spin-button {
        appearance: none;
    }

    &:focus-visible {
        outline: none;
    }
`;

const DistortionWrapper = styled(DistortionElement).attrs({
    whileHover: {
        mode: 'loop',
        baseFrequency: 0.02,
        scale: 6,
    },
    whileActive: {
        mode: 'static',
        baseFrequency: 0.02,
        scale: 6,
    },
})`
    display: flex;
`;

export type SliderState = {
    min: number,
    max: number,
    step: number,
    value: number,
};

export type SliderProps = {
    label: string,
    onChange?: (val: number) => void,
    callbacks?: Set<ValueKeyCallback<SliderProps>>,
    description?: string,
} & Partial<SliderState>;

export function Slider({
    label,
    onChange: callback,
    min = 0,
    max = 10,
    step = 1,
    value = 5,
    description,
    callbacks,
}: SliderProps) {
    const id = useId();
    const [sliderState, setSliderState] = useState({ min, max, step, value });
    const seedCallback = useRef<(() => void) | null>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newVal = e.target.value !== '' ? parseFloat(e.target.value) : sliderState.min;
        newVal = clamp(newVal, sliderState.min, sliderState.max);
        if (newVal === sliderState.value) return;
        setSliderState({ ...sliderState, value: newVal });
        callback?.(newVal);
        seedCallback.current?.();
    };

    function update<K extends keyof SliderProps>(val: SliderProps[K], key: K) {
        if (key !== 'max' && key !== 'min' && key !== 'value' && key !== 'step') return;
        if (sliderState[key as keyof SliderState] === val) return;
        setSliderState((current) => ({ ...current, [key]: val }));
    }

    if (callbacks != null) {
        useEffect(() => {
            callbacks.add(update);
            return () => { callbacks.delete(update); };
        });
    }

    const setSeedCallback = useCallback((fn: () => void) => {
        seedCallback.current = fn;
    }, []);

    return (
        <>
            <CustomTooltip forwardedAs="label" htmlFor={id} tooltipContent={description}>
                {label}
            </CustomTooltip>
            <DistortionWrapper refreshSeedCallback={setSeedCallback}>
                <StyledSlider
                    aria-label={`${label}-slider`}
                    onChange={onChange}
                    {...sliderState}
                />
            </DistortionWrapper>
            <ValueTextContainer>
                <ValueTextInput {...sliderState} id={id} aria-label={`${label}-text-input`} onChange={onChange} />
                <ValueTextBackground />
            </ValueTextContainer>
        </>
    );
}
