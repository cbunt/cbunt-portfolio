import { ComponentPropsWithoutRef, ComponentType, ElementType, ReactNode, useId, useMemo, useRef } from 'react';
import { Tooltip } from 'react-tooltip';
import styled from 'styled-components';

import DistortionElement from './distortion-element';
import { PolymorphicProps } from '../../utils/frontend';

export const StyledTooltip = styled(Tooltip).attrs({
    disableStyleInjection: true,
    opacity: 1,
    offset: 12,
})`
    background-color: #0000;
    color: var(--hi-vis-gray);
    padding: 12px;
    font-size: inherit;
    z-index: 5;
    max-width: 10rem;
    width: max-content;
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

export type CustomTooltipProps<E extends ElementType | undefined> = PolymorphicProps<E, 'div', {
    tooltipProps?: Omit<ComponentPropsWithoutRef<typeof Tooltip>, 'id'>,
    tooltipContent?: ReactNode,
    children?: ReactNode,
}>;

export default function CustomTooltip<T extends ElementType | undefined>({
    children,
    tooltipProps,
    tooltipContent,
    forwardedAs,
    ...rest
}: CustomTooltipProps<T>) {
    const id = useId();
    const seedCallback = useRef<(() => void) | null>(null);
    const As = (forwardedAs ?? 'div') as ComponentType | keyof JSX.IntrinsicElements;

    const tooltip = useMemo(() => {
        if (tooltipContent == null) return undefined;

        const afterHide = () => {
            seedCallback.current?.();
            tooltipProps?.afterHide?.();
        };

        return (
            <StyledTooltip {...tooltipProps} id={id} afterHide={afterHide}>
                {tooltipContent}
                <ValueBackground refreshSeedCallback={(fn) => { seedCallback.current = fn; }} />
            </StyledTooltip>
        );
    }, [tooltipContent, tooltipProps]);

    return (
        <>
            <As {...rest} data-tooltip-id={id}>
                {children}
            </As>
            {tooltip}
        </>
    );
}
