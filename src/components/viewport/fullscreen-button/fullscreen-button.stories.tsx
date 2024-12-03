import type { Story } from '@ladle/react';
import FullscreenButton from './fullscreen-button';
import { useRef } from 'react';

export const Example: Story = () => {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div
            style={{
                position: 'relative',
                width: '800px',
                aspectRatio: '16 / 9',
                backgroundColor: 'darkslateblue',
            }}
            ref={ref}
        >
            <FullscreenButton element={ref} />
        </div>
    );
};
