import styled from 'styled-components';

import { renderApp } from '../../utils/frontend';
import FencedMarkdown from '../core/fenced-markdown';
import SitePage from '../page-elements/page-wrapper';
import { ReactNode } from 'react';

const MarkdownStyle = styled(FencedMarkdown)`
    columns: 2 25rem;

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

    dl {
        display: flex;
        flex-wrap: wrap;

        column-gap: 1rem;
        row-gap: 1rem;
        margin: 0.5rem 0;
        padding: 1rem 0;

        dd, dt {
            margin: 0 1rem;
            display: block;
            align-content: center;
            font-weight: bold;
        }

        dt {
            font-style: bold;


        }

        i {
            font-weight: normal;
            margin-right: 0.5rem;
            font-style: normal;
            font-family: 'NerdFontsSymbols Nerd Font';
        }

        .margin-less {
            margin-right: 0rem;
        }
    }
`;

const content = /* md */`

## Education
### University of British Columbia  
Bachelors of Arts, Majoring in Computer Science  
Graduated May 2024

### Notable Courses  
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


## Work
### Edmonds Unitarian Universalist Congregation
Youth Program Coordinator  
Supported youth programming, managed teachers and volunteers,
ordered and organized supplies, lead activities, wrote weekly
newsletters, and developed  goals, approach, and policy.  
2016 - 2020

### Education Roles
Instructor and Program Coordinator  
Collaboratively developed and facilitated teen leadership training.

- *YMCA Camp Orkila*, 2018
- *Goldmine Youth Leadership School*, 2014, 2016, 2017

### Various Restaurants and Bars
- *Bánh Town*, Server, Seattle, 2018 - 2019
- *Percy's & Co*, Server, Seattle, 2017 - 2018
- *Giddy Up Burgers*, Server & Cook, Seattle, 2016 - 2017
- *Miho Izakaya*, Dishwasher, Portland, 2015 - 2016



## Projects
### [Portfolio Site, cbunt.ing](https://github.com/cbunt/cbunt-portfolio)  
Personal portfolio developed with React, Webpack, and Typescript, with interactive WebGPU samples.

### [Cubemap Gaussian Blur](https://github.com/cbunt/cbunt-portfolio/blob/main/src/samples/cubemap-blur/cubemap-guassian-pyramid.ts)  
Algorithm and implementation for perceptually even Gaussian blurring of cubemaps.

### [WebGPU glTF Viewer](https://cbunt.ing/samples/gltf-viewer/)  
From-scratch WebGPU 3D renderer and model viewer.

### [Voronoi Water Shader](https://github.com/cbunt/unity-voronoi-water)
Stylized procedural water shader made in Unity using 4D voronoi noise and flowmaps.


## Skills
### Proficient
\`\`\`dl overrides={{ "ul": "Fragment", "li": "dd", "p": "dt" }} 
- HLSL
- <i>\udb81\udeaf</i>Unity
- <i class-name="margin-less">\udb80\udf1b</i> C Sharp
- WebGPU
- <i>\udb81\udee6</i>Typescript
- <i>\ued46</i>React
- <i>\ue749</i>CSS
- <i>\ued0d</i>Node
- <i>\udb81\udf2b</i>Webpack
- <i>\uf21f</i>Docker
- <i>\uebc6</i>Linux
\`\`\`

### Familiar
\`\`\`dl overrides={{ "ul": "Fragment", "li": "dd", "p": "dt" }} 
- <i>\udb82\uddb1</i>Unreal
- <i class-name="margin-less">\ue61e</i> C
- <i class-name="margin-less">\ue61d</i> C++
- <i>\ue73c</i>Python
- Vulkan
- CUDA
- <i>\ue777</i> Haskell
\`\`\`

### Non-Tech Skills
\`\`\`dl overrides={{ "ul": "Fragment", "li": "dd", "p": "dt" }} 
- Color Design
- Public Speaking
- Guitar
- Songwriting
- Typesetting
- Writing—Technical, Professional, and Creative
\`\`\`
`;

renderApp(
    <SitePage>
        <h1>Cass Bunting&apos;s Résumé</h1>
        <MarkdownStyle tags={{ Fragment: ({ children }: { children?: ReactNode }) => <>{children}</> }} options={{ wrapper: 'article' }}>
            {content}
        </MarkdownStyle>
    </SitePage>,
);
