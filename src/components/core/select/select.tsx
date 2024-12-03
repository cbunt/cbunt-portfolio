import DistortComponent from 'react-distortion';
import { DistortBackground } from 'react-distortion/child-elements';
import { CSSProperties } from 'react';

import styles from './select.module.css';

export type SelectProps<T> = {
    items: Partial<Record<string, T>>,
    defaultSelected?: string,
    style?: CSSProperties,
    onChange?: (value: T) => void,
};

export function Select<T>({
    items,
    onChange,
    defaultSelected,
    style,
}: SelectProps<T>) {
    return (
        <DistortComponent
            style={style}
            className={styles.container}
            defaultFilter={{ disable: true }}
            distortChildren={DistortBackground}
        >
            <select
                disabled={Object.keys(items).length <= 1}
                onChange={(e) => {
                    e.target.blur();
                    onChange?.(items[e.target.value] as T);
                }}
                onFocus={(e) => {
                    e.target.size = Math.min(6, Object.keys(items).length);
                }}
                onBlur={(e) => { e.target.size = 0; }}
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
        </DistortComponent>
    );
}
