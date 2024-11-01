import styled from 'styled-components';

import { renderApp } from '../../utils/frontend';
import SitePage from '../page-elements/page-wrapper';

import TweakedMarkdown from '../core/tweaked-markdown';

const MarkdownStyle = styled(TweakedMarkdown)`
    columns: 2 max(15rem, 30vw);
    column-gap: 3rem;

    * {
        break-before: avoid;
        break-inside: avoid;
    }

    h2 {
        break-before: auto;
    }

    a {
        text-decoration: none;
    }

    h3 {
        margin-bottom: 0;
        font-size: medium;
        font-weight: bold;
    }

    p {
        text-justify: auto;
        margin-left: 0;
    }

    ul {
        margin-left: 1rem;
        padding: 0;
        list-style-type: none;
        list-style-position: outside;
        line-height: 1.5rem;
        margin-top: 0.25rem;

        li:not(:first-child) {
            margin-top: 0.25rem;
        }
    }

    ol {
        display: flex;
        flex-wrap: wrap;

        column-gap: 1rem;
        row-gap: 1rem;
        margin: 0.5rem 0;
        padding: 1rem 0;
        line-height: normal;

        li {
            padding: 0;
            margin: 0 1rem;
            align-content: center;
            font-weight: bold;
            display: block;

            &:not(:first-child) {
                margin-top: 0;
            }
        }

        i {
            font-weight: normal;
            padding: 0;
            margin: 0;
            margin-right: 0.25rem;
            font-style: normal;
            font-family: 'NerdFontsSymbols Nerd Font';
        }
    }
`;

const resumeURL = 'https://raw.githubusercontent.com/cbunt/resume/refs/heads/main/resume.md';
const content = await fetch(resumeURL).then((res) => res.text());

renderApp(
    <SitePage>
        <h1>Cass Bunting&apos;s Resume</h1>
        <MarkdownStyle
            options={{ components: {
                del: ({ children }) => (typeof children === 'string' ? (<i>{String.fromCodePoint(parseInt(children, 16))}</i>) : undefined),
            } }}
        >
            {content}
        </MarkdownStyle>
    </SitePage>,
);
