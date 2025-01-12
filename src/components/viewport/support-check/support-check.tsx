import Distortion from 'react-distortion';
import { ModelConstructor } from '../../../rendering/samples/settings/sample-spec';
import { lazy, useRef } from 'react';

import styles from './support-check.module.scss';
import Markdown from 'react-markdown';

export type SupportCheckProps = {
    ModelConstructor?: ModelConstructor,
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const WEBGPU_SUPPORTED = navigator.gpu?.requestAdapter != null;

const UNSUPPORTED_WARNING = /* md */`
This browser does not support webgpu.  
\\
For an up to date list of supported browsers,  
see [caniuse.com/webgpu](https://caniuse.com/webgpu).
`;

const Viewport = lazy(() => import('../viewport'));

export default function SupportCheck({ ModelConstructor }: SupportCheckProps) {
    const viewportRef = useRef<HTMLDivElement>(null);

    return (
        <Distortion
            className={styles.viewport}
            forwardedRef={viewportRef}
            defaultFilter={{
                disable: true,
                scale: 5,
            }}
        >
            {ModelConstructor && WEBGPU_SUPPORTED
                ? <Viewport viewportRef={viewportRef} ModelConstructor={ModelConstructor} />
                : <Markdown>{UNSUPPORTED_WARNING}</Markdown>}
        </Distortion>
    );
}
