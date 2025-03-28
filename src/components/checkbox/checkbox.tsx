import { ChangeEvent, useState, useId, useEffect } from 'react';
import Distortion from 'react-distortion';

import type { ValueKeyCallback } from '../../rendering/samples/settings/property-listener';
import { useTooltip } from '../../utils/hooks';

import './checkbox.module.scss';
import { interactiveFilters } from '../distortion-styles';

export type CheckboxProps = {
    label: string,
    value?: boolean,
    disabled?: boolean,
    description?: string,
    onChange?: (val: boolean) => void,
    callbacks?: Pick<Set<ValueKeyCallback<CheckboxProps>>, 'add' | 'delete'>,
};

export default function Checkbox({
    label,
    onChange: callback = () => {},
    value: propVal,
    disabled,
    callbacks,
    description,
}: CheckboxProps) {
    const id = useId();
    const [value, setValue] = useState(propVal);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.checked);
        callback(e.target.checked);
    };

    const update = (val: unknown) => {
        if (typeof val === 'boolean' && val !== value) setValue(val);
    };

    useEffect(() => {
        callbacks?.add(update);
        return () => { callbacks?.delete(update); };
    });

    const [tooltip, show, hide] = useTooltip(description);

    return (
        <>
            <label
                style={{ position: 'relative' }}
                htmlFor={id}
                onMouseEnter={show}
                onMouseLeave={hide}
            >
                {label}
                {tooltip}
            </label>
            <Distortion
                as="input"
                disabled={disabled}
                type="checkbox"
                aria-label={label}
                checked={value}
                onChange={handleChange}
                id={id}
                {...(disabled ? {} : interactiveFilters)}
            />
        </>
    );
}
