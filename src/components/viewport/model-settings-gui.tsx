import { ComponentProps, CSSProperties } from 'react';

import FileUpload, { FileUploadProps } from '../file-upload/file-upload';
import Checkbox, { CheckboxProps } from '../checkbox/checkbox';
import Slider, { SliderProps } from '../slider/slider';
import StyledButton from '../button/button';

import { ModelSetting } from '../../rendering/samples/settings/sample-spec';
import { ListenerSyms } from '../../rendering/samples/settings/property-listener';
import SettingsPanel from './settings-panel/settings-panel';

export default function ModelSettingsWidget(settings: Record<string, ModelSetting>) {
    return (
        <SettingsPanel>
            {Object.entries(settings).map(([label, info]) => {
                const {
                    [ListenerSyms.$type]: type,
                    [ListenerSyms.$callback]: _privateCallback,
                    [ListenerSyms.$listeners]: callbacks,
                    ...rest
                } = info;

                const props = {
                    ...rest,
                    callbacks,
                    label,
                    onChange: (val: unknown) => { info.value = val; },
                };

                switch (type) {
                    case 'button': return (
                        <StyledButton
                            key={label}
                            style={{
                                gridColumn: 'span 3',
                                color: 'var(--accent-2)',
                                '--border-color': 'var(--accent-2)',
                            } as CSSProperties}
                            {...rest as ComponentProps<typeof StyledButton>}
                        >
                            {label}
                        </StyledButton>
                    );
                    case 'checkbox': return <Checkbox key={label} {...props as CheckboxProps} />;
                    case 'slider': return <Slider key={label} {...props as SliderProps} />;
                    case 'file': return <FileUpload key={label} {...props as FileUploadProps<unknown>} />;
                    default: throw new Error();
                }
            })}
        </SettingsPanel>
    );
}
