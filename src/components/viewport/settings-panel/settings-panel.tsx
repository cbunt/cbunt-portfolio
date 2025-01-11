import { useId, useRef, useState } from 'react';
import Draggable from 'react-draggable';

import StyledButton from '../../button/button';
import Distortion, { DistortHandle } from 'react-distortion';

import styles from './settings-panel.module.scss';

export default function SettingsPanel({ children }: { children?: React.ReactNode }) {
    const handleId = useId();
    const nodeRef = useRef<HTMLDivElement>(null);
    const distortionRef = useRef<DistortHandle>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Draggable
            handle={`#${CSS.escape(handleId)}`}
            onDrag={() => distortionRef.current?.refreshSeed()}
            bounds="parent"
            nodeRef={nodeRef as { current: NonNullable<typeof nodeRef.current> }}
        >
            <Distortion
                ref={distortionRef}
                forwardedRef={nodeRef}
                className={`${styles['settings-panel']} ${isOpen ? '' : styles.disabled}`}
                defaultFilter={{
                    scale: 7,
                    disable: true,
                }}
                minRefresh={600}
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
                    {isOpen ? 'Hide Options' : 'Show Options'}
                </StyledButton>
                {children}
            </Distortion>
        </Draggable>
    );
}
