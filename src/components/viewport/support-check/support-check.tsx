import Viewport from '../viewport';
import Distortion from 'react-distortion';
import { LoadModelConstructor } from '../../../rendering/samples/settings/sample-spec';
import { useRef } from 'react';

import styles from './support-check.module.scss';
import Markdown from 'react-markdown';

export type SupportCheckProps = {
    loadModelConstructor: LoadModelConstructor,
};

const unsupportedWarning = /* md */`
This browser does not support webgpu.  
\\
For an up to date list of supported browsers,  
see [caniuse.com/webgpu](https://caniuse.com/webgpu).
`;

export default function SupportCheck({ loadModelConstructor }: SupportCheckProps) {
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
            {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
            {navigator.gpu?.requestAdapter == null
                ? <Markdown>{unsupportedWarning}</Markdown>
                : <Viewport viewportRef={viewportRef} getModelConstructor={loadModelConstructor} />}
        </Distortion>
    );
}
