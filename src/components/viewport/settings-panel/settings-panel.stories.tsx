import type { Story } from '@ladle/react';
import SettingsPanel from './settings-panel';
import { Checkbox, FileUpload, Slider, StyledButton } from '../../core';

export const Example: Story = () => (
    <div
        style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            background: 'darkslateblue',
        }}
    >
        <SettingsPanel>
            <Slider label="A Slider" />
            <Checkbox label="A checkbox" />
            <FileUpload
                label="A File Upload"
                process={() => 0}
                accept=".jpg"
                selection={{
                    value: 'a value',
                    initialValues: {
                        'a value': 0,
                        'another value': 0,
                    },
                }}
            />
            <StyledButton
                style={{
                    gridColumn: 'span 3',
                    color: 'var(--accent-2)',
                    '--border-color': 'var(--accent-2)',
                }}
            >
                A Button
            </StyledButton>
        </SettingsPanel>
    </div>
);
