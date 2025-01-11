import { DistortOptions } from 'react-distortion';

export const interactiveFilters = {
    defaultFilter: {
        scale: 5,
        baseFrequency: 0.02,
        numOctaves: 1,
    },
    hoverFilter: {
        alternate: {
            scale: 4,
            baseFrequency: 0.01,
        },
        animationJitter: 200,
        animationInterval: 650,
        steps: 5,
        scale: 8,
        baseFrequency: 0.02,
    },
    activeFilter: {
        scale: 5,
        baseFrequency: 0.01,
    },
} satisfies DistortOptions;

export const interactiveConditionalFilters = {
    ...interactiveFilters,
    defaultFilter: {
        ...interactiveFilters.defaultFilter,
        disable: true,
    },
} satisfies DistortOptions;

export const interactiveDisabledFilters = {
    defaultFilter: {
        ...interactiveFilters.defaultFilter,
        disable: true,
    },
    hoverFilter: {
        ...interactiveFilters.hoverFilter,
        disable: true,
    },
    activeFilter: {
        ...interactiveFilters.activeFilter,
        disable: true,
    },
} satisfies DistortOptions;
