import type { Story } from '@ladle/react';
import Slider, { SliderProps } from './slider';

const Wrapper = (props: SliderProps) => (
    <div style={{ display: 'flex', gap: '1rem' }}>
        <Slider onChange={console.log} {...props} />
    </div>
);

export const Defaults: Story = () => <Wrapper label="Defaults" />;

export const Disabled: Story = () => <Wrapper label="Disabled" disabled />;

export const WithTooltip: Story = () => (
    <Wrapper label="WithTooltip" description="A slider with a tooltip" />
);

export const SliderState: Story = () => (
    <Wrapper label="SliderState" min={-1} max={1} step={0.1} value={0} />
);
