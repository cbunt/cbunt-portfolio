import styled from 'styled-components';

import { renderApp } from '../../utils/frontend';
import FencedMarkdown from '../core/fenced-markdown';
import SitePage from '../page-elements/page-wrapper';
import { Fragment } from 'react/jsx-runtime';

const IconList = styled.dl`
    display: flex;
    flex-wrap: wrap;

    column-gap: 1rem;
    row-gap: 1rem;
    margin: 0.5rem 0;
    padding: 1rem 1rem;

    background-color: oklch(from var(--background-color) calc(l * var(--ok-l1)) calc(c * var(--ok-c-factor)) h);
    border-radius: 5px;

    &:is(:nth-of-type(1)) dt {
        color: var(--accent-2);
    }

    &:is(:nth-of-type(2)) dt {
        color: var(--accent-3);
    }

    &:is(:nth-of-type(3)) dt {
        color: var(--accent-1);
    }

    dd, dt {
        margin: 0 1rem;
        display: block;
        align-content: center;
        font-weight: bold;
    }

    dt {
        font-style: italic;
    }

    i {
        font-weight: normal;
        margin-right: 0.5rem;
        font-size: 1.5rem;
        font-style: normal;
        font-family: 'NerdFontsSymbols Nerd Font';
    }

    .margin-less {
        margin-right: 0rem;
    }
`;

const content = /* md */`
# Cass Bunting's Resume

\`\`\`\`\`article
\`\`\`\`div style="display: grid; gridTemplateColumns: 1fr 1fr"
\`\`\`div
## Education
*University of British Columbia*   
Bachelors of Arts, Majoring in Computer Science  
Graduated May 2024

*Digital Media Practicum*  
Offered through the University of British Columbia and the Center for Digital Media  
January through April 2023   

*Notable Courses*  
[Compiler Construction](https://www.students.cs.ubc.ca/~cs-411/2022w2/)  
[Parallel Computation](https://vancouver.calendar.ubc.ca/course-descriptions/courses/cpscv-418-parallel-computation)  
[Human Computer Interaction](https://www.students.cs.ubc.ca/~cs-344/current-term/)
\`\`\`

\`\`\`div
## Work
*Edmonds Unitarian Universalist Congregation*  
Children and Youth Program Coordinator  
2016 - 2020  

*Various Restaurants*  
Server, Cook, Dishwasher, Light admin work   
2014 - 2020  
\`\`\`
\`\`\`\`

## Skills

\`\`\`IconList overrides={{ "ul": "Fragment", "li": "dd", "p": "dt" }} 
Proficient
- WebGPU
- HLSL
- <i>\udb81\udeaf</i>Unity
- <i class-name="margin-less">\udb80\udf1b</i>
- <i>\ued46</i>React
- <i>\udb81\udee6</i>Typescript
- <i>\ue749</i>CSS
- <i>\udb81\udf2b</i>Webpack
- <i>\ued0d</i>Node
- <i>\uf21f</i>Docker
\`\`\`

\`\`\`IconList overrides={{ "ul": "Fragment", "li": "dd", "p": "dt" }} 
Familiar
- <i>\udb82\uddb1</i>Unreal
- <i class-name="margin-less">\ue61e</i>
- <i class-name="margin-less">\ue61d</i>
- CUDA
- <i>\ue777</i>Haskell
- Racket
- <i>\ue73c</i>Python
\`\`\`

\`\`\`IconList overrides={{ "ul": "Fragment", "li": "dd", "p": "dt" }} 
Non-Tech Skills
- Color Design
- Writing—Technical, Professional, and Creative
\`\`\`
\`\`\`\`\`
`;

renderApp(
    <SitePage>
        <FencedMarkdown tags={{ IconList, Fragment }}>
            {content}
        </FencedMarkdown>
    </SitePage>,
);
