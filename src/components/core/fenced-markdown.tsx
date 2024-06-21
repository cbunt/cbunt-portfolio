import Markdown, { MarkdownToJSX, RuleType } from 'markdown-to-jsx'
import { Fragment } from 'react/jsx-runtime';
import React, { ComponentPropsWithoutRef, JSX, isValidElement } from 'react';

function isTaggedFence(node: MarkdownToJSX.ParserResult): node is MarkdownToJSX.CodeBlockNode & { lang: keyof JSX.IntrinsicElements } {
    if (node.type !== RuleType.codeBlock || node.lang == null) return false;
    if (isValidElement(node.lang)) return true;
    try {
        return document.createElement(node.lang).toString() != "[object HTMLUnknownElement]";
    } catch {
        return false;
    }
}

const renderRule: (tags?: { [tag: string]: React.ComponentType } ) => MarkdownToJSX.Options['renderRule'] = 
(tags?) => (next, node, children, state) => {
    if (node.type === RuleType.codeBlock && node.lang != null) {
        let Elm: React.ComponentType | keyof JSX.IntrinsicElements;
        if (tags?.[node.lang] != null) {
            Elm = tags[node.lang];
        } else if (isTaggedFence(node)) {
            Elm = node.lang;
        } else {
            return next();
        }

        const { attrs } = node;
        return (
            <Elm {...attrs} key={state.key}>
                <FencedMarkedown>{String.raw`${node.text}`}</FencedMarkedown>
            </Elm>
        );
    }
    return next();
};

export default function FencedMarkedown({
    children,
    options,
    tags,
    ...rest
}: ComponentPropsWithoutRef<typeof Markdown> & { tags?: { [tag: string]: React.ComponentType } }) {
    return (
        <Markdown options={{ ...rest, ...options, wrapper: options?.wrapper ?? Fragment, renderRule: renderRule(tags) }}>
            {children}
        </Markdown>
    );
}
