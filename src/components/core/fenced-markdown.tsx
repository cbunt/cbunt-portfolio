import { ComponentType, useCallback, Fragment } from 'react';
import Markdown, { MarkdownToJSX, RuleType } from 'markdown-to-jsx';

function getTagElement(tag: string, tags?: Record<string, ComponentType>) {
    if (tags?.[tag] != null) return tags[tag];

    try {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        if (document.createElement(tag).toString() !== '[object HTMLUnknownElement]') {
            return tag as keyof JSX.IntrinsicElements;
        }
    } catch { /**/ }
    return undefined;
}

type FencedMarkdownProps = {
    children: string,
    options?: MarkdownToJSX.Options,
    tags?: Record<string, ComponentType>,
    [key: Exclude<string, 'options' | 'children' | 'tags'>]: unknown,
};

export default function FencedMarkdown({
    children,
    options,
    tags,
    ...rest
}: FencedMarkdownProps) {
    // eslint-disable-next-line react/display-name
    const renderRule = useCallback((tOptions: MarkdownToJSX.Options) => (
        ...[next, node, /* children */, state]: Parameters<Required<MarkdownToJSX.Options>['renderRule']>
    ) => {
        if (node.type !== RuleType.codeBlock || node.lang == null) return next();

        const Elm = getTagElement(node.lang, tags);
        if (Elm == null) return next();

        const nextOptions = { ...tOptions };
        let { attrs } = node;

        if (attrs != null && 'overrides' in attrs && typeof attrs.overrides === 'string') {
            const overrideObj = JSON.parse(attrs.overrides) as object;

            const newOverrides = Object.entries(overrideObj).flatMap(([tag, replacement]) => {
                const component = typeof replacement === 'string' ? getTagElement(replacement, tags) : undefined;
                return component == null
                    ? []
                    : [[tag, { component }] as [string, { component: ComponentType | keyof JSX.IntrinsicElements }]];
            });

            nextOptions.overrides = { ...nextOptions.overrides, ...Object.fromEntries(newOverrides) };
            attrs = (({ overrides, ...rest }) => rest)(attrs);
        }

        const wrapper = (props: object) => <Elm {...attrs} {...props} />;

        return (
            <Markdown key={state.key} options={{ ...nextOptions, renderRule: renderRule(nextOptions), wrapper }}>
                {String.raw`${node.text}`}
            </Markdown>
        );
    }, [options, tags]);

    const partialOptions = { ...rest, ...options };
    return (
        <Markdown options={{ ...partialOptions, renderRule: renderRule(partialOptions), wrapper: options?.wrapper ?? Fragment }}>
            {children}
        </Markdown>
    );
}
