import { useEffect, useRef, useState } from 'react';
import Distortion, { DistortHandle } from 'react-distortion';

export function useTooltip(content?: string, id?: string) {
    const distortionRef = useRef<DistortHandle>(null);
    const [shown, setShown] = useState(false);

    const tooltip = content != null
        ? (
                <Distortion
                    id={id}
                    role="tooltip"
                    defaultFilter={{
                        scale: 10,
                        disable: true,
                    }}
                    ref={distortionRef}
                >
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

export function useRerenderEffect(fn: () => void, deps: unknown[]) {
    const isMountingRef = useRef(false);

    useEffect(() => { isMountingRef.current = true; }, []);

    useEffect(() => {
        if (!isMountingRef.current) {
            fn();
        } else {
            isMountingRef.current = false;
        }
    }, deps);
}
