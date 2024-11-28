import { ReactNode, StrictMode, JSX } from 'react';
import { createGlobalStyle } from 'styled-components';

import NavBar from './navbar';

const GlobalStyle = createGlobalStyle`
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;

        &:hover {
            transform: scale(10);
            filter: brightness(1.2);
        }
    }

    ::-webkit-scrollbar-corner,
    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        border: 2px solid transparent;
        background-clip: padding-box;

        background: var(--secondary-color);
        border-radius: 5px;

        &:hover {
            background: #555;
            border: 0;
        }
    }

    body {
        font-family: "Asap", sans-serif;

        --scale-bezier: cubic-bezier(0.81, 0, 0.37, 3.69);
        --scale-transition: transform 0.2s cubic-bezier(0.81, 0, 0.37, 3.69);

        --ok-l2: 0.6;

        --background-color: #0A102E;
        --hi-vis-color: #DBE4FF;

        --secondary-color: oklch(from var(--background-color) calc(l * 1.5) calc(c * 1.5) h);

        --accent-1: #18F7F7;
        --accent-2: #FF61FF;
        --accent-3: #FFFF16;

        @media (prefers-color-scheme: light) {
            --ok-l2: 1.3;

            --background-color: #FEF6C7;
            --hi-vis-color: #0c007d;
            --secondary-color: oklch(from var(--background-color) calc(l * 0.95) calc(c * 1.4) h);

            --accent-1: #D61500;
            --accent-2: #2F8000;
            --accent-3: #034cdf;
        }
        
        @supports (color: oklch(from white l c h)) {
            --hi-vis-gray: oklch(from var(--hi-vis-color) l 0 h);
        }
            
        background-color: var(--background-color);
        color: var(--hi-vis-color);
        margin: 0;
    }

    :root {
        color-scheme: dark light;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    #root {
        display: grid;
        grid-template-rows: 1fr auto;
        grid-template-columns: minmax(min-content, 6rem) auto;

        min-height: 100vh;
        min-height: 100svh;
    }

    h1 {
        font-stretch: 125%;
    }

    h1, h2 {
        margin: 0 0 1rem;
    }

    a {
        text-decoration: none;
        color: light-dark(var(--accent-3), var(--accent-1));
       
        &:visited {
            color: var(--accent-2);
        }
    }

    p {
        max-width: calc(100% - 1rem);
        line-height: 1.75em;
        margin-block-start: 0;
        margin-inline: 1rem;
    }

    article {
        margin: 1.75rem 0;
    }

    code {
        font-family: 'Space Mono', monospace;
        color: var(--hi-vis-gray);
        background-color: var(--secondary-color);
        padding: 0 0.3rem;
        border-radius: 5px;
    }

    main {
        width: min(calc(80vh * 1.66), 100%);
        margin: 0 auto;
        padding-top: 2rem;
        box-sizing: border-box;
    }

    footer {
        font-size: small;
        text-align: center;
        padding: 1.5rem 0;
        font-weight: 200;
    }
`;

export type SitePageProps = {
    children: ReactNode,
    extendMainWidth?: boolean,
};

export default function SitePage({ children }: SitePageProps): JSX.Element {
    return (
        <StrictMode>
            <GlobalStyle />
            <NavBar />
            <main>{children}</main>
            <footer>MIT © 2024</footer>
        </StrictMode>
    );
}
