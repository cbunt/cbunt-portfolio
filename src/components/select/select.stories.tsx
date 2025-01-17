import type { Story } from '@ladle/react';
import { Select } from './select';
import { CSSProperties } from 'react';
import { mapRange } from '../../utils/general';

function makeItems(n: number) {
    return mapRange(n, (i) => `item ${i}`);
}

function ExampleSelect({
    items,
    style,
    label = 'Example select',
}: { items: string[], label?: string, style?: CSSProperties }) {
    return (
        <Select
            label={label}
            style={style}
            onChange={console.log}
            items={items.reduce((p, c, i) => ({ ...p, [c]: `${label}: ${i}` }), {})}
        />
    );
}

export const FewItems: Story = () => <ExampleSelect items={makeItems(3)} />;
export const NoItems: Story = () => <ExampleSelect items={[]} />;
export const OneItem: Story = () => <ExampleSelect items={['the only option']} />;
export const ManyItems: Story = () => <ExampleSelect items={makeItems(10)} />;

export const LongItems: Story = () => (
    <ExampleSelect
        items={[
            'some long text that should far exceed the width of the parent select element',
            'shorter text',
        ]}
    />
);

export const WidthConstrained: Story = () => (
    <div style={{ width: '10em' }}>
        <ExampleSelect
            items={[
                'some long text that should far exceed the width of the parent select element',
                'shorter text',
            ]}
        />
    </div>
);

export const Overlapping: Story = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
        <ExampleSelect items={makeItems(3)} label="first" style={{ width: '10em' }} />
        <ExampleSelect items={makeItems(3)} label="second" style={{ width: '20em' }} />
        <ExampleSelect items={makeItems(3)} label="third" />
    </div>
);
