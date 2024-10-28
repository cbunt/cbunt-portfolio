import Markdown, { Options } from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function TweakedMarkdown({ components, children, remarkPlugins, ...rest }: Options) {
    return (
        <Markdown
            components={{ h1: 'h2', h2: 'h3', ...components }}
            remarkPlugins={[remarkGfm, ...(remarkPlugins ?? [])]}
            {...rest}
        >
            {children}
        </Markdown>
    );
}
