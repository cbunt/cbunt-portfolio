import { CSSProperties } from 'react';

import './select.module.scss';

export type SelectProps<T extends object> = {
    label: string,
    items: T,
    defaultSelected?: string,
    style?: CSSProperties,
    onChange?: (value: T[keyof T]) => void,
};

export function Select<T extends Record<string, unknown>>({
    label,
    items,
    onChange,
    defaultSelected,
    style,
}: SelectProps<T>) {
    return (
        <select
            style={style}
            aria-label={label}
            disabled={Object.keys(items).length <= 1}
            onChange={(e) => { onChange?.(items[e.target.value] as T[keyof T]); }}
        >
            {Object.keys(items).map((key) => (
                <option
                    defaultChecked={key === defaultSelected}
                    value={key}
                    key={key}
                >
                    {key}
                </option>
            ))}
        </select>
    );
}
