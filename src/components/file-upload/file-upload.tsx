import { useEffect, useRef, useState } from 'react';

import type { ValueKeyCallback } from '../../rendering/samples/settings/property-listener';

import Button from '../button/button';
import { Select } from '../select/select';

export type FileUploadProps<T> = {
    label: string,
    accept?: string,
    buttonText?: string,
    process: (file: File) => T,
    onChange?: ((value: T) => void),
    value?: string,
    initialValues?: Record<string, T>,
    callbacks?: Set<ValueKeyCallback<FileUploadProps<T>>>,
};

export default function FileUpload<T>({
    label,
    process,
    buttonText,
    accept,
    onChange,
    value,
    initialValues,
    callbacks,
}: FileUploadProps<T>) {
    const inputRef = useRef<null | HTMLInputElement>(null);
    const [files, setFiles] = useState(initialValues ?? {});

    useEffect(() => {
        if (value == null) return;
        onChange?.(files[value]);
    }, []);

    useEffect(() => {
        function update<K extends keyof FileUploadProps<T>>(changed: FileUploadProps<T>[K], key: K) {
            if (changed == null) return;
            if (key === 'initialValues') {
                const newValues = changed as NonNullable<FileUploadProps<T>['initialValues']>;
                setFiles((files) => ({ ...files, ...newValues }));
            }
        };

        callbacks?.add(update);
        return () => { callbacks?.delete(update); };
    }, [callbacks]);

    return (
        <>
            <label style={{ gridRow: 'span 2' }}>{label}</label>
            <Select
                label={`${label} select`}
                style={{ gridColumn: 'span 2' }}
                items={files}
                defaultSelected={value}
                onChange={(value) => { onChange?.(value); }}
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
