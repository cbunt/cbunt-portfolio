import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import Distortion from 'react-distortion';

import type { ModelConstructor } from '../../rendering/samples/settings/sample-spec';
import SupportCheck from '../viewport/support-check/support-check';

import styles from './sample-wrapper.module.scss';
import { ReactNode } from 'react';

const theme = createTheme({
    theme: 'dark',
    settings: {
        background: 'var(--background-color)',
        foreground: 'var(--hi-vis-color)',
        caret: 'red',
        selection: '#8884',
        selectionMatch: '#8880',
        lineHighlight: '#0000',
        gutterBackground: 'var(--background-color)',
        gutterForeground: 'var(--accent-3)',
        fontFamily: 'Space Mono',
        fontSize: 'min(2vw, 1rem)',
    },
    styles: [
        { tag: t.propertyName, 'font-style': 'italic' },
        { tag: t.literal, color: 'var(--accent-3)' },
        { tag: [t.className, t.typeName], color: 'var(--accent-2)' },
        { tag: [t.string, t.special(t.brace)], color: 'light-dark(#037b55, #c1fba0)' },
        {
            tag: t.comment,
            color: 'color-mix(in oklab, var(--background-color) 40%, var(--hi-vis-gray))',
        },
        {
            tag: [t.keyword, t.operator],
            color: 'var(--accent-2)',
            'font-weight': 'bold',
        },
        {
            tag: [t.brace, t.bracket, t.paren, t.angleBracket],
            color: 'var(--accent-3)',
            'font-weight': 'bold',
        },
        {
            tag: [t.function(t.propertyName), t.function(t.variableName)],
            color: 'var(--accent-1)',
            'font-weight': 'bold',
        },
    ],
});

export type SampleWrapperProps = {
    ModelConstructor?: ModelConstructor,
    modelName: string,
    source?: string,
    children?: ReactNode,
};

export default function SampleWrapper({
    ModelConstructor,
    modelName,
    source,
    children,
}: SampleWrapperProps) {
    return (
        <>
            <h1>{modelName}</h1>
            <SupportCheck ModelConstructor={ModelConstructor} />
            {children}
            {source == null
                ? undefined
                : (
                        <>
                            <h2>Source Code</h2>
                            <Distortion
                                className={styles['code-container']}
                                defaultFilter={{ disable: true }}
                                as={CodeMirror}
                                theme={theme}
                                editable={false}
                                maxHeight="80vh"
                                value={source}
                                extensions={[javascript({ typescript: true })]}
                            />
                        </>
                    )}
        </>
    );
}
