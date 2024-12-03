import type { Story } from '@ladle/react';
import { FileUpload } from './file-upload';

export const Example: Story = () => (
    <FileUpload
        label="example"
        process={() => 0}
        selection={{
            value: 'a value',
            initialValues: {
                'a value': 0,
                'an other': 1,
            },
        }}
    />
);
