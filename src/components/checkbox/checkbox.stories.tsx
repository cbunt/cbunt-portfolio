import type { Story } from '@ladle/react';
import Checkbox, { CheckboxProps } from './checkbox';

function Wrapper(props: CheckboxProps) {
    return (
        <div style={{ display: 'flex', gap: '1em' }}>
            <Checkbox {...props} />
        </div>
    );
}

export const Defaults: Story = () => <Wrapper label="Defaults" />;
export const Disabled: Story = () => <Wrapper label="Disabled" disabled />;
export const Checked: Story = () => <Wrapper label="Checked" value />;

export const WithTooltip: Story = () => (
    <Wrapper
        label="With Tooltip"
        description="Here's some tooltip text for this here checkbox."
    />
);
