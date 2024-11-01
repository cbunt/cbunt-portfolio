import { JSX } from 'react';
import Markdown, { Options as MarkdownOptions } from 'react-markdown';
import remarkGfm from 'remark-gfm';

export type TweakedMarkdownProps = {
    options?: MarkdownOptions,
    children?: string | null,
} & JSX.IntrinsicElements['article'];

export default function TweakedMarkdown({
    children,
    options: { remarkPlugins, components, ...restOptions } = {},
    ...rest
}: TweakedMarkdownProps) {
    return (
        <article {...rest}>
            <Markdown
                components={{ h1: 'h2', h2: 'h3', ...components }}
                remarkPlugins={[remarkGfm, ...(remarkPlugins ?? [])]}
                {...restOptions}
            >
                {children}
            </Markdown>
        </article>
    );
}
