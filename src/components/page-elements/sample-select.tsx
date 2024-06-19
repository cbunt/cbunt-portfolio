import styled from 'styled-components';
import { Collapse } from '@kunukn/react-collapse';
import { useState } from 'react';

const Container = styled.div<{ $isOpen?: boolean }>`
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: solid 3px var(--accent-3);

    > * {
        padding: 0 0 1rem;
        margin: 0 1rem;
    }

    span {
        color: var(--accent-2);
        align-self: center;
        font-weight: bold;
        font-style: italic;
        user-select: none;
    }

    h1 {
        font-style: italic;
    }
`;

const LinkContainer = styled(Collapse)`
    margin: 0rem;
    transition: 
        height 300ms cubic-bezier(.53,.65,.48,1.12),
        var(--scale-transition);

    width: 100%;
    
    > div {
        margin-top: 1rem;
        margin-bottom: 1rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        font-weight: bold;
        font-size: 1.4rem;
        border-bottom: solid 3px var(--accent-3);
    }

    a {
        color: var(--hi-vis-color);
        padding: 0 1rem 1rem;
        text-decoration: none;
    }
`;

const Seperator = styled.div`
    &:not(:last-of-type)::after {
        display: block;
        content: '|';
        color: var(--accent-3);
    }

    &:last-of-type{
        display: none;
    }
`;

export type SampleSelectProps = {
    selected: string,
};

const sampleNames = SAMPLES__.map((sample) => sample.replaceAll('-', ' '));

export default function SampleSelect({
    selected,
}: SampleSelectProps) {
    const [linksOpen, setLinksOpen] = useState(false);

    return (
        <Container onMouseLeave={() => { setLinksOpen(false); }}>
            <Header>
                <h1>{selected}</h1>
                <span
                    onMouseEnter={() => { setLinksOpen(true); }}
                    onKeyDown={() => { setLinksOpen(true); }}
                    tabIndex={0}
                >
                    {sampleNames.length > 1 ? 'See Others' : ''}
                </span>
            </Header>
            <LinkContainer isOpen={linksOpen}>
                <div>
                    {...sampleNames.flatMap((sample, i) => sample.toLowerCase() === selected.toLowerCase()
                        ? []
                        : (
                            <>
                                <a href={`/samples/${SAMPLES__[i]}`}>{sample}</a>
                                <Seperator />
                            </>
                            ))}
                </div>
            </LinkContainer>
        </Container>
    );
}
