import SitePage from '../page-elements/page-wrapper';
import { renderApp } from '../../utils/frontend';
import FencedMarkdown from '../core/fenced-markdown';
import CustomTooltip, { StyledTooltip } from '../core/tooltip';
import styled from 'styled-components';

import portrait from 'public/portrait.png';

const ExtraStyledTooltip = styled(StyledTooltip)`
    font-size: 1.5rem;
    width: max-content;
    max-width: unset;
    color: var(--hi-vis-gray);
    font-stretch: 125%;
    font-weight: bold;
    padding: 1rem;
`;

const Hover = styled(CustomTooltip).attrs({
    forwardedTooltipAs: ExtraStyledTooltip,
})`
    color: var(--accent-1);
    cursor: help;
`;

const content = /* md */`
# Welcome to <Hover tooltipContent="cass bunting's">my</Hover> Portfolio Website

\`\`\`article
<img src="${portrait}" width="256" style="float: left; margin: 1rem; margin-top: 0; border-radius: 5px;" />

## About the Site

This website is my effort to collect what I've worked on so far in one place.
It was created from the ground up in react and styled-components. A few
I'm still adding new projects and linking old projects that currently live in
other places, so the site will change.


## About <Hover tooltipContent="cass bunting">Me</Hover>

I'm <Hover tooltipContent="me">Cass Bunting</Hover>, a graphics-programmer,
technical artist, and (now, with this site) web developer in Vancouver, BC. I'm
excited about real time rendering, developing useful, streamlined technical 
tools for other artists and developers, and creating unique interactive experiences.

My experience includes designing water surfaces through voronoi noise for 
a game about Metis history, creating tools and workflows for Unity, and everything you 
see on this very website. I love to work with stylized graphics, procedural 
generation, and especially combinations of the two. During my recently-completed 
studies at the University of British Columbia, I honed my skills with and developed
my passion for both low- and high- level programming—from functional languages to 
assembly. I also have significant experience working outside of tech. I worked just 
about every position in restaurants for six years, and in education, particularly
teen leadership building, for four.

Aside from working with graphics, my overwhelmingly numerous hobbies include
playing music, hiking, cooking, reading about history and social theory,
creative writing, and—of course—playing video games.

\`\`\`
`;

renderApp(
    <SitePage>
        <FencedMarkdown options={{ overrides: { Hover } }}>
            {content}
        </FencedMarkdown>
    </SitePage>,
);
