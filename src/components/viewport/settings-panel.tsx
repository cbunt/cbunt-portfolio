import { useCallback, useId, useRef, useState } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { Collapse } from '@kunukn/react-collapse';

import { StyledButton } from '../core';
import DistortionElement from '../core/distortion-element';

const GUIContainer = styled(Collapse).attrs({ elementType: 'form' })`
    display: grid;
    grid-template-columns: min-content 0.6fr 0.4fr;
    column-gap: 6px;
    align-items: center;

    transition: 
        height 300ms cubic-bezier(0.4, 0, 0.2, 1),
        var(--scale-transition);

    & > * {
        margin-top: max(8px, 0.3rem);
    }

    & > label {
        user-select: none;
        margin-top: 0;
        padding-top: max(8px, 0.3rem);
        padding-left: max(6px, 0.3rem);
        padding-right: max(6px, 0.3rem);
    }

    & > label:hover:has(+ [role=tooltip]) {
        transform: rotate(-3deg);
    }
`;

const DragHandle = styled.div`
    --mask-width: 0.9rem;
    cursor: move;
    cursor: grab;
    pointer-events: all;

    width: var(--mask-width);

    margin: max(14px, 0.5rem) max(8px, 0.25rem);
    transition: 
        padding-top 0.3s,
        background-color 0.3s;

    &:after {
        content: " ";
        mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNyA5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPiAgCiAgPGNpcmNsZSBjeD0iMiIgY3k9IjEuNSIgcj0iMSI+PC9jaXJjbGU+CiAgPGNpcmNsZSBjeD0iMiIgY3k9IjQuNSIgcj0iMSI+PC9jaXJjbGU+CiAgPGNpcmNsZSBjeD0iNSIgY3k9IjEuNSIgcj0iMSI+PC9jaXJjbGU+CiAgPGNpcmNsZSBjeD0iNSIgY3k9IjQuNSIgcj0iMSI+PC9jaXJjbGU+CiAgPGNpcmNsZSBjeD0iNSIgY3k9IjcuNSIgcj0iMSI+PC9jaXJjbGU+CiAgPGNpcmNsZSBjeD0iMiIgY3k9IjcuNSIgcj0iMSI+PC9jaXJjbGU+Cjwvc3ZnPg==");
        mask-repeat: repeat-y;
        mask-size: var(--mask-width);
        background-color: var(--background-color);
        display: block;
        height: 100%;
        transition: transform 0.3s;
    }
`;

const GridContainer = styled.div`
    margin: 12px;
    margin-left: 0;
`;

const MainPanel = styled.div<{ $toggleId: string }>`
    background-color: #0000;
    color: var(--accent-1);
    z-index: 2;

    font-size: 0.6rem;
    font-weight: 700;
    font-stretch: 115%;
    border-radius: 5px;

    display: flex;
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
`;

const PanelBackground = styled(DistortionElement).attrs({
    scale: 7,
    minRefresh: 200,
})`
    border-radius: 5px;
    background-color: oklch(from var(--background-color) calc(l * var(--ok-l1)) calc(c * var(--ok-c-factor)) h);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: color-mix(in oklch, var(--background-color) 50%, black) 6px 6px 4px;
    z-index: -1;
`;

const ToggleLabel = styled(StyledButton).attrs({ forwardedAs: 'label' })`
    width: 100%;
    
    &::after {
        transition: content 0.3s;
        content: "Show Controls";
    }
    
    &:has(input:checked)::after {
        content: "Hide Controls";
    }
`;

export default function SettingsPanel({ children }: { children?: React.ReactNode }) {
    const handleId = useId();
    const toggleId = useId();
    const nodeRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(true);
    const recalcSeed = useRef<(() => void) | null>(null);

    const setRecalcSeed = useCallback((fn: () => void) => {
        recalcSeed.current = fn;
    }, []);

    const onInput = () => { setIsOpen((open) => !open); };

    return (
        <Draggable
            handle={`#${CSS.escape(handleId)}`}
            onDrag={() => recalcSeed.current?.()}
            bounds="parent"
            nodeRef={nodeRef}
        >
            <MainPanel $toggleId={toggleId} ref={nodeRef}>
                <PanelBackground refreshSeedCallback={setRecalcSeed} />
                <DragHandle id={handleId} />
                <GridContainer>
                    <ToggleLabel>
                        <input
                            id={toggleId}
                            type="checkbox"
                            style={{ position: 'absolute', top: -9999, left: -9999 }}
                            onInput={onInput}
                            checked={isOpen}
                            readOnly
                        />
                    </ToggleLabel>
                    <GUIContainer isOpen={isOpen} overflowOnExpanded>
                        {children}
                    </GUIContainer>
                </GridContainer>
            </MainPanel>
        </Draggable>
    );
}
