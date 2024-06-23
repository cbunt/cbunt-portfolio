import { ChangeEvent, useState, useId, useEffect } from 'react';
import styled from 'styled-components';

import type { ValueKeyCallback } from '../../samples/property-listener';
import DistortionElement from './distortion-element';
import CustomTooltip from './tooltip';

const DistortionWrapper = styled(DistortionElement).attrs({
    scale: 6,
    whileHover: {
        mode: 'loop',
        scale: 4,
    },
    whileActive: {
        mode: 'static',
        scale: 6,
    },
})`
    --height: 1rem;

    width: fit-content;
    justify-self: center;
    height: var(--height);
    display: flex;
    border-radius: 10px;
`;

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
    appearance: none;
    border-radius: 5px;
    border: max(3.5px, 0.15rem) solid oklch(from var(--accent-2) calc(l * var(--ok-l2)) c h);
    height: 100%;
    aspect-ratio: 1;
    position: relative;
    margin: 0;
    cursor: pointer;
    background-color: var(--background-color);
    transition: 
        var(--scale-transition),
        background-color 0.2s ease-out,
        border-color 0.2s ease-out;

    label:not(:hover) + ${DistortionWrapper}:has(&) {
        input:hover {
            transform: scale(1.05);
        }
        input:active {
            transform: scale(0.95);
        }
    }

    &:checked {
        background-color: var(--accent-2);
        border-color: var(--accent-2);
    }

    &:before,
    &:after {
        content: "";
        position: absolute;
        background: oklch(from var(--accent-2) calc(l * var(--ok-l2)) c h);
        width: calc(var(--height) * sqrt(2));
        height: max(4px, 0.2rem);
        border-radius: 6px;
        top: -4px;
    }

    &:before {
        transform: rotate(45deg) scaleX(0);
        transform-origin: left top;
        transition: transform 75ms ease-in 100ms;
        left: 0;
    }

    &:after {
        transform: rotate(-45deg) scaleX(0);
        transform-origin: right top;
        transition: transform 75ms ease-in;
        right: 0;
    }

    &:checked:before {
        transform: rotate(45deg) scaleX(1);
        transition: transform 100ms ease-in;
    }

    &:checked:after {  
        transform: rotate(-45deg) scaleX(1);
        transition: transform 100ms ease-out 150ms;
    }
`;

export type CheckboxProps = {
    label: string,
    value: boolean,
    description?: string,
    onChange?: (val: boolean) => void,
    callbacks?: Pick<Set<ValueKeyCallback<CheckboxProps>>, 'add' | 'delete'>,
};

export function Checkbox({
    label,
    value: startValue,
    onChange: callback = () => {},
    callbacks,
    description,
}: CheckboxProps) {
    const id = useId();
    const [value, setValue] = useState(startValue);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.checked);
        callback(e.target.checked);
    };

    const update = (val: unknown) => {
        if (typeof val === 'boolean' && val !== value) setValue(val);
    };

    if (callbacks != null) {
        useEffect(() => {
            callbacks.add(update);
            return () => { callbacks.delete(update); };
        });
    }

    return (
        <>
            <CustomTooltip forwardedAs="label" htmlFor={id} tooltipContent={description}>
                {label}
            </CustomTooltip>
            <DistortionWrapper>
                <StyledCheckbox
                    aria-label={label}
                    checked={value}
                    onChange={handleChange}
                    id={id}
                />
            </DistortionWrapper>
            <div />
        </>
    );
}
