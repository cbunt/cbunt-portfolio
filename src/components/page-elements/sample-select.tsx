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
    margin-bottom: 0.5rem;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;

    span {
        color: var(--accent-3);
        align-self: center;
        font-weight: bold;
        font-style: italic;
        user-select: none;
        padding: 0 0 0.5rem;
        margin: 0 1rem;
    }

    h1 {
        font-style: italic;
        margin-bottom: 0.5rem;
    }
`;

const LinkContainer = styled(Collapse)`
    margin: 0rem;
    transition: 
        height 300ms cubic-bezier(.53,.65,.48,1.12),
        var(--scale-transition);

    width: 100%;
    position: absolute;
    transform-origin: top;
    
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    font-weight: bold;
    font-size: 1.4rem;

    a {
        padding: 0.5rem;
        margin: 0.5rem;
    }
`;

const Separator = styled.div`
    display: block;
    content: '|';
    color: var(--accent-3);
`;

const LinkBackground = styled(DistortionElement).attrs({
    scale: 10,
    baseFrequency: 0.02,
})`
    border-radius: 10px;
    background-color: oklch(from var(--background-color) calc(l * var(--ok-l1)) calc(c * var(--ok-c-factor)) h);
    border: 4px solid var(--secondary-color);
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
`;

export type SampleSelectProps = {
    selected: string,
};

const Link = styled(DistortionLink)`
    &, 
    &:visited {
        color: light-dark(var(--accent-3), var(--accent-1));
    }
`;

const sampleNames = SAMPLES__.map((sample) => sample.replaceAll('-', ' '));

export default function SampleSelect({
    selected,
}: SampleSelectProps) {
    const [linksOpen, setLinksOpen] = useState(false);
    const items = useMemo(() => sampleNames.flatMap((sample, i) =>
        sample.toLowerCase() === selected.toLowerCase()
            ? []
            : [
                <Link key={`${i}_link`} href={`/samples/${SAMPLES__[i]}`}>{sample}</Link>,
                <Separator key={`${i}_sep`} />,
                ],
    ).slice(0, -1), []);

    return (
        <Container onMouseLeave={() => { setLinksOpen(false); }}>
            <Header>
                <h1>{selected}</h1>
                <span
                    onMouseEnter={() => { setLinksOpen(true); }}
                    onKeyDown={() => { setLinksOpen(true); }}
                    tabIndex={0}
                >
                    {SAMPLES__.length > 1 ? 'See Others' : ''}
                </span>
            </Header>
            <div style={{ position: 'relative', width: '100%', height: 0, overflow: 'visible', zIndex: 5 }}>
                <LinkContainer isOpen={linksOpen}>
                    <LinkBackground />
                    {...items}
                </LinkContainer>
            </div>
        </Container>
    );
}
