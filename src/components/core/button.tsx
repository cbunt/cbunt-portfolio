import styled from 'styled-components';
import DistortComponent, { DistortOptions } from 'react-distortion';
import { DistortBorder } from 'react-distortion/child-elements';

const StyledButton = styled(DistortComponent).attrs({
    forwardedAs: 'button',
    type: 'button',
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
    distortChildren: DistortBorder,
} as DistortOptions)`
    color: var(--accent-3);
    --border-color: var(--accent-3);
    --border-width: max(3px, 0.1rem);

    border-radius: 3px;
    border: var(--border-width) solid #0000;

    position: relative;
    grid-column: span 2;
    height: 1.5rem;

    appearance: none;
    box-shadow: none;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    
    background-color: #0000;
    overflow: visible;

    cursor: pointer;
    user-select: none;
    touch-action: manipulation;
    font-family: inherit;
    font-stretch: inherit;
    font-size:  inherit;
    font-weight: 800;

    transition: 
        font-size 0.1s var(--scale-bezier),
        font-stretch 0.15s var(--scale-bezier),
        var(--scale-transition);

    &:hover:not(:disabled) {
        transform: scale(1.015);
        font-stretch: 125%;
    }
    
    &:active:not(:disabled) {
        transform: scale(0.995);
        font-stretch: 120%;
    }

    &:disabled {
        cursor: default;
    } 
`;

export default StyledButton;
