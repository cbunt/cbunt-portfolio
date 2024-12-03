import { ChangeEvent, useState, useId, useEffect, useRef, useCallback } from 'react';

import Distortion, { DistortHandle } from 'react-distortion';
import { DistortBackground } from 'react-distortion/child-elements';
import { useRerenderEffect, useTooltip } from '../../../utils/hooks';

import { clamp } from '../../../utils/general';
import { ValueKeyCallback } from '../../../samples/settings/property-listener';

import styles from './slider.module.css';

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
    disabled?: boolean,
} & Partial<SliderState>;

export function Slider({
    label,
    onChange: callback,
    min = 0,
    max = 10,
    step = 1,
    value = 5,
    disabled,
    description,
    callbacks,
}: SliderProps) {
    const id = useId();
    const [sliderState, setSliderState] = useState({ min, max, step, value });
    const [tooltip, showTooltip, hideTooltip] = useTooltip(description);
    const distortionRef = useRef<DistortHandle>(null);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newVal = e.target.value !== '' ? parseFloat(e.target.value) : sliderState.min;
        newVal = clamp(newVal, sliderState.min, sliderState.max);

        setSliderState((current) => newVal === current.value
            ? current
            : { ...current, value: newVal });
    }, []);

    useEffect(() => {
        if (callbacks == null) return undefined;

        function update<K extends keyof SliderProps>(val: SliderProps[K], key: K) {
            if (key !== 'max' && key !== 'min' && key !== 'value' && key !== 'step') return;

            setSliderState(
                (current) => current[key as keyof SliderState] === val
                    ? { ...current, [key]: val }
                    : current,
            );
        };

        callbacks.add(update);
        return () => { callbacks.delete(update); };
    });

    useRerenderEffect(() => {
        callback?.(sliderState.value);
        distortionRef.current?.refreshSeed();
    }, [sliderState.value]);

    return (
        <>
            <label
                style={{ position: 'relative' }}
                htmlFor={id}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
            >
                {label}
                {tooltip}
            </label>
            <Distortion
                className={styles['distortion-slider']}
                ref={distortionRef}
                hoverFilter={
                    disabled
                        ? undefined
                        : {
                                animation: 'alternating loop',
                                baseFrequency: 0.02,
                                scale: 6,
                            }
                }
                activeFilter={
                    disabled
                        ? undefined
                        : {
                                animation: 'static',
                                baseFrequency: 0.02,
                                scale: 6,
                            }
                }
                minRefresh={200}
            >
                <input
                    type="range"
                    aria-label={`${label}-slider`}
                    aria-description={description}
                    disabled={disabled}
                    onChange={onChange}
                    {...sliderState}
                />
            </Distortion>
            <Distortion
                className={styles['distortion-slider-value']}
                defaultFilter={{
                    scale: 7,
                    disable: true,
                }}
                distortChildren={DistortBackground}
            >
                <input
                    type="number"
                    id={id}
                    aria-label={`${label}-text-input`}
                    aria-description={description}
                    disabled={disabled}
                    onChange={onChange}
                    {...sliderState}
                />
            </Distortion>
        </>
    );
}
