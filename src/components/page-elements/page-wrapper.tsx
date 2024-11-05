import { ReactNode, StrictMode, JSX } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';

import Distortion from 'react-distortion';
import DistortionLink from '../core/link';
import SampleSelect from './sample-select';

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


        code {
            font-family: 'Space Mono', monospace;
            color: var(--hi-vis-gray);
            background-color: var(--secondary-color);
            padding: 0 0.3rem;
            border-radius: 5px;
        }
        
        // fallback while firefox is bugged
        --hi-vis-gray: var(--hi-vis-color);
        
        @supports (color: oklch(from white l c h)) {
            --hi-vis-gray: oklch(from var(--hi-vis-color) l 0 h);
        }
            
        background-color: var(--background-color);
        color: var(--hi-vis-color);
        margin: 0;
    }

    #root {
        display: flex;
        font-family: "Asap", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    :root {
        color-scheme: dark light;
    }

    h1 {
        font-stretch: 125%;
    }

    h1,
    h2 {
        margin: 0 0 1rem;
    }

    footer {
        font-size: small;
        text-align: center;
        margin: 2rem 0 0;
        font-weight: 200;
    }

    a {
        color: light-dark(var(--accent-3), var(--accent-1));
       
        &:visited {
            color: var(--accent-2);
        }
    }

    nav {
        display: flex;
        flex: 1 1;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
        
        position: sticky;
        top: 0;
        z-index: 10;
        max-height: 100vh;
        max-width: 6rem;
        box-sizing: border-box;
        padding: 2.5rem 0;
        
        text-transform: uppercase;
        font-size: 1.5rem;
        font-weight: 550;

        writing-mode: vertical-lr;
        transform: rotate(180deg);

        div {
            display: flex;
            flex-direction: row-reverse;
        }

        a {
            font-stretch: 125%;
        }

        *:nth-child(3n+1) { color: var(--accent-1); }
        *:nth-child(3n+2) { color: var(--accent-2); }
        *:nth-child(3n+3) { color: var(--accent-3); }
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
`;

const MainWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex: 10;
    margin: 2.5rem 1rem 1.5rem 0rem;
    min-height: calc(100vh - 4rem);
    max-width: calc(100vw - 3.5rem);
`;

const ContentFooterDivide = styled.div<{ $extendWidth?: boolean }>`
    ${({ $extendWidth }) => $extendWidth
        ? css`width: min(calc(80vh * 1.66), 100%);`
        : css`max-width: min(calc(80vh * 1.66), 100%);`}

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Icons = styled.div`
    writing-mode: initial;
    display: flex;
    flex-direction: column-reverse;

    a {
        margin-top: 0;
        font-family: 'NerdFontsSymbols Nerd Font';
        rotate: 180deg;
    }
`;

export type SitePageProps = {
    children: ReactNode,
    extendMainWidth?: boolean,
};

export default function SitePage({ children, extendMainWidth }: SitePageProps): JSX.Element {
    return (
        <StrictMode>
            <GlobalStyle />
            <nav>
                <Distortion
                    style={{
                        pointerEvents: 'all',
                        width: '2rem',
                        transform: 'rotate(180deg)',
                        aspectRatio: 1,
                    }}
                    defaultFilter={{
                        baseFrequency: 0.02,
                        scale: 10,
                        disable: true,
                    }}
                    hoverFilter={{
                        animation: 'alternating loop',
                        scale: 15,
                    }}
                >
                    <svg
                        viewBox="0 0 100 75"
                        fill="#00000000"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xlinkHref="http://www.w3.org/1999/xlink"
                        width="100%"
                        height="100%"
                    >
                        <defs>
                            <linearGradient id="cyan" x1="0" y1="1" x2="0.75" y2="0.5">
                                <stop offset="0%" stopColor="var(--accent-2)" />
                                <stop offset="100%" stopColor="#00000000" />
                            </linearGradient>
                            <linearGradient id="yellow" x1="0.5" y1="0" x2="0.5" y2="1">
                                <stop offset="0%" stopColor="var(--accent-1)" />
                                <stop offset="100%" stopColor="#00000000" />
                            </linearGradient>
                            <linearGradient id="magenta" x1="1" y1="1" x2="0.25" y2="0.5">
                                <stop offset="0%" stopColor="var(--accent-3)" />
                                <stop offset="100%" stopColor="#0000" />
                            </linearGradient>
                        </defs>
                        <polygon style={{ mixBlendMode: 'hard-light' }} fill="white" points="0 75, 50 0, 100 75" />
                        <polygon style={{ mixBlendMode: 'hard-light' }} fill="url(#magenta)" points="0 75, 50 0, 100 75" />
                        <polygon style={{ mixBlendMode: 'hard-light' }} fill="url(#yellow)" points="0 75, 50 0, 100 75" />
                        <polygon style={{ mixBlendMode: 'hard-light' }} fill="url(#cyan)" points="0 75, 50 0, 100 75" />
                    </svg>
                </Distortion>
                <div>
                    <DistortionLink href="/">About</DistortionLink>
                    <SampleSelect />
                    <DistortionLink href="/resume">Resume</DistortionLink>
                </div>
                <Icons>
                    <DistortionLink href="https://github.com/cbunt" target="_blank" rel="noreferrer noopener">{'\uf092'}</DistortionLink>
                    <DistortionLink href="https://www.linkedin.com/in/cbunt" target="_blank" rel="noreferrer noopener">{'\udb80\udf3b'}</DistortionLink>
                    <DistortionLink href="mailto:cass@cbunt.ing">{'\udb80\uddee'}</DistortionLink>
                </Icons>
            </nav>
            <MainWrapper>
                <ContentFooterDivide $extendWidth={extendMainWidth}>
                    <main>{children}</main>
                    <footer>MIT © 2024</footer>
                </ContentFooterDivide>
            </MainWrapper>
        </StrictMode>
    );
}
