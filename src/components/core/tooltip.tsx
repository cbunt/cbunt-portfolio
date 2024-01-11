import { ComponentPropsWithoutRef, ReactNode, useRef } from 'react';
import { Tooltip } from 'react-tooltip';
import styled from 'styled-components';

import DistortionElement from './distortion-element';

export const StyledTooltip = styled(Tooltip).attrs({
    disableStyleInjection: true,
    opacity: 1,
    offset: 12,
})`
    background-color: #0000;
    color: var(--hi-vis-gray);
    padding: 12px;
    font-size: inherit;
    z-index: 3;
    max-width: 10rem;
`;

const ValueBackground = styled(DistortionElement).attrs({ scale: 10 })`
    border-radius: 8px;
    background-color: var(--secondary-color);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
`;

export default function CustomTooltip({
    children,
    ...rest
}: ComponentPropsWithoutRef<typeof Tooltip>) {
    const seedCallback = useRef<(() => void) | null>(null);

    return (
        <StyledTooltip {...rest} afterHide={() => seedCallback.current?.()}>
            <ValueBackground refreshSeedCallback={(fn) => { seedCallback.current = fn; }} />
            {children as ReactNode}
        </StyledTooltip>
    );
}
