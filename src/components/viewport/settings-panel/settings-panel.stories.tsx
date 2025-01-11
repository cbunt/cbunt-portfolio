import type { Story } from '@ladle/react';
import { CSSProperties } from 'react';

import Button from '../../button/button';
import Checkbox from '../../checkbox/checkbox';
import FileUpload from '../../file-upload/file-upload';
import Slider from '../../slider/slider';
import SettingsPanel from './settings-panel';

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
            <Slider label="A Slider" description="a slider" />
            <Checkbox label="A checkbox" description="a checkbox" />
            <FileUpload
                label="A File Upload"
                process={() => 0}
                accept=".jpg"
                selection={{
                    value: 'a value',
                    initialValues: {
                        'a value': 0,
                        'another value': 0,
                        'another value with a lot of text so as to exceed the width': 0,
                        'another value so the box scrolls': 0,
                    },
                }}
            />
            <Button
                style={{
                    gridColumn: 'span 3',
                    color: 'var(--accent-2)',
                    '--border-color': 'var(--accent-2)',
                } as CSSProperties}
            >
                A Button
            </Button>
        </SettingsPanel>
    </div>
);
