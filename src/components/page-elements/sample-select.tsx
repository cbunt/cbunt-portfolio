import styled from 'styled-components';
import { useState, useMemo } from 'react';
import Distortion from 'react-distortion';
import { DistortBackground } from 'react-distortion/child-elements';
import DistortionLink from '../core/link';

const sampleNames = SAMPLES__.map((sample) => sample.replaceAll('-', ' '));

const Container = styled.div<{ $isOpen?: boolean }>`
    display: flex;
    flex-direction: column;
`;

const LinkContainer = styled(Distortion).attrs<{ $isOpen: boolean }>({
    defaultFilter: {
        disable: true,
        scale: 10,
        baseFrequency: 0.02,
    },
    distortChildren: DistortBackground,
})`
    transition: height 300ms ease-out;
    display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
    
    width: 100vh;
    justify-content: space-evenly;
    
    transform: rotate(90deg);
    writing-mode: initial;
    position: absolute;
    top: 0;
    transform-origin: top left;
    
    font-weight: bold;
    font-size: 1.4rem;

    a {
        padding: 0.5rem;
        margin: 0.5rem;
        white-space: nowrap;
        color: var(--accent-1);
    }

    div {
        background-color: var(--secondary-color);
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
    display: flex;
    text-transform: uppercase;
    max-width: 100%;
    overflow: hidden;

    &, &:visited {
        color: light-dark(var(--accent-3), var(--accent-1)) !important;
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
            <LinkContainer $isOpen={linksOpen}>
                {...items}
            </LinkContainer>
        </Container>
    );
}
