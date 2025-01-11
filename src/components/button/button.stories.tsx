import type { Story } from '@ladle/react';
import Button from './button';

export const Defaults: Story = () => (
    <div style={{ width: '10em' }}>
        <Button>Some Text</Button>
    </div>
);

export const Disabled: Story = () => (
    <div style={{ width: '10em' }}>
        <Button disabled>Disabled</Button>
    </div>
);
