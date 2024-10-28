import { ComponentPropsWithoutRef, ComponentType, ElementType, ReactNode, useId, useMemo, useRef, JSX } from 'react';
import { Tooltip } from 'react-tooltip';
import styled from 'styled-components';

import Distortion, { DistortHandle } from 'react-distortion';
import { DistortBackground } from 'react-distortion/child-elements';
import { PolymorphicProps } from '../../utils/frontend';

export const StyledTooltip = styled(Distortion as typeof Distortion<typeof Tooltip>).attrs({
    forwardedAs: Tooltip,
    defaultFilter: {
        scale: 10,
        disable: true,
    },
    distortChildren: DistortBackground,
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
    border-radius: 8px;

    --background-color: var(--secondary-color);
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
    const As = (forwardedAs ?? 'a') as ComponentType | keyof JSX.IntrinsicElements;
    const id = useId();
    const distortionRef = useRef<DistortHandle>(null);

    const tooltip = useMemo(() => {
        if (tooltipContent == null) return undefined;

        const afterHide = () => {
            distortionRef.current?.refreshSeed();
            tooltipProps?.afterHide?.();
        };

        return (
            <StyledTooltip {...tooltipProps} id={id} afterHide={afterHide} ref={distortionRef}>
                {tooltipContent}
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
