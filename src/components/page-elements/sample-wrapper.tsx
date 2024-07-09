import { ReactNode } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

import type { LoadModelConstructor } from '../../samples/sample-spec';

import SitePage from './page-wrapper';
import SupportCheck from '../viewport/support-check';
import SampleSelect from './sample-select';
import styled from 'styled-components';
import theme from './codemirror-theme';
import DistortionElement from '../core/distortion-element';

const CodeContainer = styled(DistortionElement).attrs({
    border: true,
    baseMode: 'none',
})`
    position: relative;
    --border-color: var(--secondary-color);
    --border-width: 5px;
    border-style: solid;
    border-color: #0000;

    display: flex;
    border-radius: 6px;

    > div:first-of-type {
        flex-grow: 1;
        width: 0;
        overscroll-behavior: contain;
        margin: 0.5rem;
    }
`;

export type SampleWrapperProps = {
    getModelConstructor?: LoadModelConstructor,
    modelName: string,
    sourceText?: string,
    children: ReactNode,
};

export default function SampleWrapper({
    getModelConstructor,
    modelName,
    sourceText,
    children,
}: SampleWrapperProps) {
    return (
        <SitePage>
            <SampleSelect selected={modelName} />
            {getModelConstructor != null ? <SupportCheck getModelConstructor={getModelConstructor} /> : undefined}
            {children}
            {sourceText != null
                ? (
                    <CodeContainer>
                        <CodeMirror
                            theme={theme}
                            editable={false}
                            maxHeight="80vh"
                            value={sourceText}
                            extensions={[javascript({ jsx: true, typescript: true })]}
                        />
                    </CodeContainer>
                    )
                : undefined}
        </SitePage>
    );
}