import styled from 'styled-components';
import { Collapse } from '@kunukn/react-collapse';
import { useState, useMemo } from 'react';
import Distortion from 'react-distortion';
import { DistortBackground } from 'react-distortion/child-elements';
import DistortionLink from '../core/link';

const sampleNames = SAMPLES__.map((sample) => sample.replaceAll('-', ' '));

const Container = styled.div<{ $isOpen?: boolean }>`
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
    position: relative;
    overflow: visible;
    z-index: 10;
`;

const LinkContainer = styled(Distortion).attrs({
    forwardedAs: Collapse,
    defaultFilter: {
        disable: true,
        scale: 10,
        baseFrequency: 0.02,
    },
    distortChildren: DistortBackground,
})`
    transition: height 300ms ease-out; // cubic-bezier(.53,.65,.48,1.12);

    position: fixed;
    transform-origin: top;
    height: 100vh;
    bottom: 0;
    right: 80%;
    
    display: flex;
    justify-content: space-evenly;

    font-weight: bold;
    font-size: 1.4rem;

    a {
        padding: 0.5rem;
        margin: 0.5rem;
        white-space: nowrap;
        color: var(--accent-1);
    }

    div {
        background-color: oklch(from var(--background-color) calc(l * var(--ok-l1)) calc(c * var(--ok-c-factor)) h);
    }
`;

const Button = styled(DistortionLink).attrs({
    forwardedAs: 'button',
})`
    text-transform: uppercase;
    border: none;
    background: none;
    padding: 0;

    color: inherit !important;

    font: inherit;
    cursor: pointer;
`;

const Link = styled(DistortionLink)`
    text-transform: uppercase;
    max-width: 100%;
    overflow: hidden;

    &, &:visited {
        color: light-dark(var(--accent-3), var(--accent-1));
    }
`;

export default function SampleSelect() {
    const [linksOpen, setLinksOpen] = useState(false);
    const [locked, setLocked] = useState(false);

    const items = useMemo(() => sampleNames.map((sample, i) =>
        <Link key={i} href={`/samples/${SAMPLES__[i]}`}>{sample}</Link>,
    ), []);

    return (
        <Container onMouseLeave={() => { setLinksOpen(locked); }}>
            <Button
                onMouseDown={() => {
                    setLocked((prev) => !prev);
                    setLinksOpen(!locked || linksOpen);
                }}
                onMouseEnter={() => { setLinksOpen(true); }}
                onKeyDown={() => {
                    setLocked((prev) => !prev);
                    setLinksOpen(!locked);
                }}
            >
                Samples
            </Button>
            <LinkContainer isOpen={linksOpen} collapseHeight="0px">
                    {...items}
            </LinkContainer>
        </Container>
    );
}
