import { ElementType, ComponentProps } from 'react';
import Markdown, { Options as MarkdownOptions } from 'react-markdown';
import remarkGfm from 'remark-gfm';

export type TweakedMarkdownProps<E extends ElementType> = {
    as?: E,
    options?: MarkdownOptions,
    children?: string | null,
} & Omit<ComponentProps<E>, 'as' | 'options' | 'children'>;

export default function TweakedMarkdown<E extends ElementType = 'article'>({
    as,
    children,
    options: { remarkPlugins, components, ...restOptions } = {},
    ...rest
}: TweakedMarkdownProps<E>) {
    const As = as ?? 'article';
    return (
        <As {...rest}>
            <Markdown
                components={{ h1: 'h2', h2: 'h3', ...components }}
                remarkPlugins={[remarkGfm, ...(remarkPlugins ?? [])]}
                {...restOptions}
            >
                {children}
            </Markdown>
        </As>
    );
}
