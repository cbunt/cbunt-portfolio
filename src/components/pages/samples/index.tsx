import styled from 'styled-components';

import SitePage from '../../page-elements/page-wrapper';
import DistortionLink from '../../core/link';
import { renderApp } from '../../../utils/frontend';

// inject one-off cursive font into header
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Playwrite+NL:wght@100..400&display=swap';
document.head.appendChild(fontLink);

const sampleNames = SAMPLES__.map((sample) => sample.replaceAll('-', ' '));

const Container = styled.div`
    display: flex;
    flex-direction: column;

    > div {
        display: flex;
    }
    span {
        font-style: italic;
        text-align: justify;
        flex-grow: 1;
        width: 0;
        padding: 0 1rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid currentColor;
    }
    
    h1 {
        margin: 0;
        margin: -0.5rem 0;
        font-family: 'Playwrite NL';
    }

    a {
        font-size: 1.25rem;
        font-family: 'Playwrite NL';
        text-decoration: none;
        text-transform: capitalize;
        word-spacing: 0.5rem;
        
        margin-top: 1rem;
        align-self: center;
        color: var(--accent-2) !important;
    }
`;

renderApp(
    <SitePage>
        <Container>
            <h1>Selected Works</h1>
            <div><span>Written for modern browsers in WebGPU and Typescript.</span></div>
        {...sampleNames.map((sample, i) =>
            <DistortionLink key={sample} href={`/samples/${SAMPLES__[i]}`}>{sample}</DistortionLink>,
        )}
        </Container>
    </SitePage>,
);
