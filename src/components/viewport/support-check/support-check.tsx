import Viewport from '../viewport';
import Distortion from 'react-distortion';
import { DistortBorder } from 'react-distortion/child-elements';
import { LoadModelConstructor } from '../../../samples/settings/sample-spec';
import { useRef } from 'react';

import styles from './support-check.module.css';

export type SupportCheckProps = {
    loadModelConstructor: LoadModelConstructor,
};

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
            distortChildren={DistortBorder}
        >
            {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
            {navigator.gpu?.requestAdapter == null
                ? (
                        <p>
                            This browser does not support webgpu.
                            <br />
                            <br />
                            For an up to date list of supported browsers,
                            <br />
                            see
                            {' '}
                            <a href="https://caniuse.com/webgpu">caniuse.com/webgpu</a>
                            .
                        </p>
                    )
                : <Viewport viewportRef={viewportRef} getModelConstructor={loadModelConstructor} />}
        </Distortion>
    );
}
