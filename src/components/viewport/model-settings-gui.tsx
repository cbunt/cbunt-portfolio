import { FileUploadProps, FileUpload, Checkbox, CheckboxProps, Slider, SliderProps, StyledButton } from '../core';
import { ModelSetting } from '../../samples/sample-spec';
import { ListenerSyms } from '../../samples/property-listener';
import SettingsPanel from './settings-panel';

export type ModelSettingsWidgetProps = {
    settings: Record<string, ModelSetting>,
};

export default function ModelSettingsWidget({ settings }: ModelSettingsWidgetProps) {
    return (
        <SettingsPanel>
            {...Object.entries(settings).map(([label, info]) => {
                const {
                    [ListenerSyms.$type]: _type,
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

                switch (info[ListenerSyms.$type]) {
                    case 'button': return <StyledButton style={{ gridColumn: 'span 3', color: 'var(--accent-2)', '--border-color': 'var(--accent-2)' }} type="button" {...rest}>{label}</StyledButton>;
                    case 'checkbox': return <Checkbox {...props as CheckboxProps} />;
                    case 'slider': return <Slider {...props as SliderProps} />;
                    case 'file': return <FileUpload {...props as FileUploadProps<unknown>} />;
                    default: throw new Error();
                }
            })}
        </SettingsPanel>
    );
}
