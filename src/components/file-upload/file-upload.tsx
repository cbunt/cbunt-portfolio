import { useEffect, useRef, useState } from 'react';

import type { ValueKeyCallback } from '../../rendering/samples/settings/property-listener';

import Button from '../button/button';
import { Select } from '../select/select';

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

export default function FileUpload<T>({
    label,
    process,
    buttonText,
    accept,
    onChange,
    selection,
    callbacks,
}: FileUploadProps<T>) {
    const inputRef = useRef<null | HTMLInputElement>(null);
    const [files, setFiles] = useState(selection?.initialValues ?? {});

    function update<K extends keyof FileUploadProps<T>>(changed: FileUploadProps<T>[K], key: K) {
        if (key !== 'selection' || changed == null) return;
        const { value: newValue, initialValues: newValues } = changed as NonNullable<FileUploadProps<T>['selection']>;

        if (
            newValue == null
            || newValues?.[newValue] == null
            || newValues[newValue] === files[newValue]
        ) return;

        setFiles((files) => ({ ...files, [newValue]: newValues[newValue] }));
    };

    useEffect(() => {
        if (selection?.value != null) {
            onChange?.(files[selection.value], 'value');
        }
    }, []);

    useEffect(() => {
        callbacks?.add(update);
        return () => { callbacks?.delete(update); };
    });

    return (
        <>
            <label style={{ gridRow: 'span 2' }}>{label}</label>
            <Select
                label={`${label} select`}
                style={{ gridColumn: 'span 2' }}
                items={files}
                defaultSelected={selection?.value}
                onChange={(value) => { onChange?.(value, 'value'); }}
            />
            <Button
                onClick={() => { inputRef.current?.click(); }}
                style={{ fontStretch: '100%', gridColumn: 'span 2' }}
            >
                {buttonText ?? `Upload ${accept ?? 'file'}`}
                <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={inputRef}
                    accept={accept}
                    onInput={(e) => {
                        const file = e.currentTarget.files?.[0];
                        if (file == null) return;
                        setFiles((files) => ({ ...files, [file.name]: process(file) }));
                    }}
                />
            </Button>
        </>
    );
}
