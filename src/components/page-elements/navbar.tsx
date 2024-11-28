import styled from 'styled-components';

import Distortion from 'react-distortion';
import DistortionLink from '../core/link';
import SampleSelect from './sample-select';

const Nav = styled.aside`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;

    
    grid-row: span 2;
    align-self: start;
    position: sticky;
    top: 0;

    z-index: 10;
    height: 100vh;
    box-sizing: border-box;
    padding: 2.5rem 0;
    
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 550;

    writing-mode: vertical-lr;
    transform: rotate(180deg);

    nav {
        display: flex;
        flex-direction: row-reverse;
    }

    a {
        font-stretch: 125%;
    }

    *:nth-child(3n+1) { color: var(--accent-1); }
    *:nth-child(3n+2) { color: var(--accent-2); }
    *:nth-child(3n+3) { color: var(--accent-3); }
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

export default function NavBar() {
    return (
        <Nav>
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
            <nav>
                <DistortionLink href="/">About</DistortionLink>
                <SampleSelect />
                <DistortionLink href="/resume">Resume</DistortionLink>
            </nav>
            <Icons>
                <DistortionLink href="https://github.com/cbunt" target="_blank" rel="noreferrer noopener">{'\uf092'}</DistortionLink>
                <DistortionLink href="https://www.linkedin.com/in/cbunt" target="_blank" rel="noreferrer noopener">{'\udb80\udf3b'}</DistortionLink>
                <DistortionLink href="mailto:cass@cbunt.ing">{'\udb80\uddee'}</DistortionLink>
            </Icons>
        </Nav>
    );
}
