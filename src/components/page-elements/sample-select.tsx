import styled from 'styled-components';
import { Collapse } from '@kunukn/react-collapse';
import { useMemo, useState } from 'react';
import DistortionElement from '../core/distortion-element';
import DistortionLink from '../core/link';

const Container = styled.div<{ $isOpen?: boolean }>`
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
    position: relative;
    overflow: visible;
    z-index: 10;

    color: inherit;
`;

const LinkContainer = styled(Collapse)`
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
`;

const LinkBackground = styled(DistortionElement).attrs({
    scale: 10,
    baseFrequency: 0.02,
})`
    background-color: oklch(from var(--background-color) calc(l * var(--ok-l1)) calc(c * var(--ok-c-factor)) h);
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
`;

export type SampleSelectProps = {
    selected: string,
};

const Button = styled(DistortionLink).attrs({
    forwardedAs: 'button',
})`
    text-transform: uppercase;
    border: none;
    background: none;
    padding: 0;
    
    color: inherit;
    font: inherit;
    cursor: pointer;
`;

const Link = styled(DistortionLink)`
    text-transform: uppercase;
    max-width: 100%;
    overflow: hidden;

    &, 
    &:visited {
        color: light-dark(var(--accent-3), var(--accent-1));
    }
`;

const sampleNames = SAMPLES__.map((sample) => sample.replaceAll('-', ' '));

export default function SampleSelect() {
    const [linksOpen, setLinksOpen] = useState(false);
    const [locked, setLocked] = useState(false);

    const items = useMemo(() => sampleNames.map((sample, i) =>
        <Link key={i} href={`/samples/${SAMPLES__[i]}`}>{sample}</Link>,
    ), []);

    return (
        <Container onMouseLeave={() => { setLinksOpen(locked); }}>
            <Button
                style={{ color: 'inherit' }}
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
                <LinkBackground />
            </LinkContainer>
        </Container>
    );

    // return (
    //     <Container onMouseLeave={() => { setLinksOpen(false); }}>
    //         <Header>
    //             <h1>{selected}</h1>
    //             <span
    //                 onMouseEnter={() => { setLinksOpen(true); }}
    //                 onKeyDown={() => { setLinksOpen(true); }}
    //                 tabIndex={0}
    //             >
    //                 {SAMPLES__.length > 1 ? 'See Others' : ''}
    //             </span>
    //         </Header>
    //         <div style={{ position: 'relative', width: '100%', height: 0, overflow: 'visible', zIndex: 5 }}>
    //             <LinkContainer isOpen={linksOpen}>
    //                 <LinkBackground />
    //                 {...items}
    //             </LinkContainer>
    //         </div>
    //     </Container>
    // );
}
