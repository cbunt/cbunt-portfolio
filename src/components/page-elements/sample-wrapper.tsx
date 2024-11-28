import { ReactNode } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

import type { LoadModelConstructor } from '../../samples/settings/sample-spec';

import SitePage from './page-wrapper';
import SupportCheck from '../viewport/support-check';
import styled from 'styled-components';
import theme from './codemirror-theme';
import Distortion from 'react-distortion';
import { DistortBorder } from 'react-distortion/child-elements';

const CodeContainer = styled(Distortion).attrs({
    defaultFilter: { disable: true },
    distortChildren: DistortBorder,
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

const NameHeader = styled.h1`
    text-transform: capitalize;
`;

export type SampleWrapperProps = {
    loadModelConstructor: LoadModelConstructor,
    modelName: string,
    sourceText?: string,
    children?: ReactNode,
};

export default function SampleWrapper({
    loadModelConstructor: loadModelConstructor,
    modelName,
    sourceText,
    children,
}: SampleWrapperProps) {
    return (
        <SitePage extendMainWidth>
            <NameHeader>{modelName}</NameHeader>
            <SupportCheck loadModelConstructor={loadModelConstructor} />
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
