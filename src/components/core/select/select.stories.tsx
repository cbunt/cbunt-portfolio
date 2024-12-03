import type { Story } from '@ladle/react';
import { Select } from './select';

export const FewItems: Story = () => (
    <Select
        onChange={console.log}
        items={{
            'item 1': 'item 1',
            'item 2': 'item 2',
            'item 3': 'item 3',
        }}
    />
);

export const NoItems: Story = () => (
    <Select
        onChange={console.log}
        items={{}}
    />
);

export const OneItem: Story = () => (
    <Select
        onChange={console.log}
        items={{ 'only option': 'the only option' }}
    />
);

export const ManyItems: Story = () => (
    <Select
        onChange={console.log}
        items={{
            'item 1': 'item 1',
            'item 2': 'item 2',
            'item 3': 'item 3',
            'item 4': 'item 4',
            'item 5': 'item 5',
            'item 6': 'item 6',
            'item 7': 'item 7',
            'item 8': 'item 8',
            'item 9': 'item 9',
            'item 10': 'item 10',
        }}
    />
);

export const LongItems: Story = () => (
    <Select
        onChange={console.log}
        items={{
            'some long text that should far exceed the width of the parent select element': 0,
            'shorter text': 1,
        }}
    />
);

export const WidthConstrained: Story = () => (
    <div style={{ width: '10em' }}>
        <Select
            onChange={console.log}
            items={{
                'some long text that should far exceed the width of the parent select element': 0,
                'shorter text': 1,
            }}
        />
    </div>
);
