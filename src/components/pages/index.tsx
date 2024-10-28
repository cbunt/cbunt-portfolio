import SitePage from '../page-elements/page-wrapper';
import { renderApp } from '../../utils/frontend';
import styled from 'styled-components';

import portrait from 'public/portrait.png';
import TweakedMarkdown from '../core/tweaked-markdown';

const StyledMarkdown = styled(TweakedMarkdown)`
    img {
        width: 256px; 
        float: left; 
        margin: 1rem; 
        margin-top: 0; 
        border-radius: 5px;
    }
`;

const content = /* md */`
![Headshot of Cass Bunting, smiling in front of a background of trees](${portrait})

# About the Dev

I'm Cass Bunting, a graphics-programmer,
technical artist, and (now, with this site) web developer based in Vancouver, BC. I'm
excited about real time rendering, developing useful, streamlined technical 
tools for other artists and developers, and creating unique interactive experiences.

My experience includes designing water surfaces through voronoi noise for 
a game about Metis history, creating tools and workflows for Unity, and everything you 
see on this very website. I love to work with stylized graphics, procedural 
generation, and combinations of the two. During my recently-completed 
studies at the University of British Columbia, I honed my skills with and developed
my passion for both low- and high- level programming—from functional languages to 
assembly. I also have significant experience working outside of tech. I worked just 
about every position in restaurants for six years, and in education, particularly
teen leadership building, for four.

Aside from working with graphics, my overwhelmingly numerous hobbies include
playing music, hiking, cooking, reading about history and social theory,
creative writing, and—of course—playing video games.

# About the Site

This website is my effort to present my knowledge and work in a unified way.
It was made from the ground up in Typescript and React, with realtime samples 
created with WebGPU. Its source code can be found at <https://github.com/cbunt/cbunt-portfolio>.
`;

renderApp(
    <SitePage>
        <h1>cbunt.ing, a Portfolio</h1>
        <StyledMarkdown>{content}</StyledMarkdown>
    </SitePage>,
);
