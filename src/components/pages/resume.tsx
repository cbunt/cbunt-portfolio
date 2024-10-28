import styled from 'styled-components';

import { renderApp } from '../../utils/frontend';
import SitePage from '../page-elements/page-wrapper';

import TweakedMarkdown from '../core/tweaked-markdown';

const MarkdownStyle = styled(TweakedMarkdown)`
    columns: 2;

    * {
        break-before: avoid;
        break-inside: avoid;
    }

    h2 {
        break-before: auto;
    }

    a {
        text-decoration: none;
    }

    h3 {
        margin-bottom: 0;
        font-size: medium;
        font-weight: bold;
    }

    p {
        text-justify: auto;
        margin-left: 0;
    }

    ul {
        margin-left: 1rem;
        padding: 0;
        list-style-type: none;
        list-style-position: outside;
        line-height: 1.5rem;
        margin-top: 0.25rem;

        li:not(:first-child) {
            margin-top: 0.25rem;
        }
    }

    ol {
        display: flex;
        flex-wrap: wrap;

        column-gap: 1rem;
        row-gap: 1rem;
        margin: 0.5rem 0;
        padding: 1rem 0;
        line-height: normal;

        li {
            padding: 0;
            margin: 0 1rem;
            align-content: center;
            font-weight: bold;
            display: block;
            
            &:not(:first-child) {
                margin-top: 0;
            }
        }

        i {
            font-weight: normal;
            padding: 0;
            margin: 0;
            margin-right: 0.25rem;
            font-style: normal;
            font-family: 'NerdFontsSymbols Nerd Font';
        }
    }
`;

const content = /* md */`
# Education
## University of British Columbia  
Bachelors of Arts, Majoring in Computer Science  
Graduated May 2024

## Notable Courses  
- [**Digital Media Practicum**](https://www.students.cs.ubc.ca/~cs-344/current-term/)  
Served as programmer and technical artist to
develop a Unity game MVP for external client
Hammer & Tong. Contributed to research and
planning, and created gameplay infrastructure,
graphical shaders, and tools for artists and designers.  
- [**Compiler Construction**](https://www.students.cs.ubc.ca/~cs-411/2022w2/)  
- [**Parallel Computation**](https://vancouver.calendar.ubc.ca/course-descriptions/courses/cpscv-418-parallel-computation)  
- [**Human Computer Interaction**](https://www.students.cs.ubc.ca/~cs-344/current-term/)
- **Creative Writing for Video Games**


# Work
## Edmonds Unitarian Universalist Congregation
Youth Program Coordinator  
Supported youth programming, managed teachers and volunteers,
ordered and organized supplies, lead activities, wrote weekly
newsletters, and developed  goals, approach, and policy.  
2016 - 2020

## Education Roles
Instructor and Program Coordinator  
Collaboratively developed and facilitated teen leadership training.

- *YMCA Camp Orkila*, 2018
- *Goldmine Youth Leadership School*, 2014, 2016, 2017

## Various Restaurants and Bars
- *Bánh Town*, Server, Seattle, 2018 - 2019
- *Percy's & Co*, Server, Seattle, 2017 - 2018
- *Giddy Up Burgers*, Server & Cook, Seattle, 2016 - 2017
- *Miho Izakaya*, Dishwasher, Portland, 2015 - 2016


# Projects
## [Portfolio Site, cbunt.ing](https://github.com/cbunt/cbunt-portfolio)  
Personal portfolio developed with React, Webpack, and Typescript, with interactive WebGPU samples.

## [Cubemap Gaussian Blur](https://github.com/cbunt/cbunt-portfolio/blob/main/src/samples/cubemap-blur/cubemap-guassian-pyramid.ts)  
Algorithm and implementation for perceptually even Gaussian blurring of cubemaps.

## [WebGPU glTF Viewer](https://cbunt.ing/samples/gltf-viewer/)  
From-scratch WebGPU 3D renderer and model viewer.

## [Voronoi Water Shader](https://github.com/cbunt/unity-voronoi-water)
Stylized procedural water shader made in Unity using 4D voronoi noise and flowmaps.

# Skills
## Proficient
1. HLSL
1. ~f06af~ Unity
1. ~e648~ C Sharp
1. WebGPU
1. ~f06e6~ Typescript
1. ~f0708~ React
1. ~e749~ CSS
1. ~ed0d~ Node
1. ~f072b~ Webpack
1. ~f21f~ Docker
1. ~ebc6~ Linux

## Familiar
1. ~f09b1~ Unreal
1. ~e61e~ C
1. ~e61d~ C++
1. CUDA
1. ~e73c~ Python
1. Vulkan
1. ~e777~ Haskell

## Non-Tech Skills
1. Color Design
1. Public Speaking
1. Guitar
1. Songwriting
1. Typesetting
1. Writing—Technical, Professional, and Creative
`;

renderApp(
    <SitePage>
        <h1>Cass Bunting&apos;s Résumé</h1>
        <MarkdownStyle components={{
            del: ({ children }) => (typeof children === 'string' ? (<i>{String.fromCodePoint(parseInt(children, 16))}</i>) : undefined),
        }}
        >
            {content}
        </MarkdownStyle>
    </SitePage>,
);
