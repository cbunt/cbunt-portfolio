import { ChangeEvent, useState, useId, useEffect } from 'react';
import Distortion from 'react-distortion';

import type { ValueKeyCallback } from '../../../samples/settings/property-listener';
import { useTooltip } from '../../../utils/hooks';

import styles from './checkbox.module.css';

export type CheckboxProps = {
    label: string,
    defaultChecked?: boolean,
    disabled?: boolean,
    description?: string,
    onChange?: (val: boolean) => void,
    callbacks?: Pick<Set<ValueKeyCallback<CheckboxProps>>, 'add' | 'delete'>,
};

export function Checkbox({
    label,
    onChange: callback = () => {},
    defaultChecked,
    disabled,
    callbacks,
    description,
}: CheckboxProps) {
    const id = useId();
    const [value, setValue] = useState(defaultChecked);
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
                className={styles['distortion-checkbox']}
                defaultFilter={{
                    scale: 6,
                }}
                hoverFilter={{
                    animation: 'alternating loop',
                    scale: 4,
                }}
                activeFilter={{
                    animation: 'static',
                    scale: 6,
                }}
            >
                <input
                    disabled={disabled}
                    defaultChecked={defaultChecked}
                    type="checkbox"
                    aria-label={label}
                    checked={value}
                    onChange={handleChange}
                    id={id}
                />
            </Distortion>
            <div />
        </>
    );
}
