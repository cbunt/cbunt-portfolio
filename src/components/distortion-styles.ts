import { DistortOptions } from 'react-distortion';

export const interactiveFilters = {
    defaultFilter: {
        disable: true,
        scale: 5,
        baseFrequency: 0.02,
        numOctaves: 1,
    },
    hoverFilter: {
        animation: 'alternating loop',
        scale: 4,
        baseFrequency: 0.01,
    },
    activeFilter: {
        scale: 5,
        baseFrequency: 0.01,
    },
} satisfies DistortOptions;
