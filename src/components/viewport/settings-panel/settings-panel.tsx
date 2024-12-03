import { useId, useRef, useState } from 'react';
import Draggable from 'react-draggable';

import { StyledButton } from '../../core';
import Distortion, { DistortHandle } from 'react-distortion';
import { DistortBackground } from 'react-distortion/child-elements';
import { injectStyle } from '../../../utils/frontend';

const panelStyle = /* css */`
    .settings-panel {
        display: grid;
        grid-template-columns: minmax(4rem, auto) minmax(4rem, 0.6fr) minmax(3rem, 0.3fr);

        padding: 1rem;
        padding-left: 2rem;
        column-gap: 0.5rem;
        row-gap: max(8px, 0.3rem);

        align-items: center;

        transition: max-height 300ms cubic-bezier(0.4, 0, 0.2, 1);

        background-color: #0000;
        color: var(--accent-1);
        z-index: 2;

        font-size: 0.6rem;
        font-weight: 700;
        font-stretch: 115%;
        border-radius: 5px;

        position: absolute;
        top: 0.5rem;
        left: 0.5rem;

        label {
            user-select: none;
            margin-top: 0;
            padding-top: max(8px, 0.3rem);
            padding-left: max(6px, 0.3rem);
            padding-right: max(6px, 0.3rem);
        }
    
        label:hover:has(+ [role="tooltip"]) {
            transform: rotate(-3deg);
        }

        > svg:first-of-type {
            padding: 1rem 0;
            box-sizing: border-box;
            position: absolute;
            left: 0.5rem;

            cursor: move;
            cursor: grab;
            pointer-events: all;

            display: block;
            width: 1rem;
            height: 100%;

            color: var(--background-color);
            transition: transform 0.3s;
        }
    
        & > div:last-of-type {
            background-color: var(--secondary-color);
            box-shadow: color-mix(in oklch, var(--background-color) 50%, black) 6px 6px 4px;
        }

        &.disabled {
            button:not(:first-of-type),
            label,
            *[role="listbox"] {
                display: none;
                transition: display 300ms cubic-bezier(0.4, 0, 0.2, 1);
            }   
        }
    }
`;

injectStyle(panelStyle, 'settings-panel');

export default function SettingsPanel({ children }: { children?: React.ReactNode }) {
    const handleId = useId();
    const nodeRef = useRef<HTMLDivElement | null>(null);
    const distortionRef = useRef<DistortHandle>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Draggable
            handle={`#${CSS.escape(handleId)}`}
            onDrag={() => distortionRef.current?.refreshSeed()}
            bounds="parent"
            nodeRef={nodeRef}
        >
            <Distortion
                ref={distortionRef}
                forwardedRef={nodeRef}
                className={`settings-panel ${isOpen ? '' : 'disabled'}`}
                defaultFilter={{
                    scale: 7,
                    disable: true,
                }}
                distortChildren={DistortBackground}
                minRefresh={800}
                style={{
                    maxHeight: isOpen ? nodeRef.current?.scrollHeight ?? '100vh' : buttonRef.current?.scrollHeight,
                }}
            >
                <svg id={handleId}>
                    <defs>
                        <pattern id="grab-handle" patternUnits="userSpaceOnUse"x="0" y="0" width="100%" height="5">
                            <circle cx="33%" cy="2.5" r="2"></circle>
                            <circle cx="66%" cy="2.5" r="2"></circle>
                        </pattern>
                    </defs>
                    <rect x="0" y="0" fill="url(#grab-handle)" width="100%" height="100%" />
                </svg>
                <StyledButton
                    forwardedRef={buttonRef}
                    style={{ gridColumn: 'span 3' }}
                    onClick={() => { setIsOpen((open) => !open); }}
                >
                    {isOpen ? 'Hide Controls' : 'Show Controls'}
                </StyledButton>
                {children}
            </Distortion>
        </Draggable>
    );
}
