import { ComponentProps, CSSProperties } from 'react';
import DistortComponent from 'react-distortion';

function TranslucentGradient({ color, ...rest }: ComponentProps<'linearGradient'> & { color: string }) {
    return (
        <linearGradient {...rest}>
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="#0000" />
        </linearGradient>
    );
}

export default function PageIcon({ style }: { style?: CSSProperties }) {
    return (
        <DistortComponent
            style={style}
            defaultFilter={{
                baseFrequency: 0.02,
                scale: 10,
                disable: true,
            }}
            hoverFilter={{
                animation: 'alternating loop',
                scale: 15,
            }}
        >
            <svg viewBox="0 0 100 75" width="2rem" height="100%">
                <defs>
                    <TranslucentGradient id="cyan" x1="0" y1="1" x2="0.75" y2="0.5" color="var(--accent-2)" />
                    <TranslucentGradient id="yellow" x1="0.5" y1="0" x2="0.5" y2="1" color="var(--accent-1)" />
                    <TranslucentGradient id="magenta" x1="1" y1="1" x2="0.25" y2="0.5" color="var(--accent-3)" />
                    <polygon id="triangle" style={{ mixBlendMode: 'hard-light' }} points="0 75, 50 0, 100 75" />
                </defs>
                <use href="#triangle" fill="white" />
                <use href="#triangle" fill="url(#magenta)" />
                <use href="#triangle" fill="url(#yellow)" />
                <use href="#triangle" fill="url(#cyan)" />
            </svg>
        </DistortComponent>
    );
}
