import Distortion from 'react-distortion';
import { ModelConstructor } from '../../../rendering/samples/settings/sample-spec';
import { lazy, useRef } from 'react';

import styles from './support-check.module.scss';
import Markdown from 'react-markdown';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const WEBGPU_SUPPORTED = navigator.gpu?.requestAdapter != null;

const UNSUPPORTED_WARNING = /* md */`
This browser does not support webgpu.  
\\
For an up to date list of supported browsers,  
see [caniuse.com/webgpu](https://caniuse.com/webgpu).
`;

const Viewport = lazy(() => import('../viewport'));

export type SupportCheckProps = {
    ModelModule?: { default: ModelConstructor },
};

export default function SupportCheck({ ModelModule }: SupportCheckProps) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const { default: ModelConstructor } = ModelModule || { default: undefined };

    return (
        <Distortion
            className={styles.viewport}
            forwardedRef={viewportRef}
            defaultFilter={{
                disable: true,
                scale: 5,
            }}
        >
            {ModelConstructor
                ? <Viewport viewportRef={viewportRef} ModelConstructor={ModelConstructor} />
                : <Markdown>{UNSUPPORTED_WARNING}</Markdown>}
        </Distortion>
    );
}
