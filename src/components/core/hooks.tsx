import { useRef, useState } from 'react';
import Distortion, { DistortHandle } from 'react-distortion';
import { DistortBackground } from 'react-distortion/child-elements';

const tooltipStyle = /* css */`
    .distortion-tooltip {
        position: fixed;
        top: 10;
        left: 0;
        z-index: 5;

        --background-color: var(--secondary-color);
        background-color: #0000;
        color: var(--hi-vis-gray);
        
        padding: 12px;
        max-width: 10rem;
        width: max-content;
        
        border-radius: 8px;
        font-size: inherit;
    }
`;

export function useTooltip(content?: string) {
    const distortionRef = useRef<DistortHandle>(null);
    const [shown, setShown] = useState(false);

    const tooltip = content != null
        ? (
                <Distortion
                    className="distortion-tooltip"
                    defaultFilter={{
                        scale: 10,
                        disable: true,
                    }}
                    distortChildren={DistortBackground}
                    ref={distortionRef}
                >
                    <style>{tooltipStyle}</style>
                    {content}
                </Distortion>
            )
        : undefined;

    const show = () => { setShown(true); };

    const hide = () => {
        setShown(false);
        distortionRef.current?.refreshSeed();
    };

    return [shown ? tooltip : undefined, show, hide] as const;
}
