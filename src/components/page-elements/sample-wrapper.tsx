import { ReactNode } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

import type { LoadModelConstructor } from '../../samples/sample-spec';

import SitePage from './page-wrapper';
import SupportCheck from '../viewport/support-check';
import SampleSelect from './sample-select';
import styled from 'styled-components';

const CodeContainer = styled.div`
    display: flex;
    overflow: hidden;
    border-radius: 6px;

    > div {
        font-size: 1rem;
        flex-grow: 1;
        width: 0;
        overscroll-behavior: contain;
    }

    .CodeMirror * {
        font-size: 1rem;
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
    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return (
        <SitePage>
            <SampleSelect selected={modelName} />
            {getModelConstructor != null ? <SupportCheck getModelConstructor={getModelConstructor} /> : undefined}
            <article>{children}</article>
            {sourceText != null
                ? (
                    <CodeContainer>
                        <CodeMirror
                            theme={theme ? 'dark' : 'light'}
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
