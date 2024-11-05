import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

export default createTheme({
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
