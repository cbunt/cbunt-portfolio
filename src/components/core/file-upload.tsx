import { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useId, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import type { ValueKeyCallback } from '../../samples/settings/property-listener';

import StyledButton from './button';
import DistortionElement from './distortion-element';

const SelectBackground = styled(DistortionElement)`
    border-radius: 5px;
    background-color: color-mix(in oklab, var(--secondary-color) 85%, var(--hi-vis-gray));
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
`;

const ScrollableDropdown = styled.div`
    min-height: var(--label-total-height);
    max-height: calc(10 * var(--label-total-height));
    display: flex;
    overflow: hidden;
    position: absolute;
    width: 100%;
`;

const LabelContainer = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;

    width: 100%;
    display: flex;
    flex-direction: column;
    color: inherit;

    &::-webkit-scrollbar-thumb {
        background-color:rgb(from var(--accent-3) r g b / 0.75);
    }
`;

const SelectContainer = styled.div<{ $disabled?: boolean }>`
    --label-padding-top: 6px;
    --label-padding-bottom: 4px;
    --label-padding: calc(var(--label-padding-bottom) + var(--label-padding-top));
    --label-total-height: calc(1rem + var(--label-padding));

    position: relative;
    width: 100%;

    min-height: var(--label-total-height);
    max-height: calc(10 * var(--label-total-height));

    display: flex;
    width: 100%;
    flex-direction: column;
    color: var(--hi-vis-color);

    grid-column: span 2;
    position: relative;

    input[type="radio"] {
        display: none;
    }

    label {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        transform-origin: center left;
        flex-shrink: 0;
        
        padding: var(--label-padding-top) 10px var(--label-padding-bottom);
        display: none;
        transition: 
            transform 0.1s var(--scale-bezier),
            color 0.1s ease-in;

        &:hover {
            transform: scale(1.05);
        }

        &:not(:first-of-type) {
            padding-top: 8px;
            padding-bottom: 8px;
        }

        &:first-of-type {
            display: block;
        }
    }

    ${({ $disabled }) => ($disabled
            ? css`
            filter: brightness(80%);
        `
            : css`
            cursor: pointer;

            label {
                cursor: pointer;
            }

            &::after {
                content: "\\25BC";
                position: absolute;
                top: 6px;
                right: 8px;
                transition: 0.25s transform ease-in-out;
                pointer-events: none;
            }

            &:hover:not(:focus) {
                label,
                &::after {
                    color: var(--accent-3);
                }
            }

            &:focus {
                z-index: 2;

                label {
                    display: inline-block;
                
                    &:hover {
                        color: var(--accent-3);
                    }
                }

                &::after {
                    visibility: hidden;
                    transform: rotate(180deg);
                }

                &:has(label:first-of-type:hover)::after {
                    color: var(--accent-3);
                }
            }`
        )}
`;

function fileToOption(onChange: ChangeEventHandler<HTMLInputElement>) {
    const name = useId();

    return (keys: string[], selected?: string) => {
        const arr = Array<JSX.Element>(keys.length);
        let idx = 0;

        for (const key of keys) {
            const checked = key === selected;

            arr[checked ? 0 : (idx += 1)] = (
                <label style={{ userSelect: 'none' }}>
                    {key.replace(/\.[^/.]+$/, '')}
                    <input
                        type="radio"
                        name={name}
                        value={key}
                        checked={checked}
                        onChange={onChange}
                    />
                </label>
            );
        }

        return arr;
    };
}

export type FileSelection<T> = {
    value?: string,
    initialValues?: Record<string, T>,
};

export type FileUploadProps<T> = {
    label: string,
    accept?: string,
    buttonText?: string,
    value?: T,
    process: (file: File) => T,
    onChange?: ValueKeyCallback<FileUploadProps<T>>,
    selection?: FileSelection<T>,
    callbacks?: Set<ValueKeyCallback<FileUploadProps<T>>>,
};

export function FileUpload<T>({
    label,
    process,
    buttonText,
    accept,
    onChange,
    selection,
    callbacks,
}: FileUploadProps<T>) {
    const [selected, setSelected] = useState(selection?.value);
    const inputRef = useRef<null | HTMLInputElement>(null);
    const selectionRef = useRef<null | HTMLDivElement>(null);
    const files = useRef(selection?.initialValues ?? {});

    useEffect(() => {
        if (!selected) return;
        onChange?.(files.current[selected], 'value');
    }, []);

    const handleSelection = (e: ChangeEvent<HTMLInputElement> | string) => {
        const name = typeof e === 'string' ? e : e.currentTarget.value;
        if (name === selected) {
            if (document.activeElement === selectionRef.current) selectionRef.current?.blur();
            return;
        }

        selectionRef.current?.blur();
        setSelected(name);
        onChange?.(files.current[name], 'value');
    };

    const createLabels = fileToOption(handleSelection);
    const fullButtonText = buttonText ?? `Upload ${accept ?? 'file'}`;
    const selectEnabled = Object.keys(files.current).length > 1;

    const update = useCallback(function<K extends keyof FileUploadProps<T>>(changed: FileUploadProps<T>[K], key: K) {
        if (key !== 'selection' || changed == null) return;
        const { value: newValue, initialValues: newValues } = changed as NonNullable<FileUploadProps<T>['selection']>;

        if (
            newValue == null
            || newValues?.[newValue] == null
            || newValue === selected
            || newValues[newValue] === files.current[newValue]
        ) return;

        files.current[newValue] = newValues[newValue];
        setSelected(newValue);
    }, []);

    if (callbacks != null) {
        useEffect(() => {
            callbacks.add(update);
            return () => { callbacks.delete(update); };
        });
    }

    return (
        <>
            <label style={{ gridRow: 'span 2' }}>{label}</label>
            <StyledButton onClick={() => { inputRef.current?.click(); }}>
                {fullButtonText}
                <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={inputRef}
                    accept={accept}
                    onInput={(e) => {
                        const file = e.currentTarget.files?.[0];
                        if (file == null) return;
                        files.current[file.name] = process(file);
                        handleSelection(file.name);
                    }}
                />
            </StyledButton>
            <SelectContainer
                ref={selectionRef}
                tabIndex={selectEnabled ? 0 : undefined}
                $disabled={!selectEnabled}
            >
                <ScrollableDropdown>
                    <SelectBackground tabIndex="0" />
                    <LabelContainer>
                        {...createLabels(Object.keys(files.current), selected)}
                    </LabelContainer>
                </ScrollableDropdown>
            </SelectContainer>
        </>
    );
}
