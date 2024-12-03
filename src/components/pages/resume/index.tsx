import { renderApp } from '../../../utils/frontend';
import SitePage from '../../site-page/site-page';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import './resume.module.css';

const resumeURL = 'https://raw.githubusercontent.com/cbunt/resume/refs/heads/main/resume.md';
const content = await fetch(resumeURL).then((res) => res.text());

renderApp(
    <SitePage>
        <h1>Cass Bunting&#39;s Resume</h1>
        <article>
            <Markdown
                components={{
                    h1: 'h2',
                    h2: 'h3',
                    del: ({ children }) => typeof children === 'string'
                        ? (<i>{String.fromCodePoint(parseInt(children, 16))}</i>)
                        : undefined,
                }}
                rehypePlugins={[remarkGfm]}
            >
                {content}
            </Markdown>
        </article>
    </SitePage>,
);
