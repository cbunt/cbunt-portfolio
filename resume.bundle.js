/*! For license information see: https://cbunt.ing/oss-licenses.json */
(()=>{"use strict";var e,r={6807:(e,r,n)=>{var t=n(6070),o=n(2620),i=n(9576);var a=n(758),l=n(4008);const s=(0,o.Ay)(l.A).attrs({forwardedAs:"a",defaultFilter:{disable:!0},activeFilter:{scale:7},hoverFilter:{animation:"alternating loop",scale:7}})`
    transform-origin: center;
    text-decoration: none;
    margin: 1rem 1rem;
    text-shadow: transparent 0px 0px 5px;

    transition: 
        text-shadow 0.5s cubic-bezier(.51,-0.33,.74,.78), 
        var(--scale-transition);

    &:hover {
        transform: scale(1.025);
        text-shadow: currentcolor 0px 0px 5px;
        transition: 
            var(--scale-transition), 
            text-shadow 0.2s ease-out;
    }

    &:active {
        transform: scale(0.975);
    }
`;var c=n(4977);var d="child-elements-module_border__O5L1W",h="child-elements-module_background__QpTHi";!function(e,r){void 0===r&&(r={});var n=r.insertAt;if("undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===n&&t.firstChild?t.insertBefore(o,t.firstChild):t.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}(".child-elements-module_border__O5L1W {\n    position: absolute;\n    z-index: 1;\n    pointer-events: none;\n    box-sizing: border-box;\n\n    width: calc(100% + var(--border-width, 0px));\n    height: calc(100% + var(--border-width, 0px));\n    top: calc(-0.5 * var(--border-width, 0px));\n    left: calc(-0.5 * var(--border-width, 0px));\n\n    border: solid;\n    background-color: #0000;\n    border-radius: inherit;\n    border-width: var(--border-width, inherit);\n    border-color: var(--border-color, currentcolor);\n}\n\n.child-elements-module_background__QpTHi {\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n\n    border-radius: inherit;\n    background-color: var(--background-color, inherit);\n}");const p=(0,t.jsx)("div",{className:h}),m=((0,t.jsx)("div",{className:d}),["cubemap-blur","gltf-viewer"].map((e=>e.replaceAll("-"," ")))),u=o.Ay.div`
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
    position: relative;
    overflow: visible;
    z-index: 10;
`,f=(0,o.Ay)(l.A).attrs({forwardedAs:c.S,defaultFilter:{disable:!0,scale:10,baseFrequency:.02},distortChildren:p})`
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
`,g=(0,o.Ay)(s).attrs({forwardedAs:"button"})`
    text-transform: uppercase;
    border: none;
    background: none;
    padding: 0;

    color: inherit !important;

    font: inherit;
    cursor: pointer;
`,b=(0,o.Ay)(s)`
    text-transform: uppercase;
    max-width: 100%;
    overflow: hidden;

    &, &:visited {
        color: light-dark(var(--accent-3), var(--accent-1));
    }
`;function v(){const[e,r]=(0,a.useState)(!1),[n,o]=(0,a.useState)(!1),i=(0,a.useMemo)((()=>m.map(((e,r)=>(0,t.jsx)(b,{href:`/samples/${["cubemap-blur","gltf-viewer"][r]}`,children:e},r)))),[]);return(0,t.jsxs)(u,{onMouseLeave:()=>{r(n)},children:[(0,t.jsx)(g,{onMouseDown:()=>{o((e=>!e)),r(!n||e)},onMouseEnter:()=>{r(!0)},onKeyDown:()=>{o((e=>!e)),r(!n)},children:"Samples"}),(0,t.jsxs)(f,{isOpen:e,collapseHeight:"0px",children:[...i]})]})}const x=o.DU`
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;

        &:hover {
            transform: scale(10);
            filter: brightness(1.2);
        }
    }

    ::-webkit-scrollbar-corner,
    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        border: 2px solid transparent;
        background-clip: padding-box;

        background: var(--secondary-color);
        border-radius: 5px;

        &:hover {
            background: #555;
            border: 0;
        }
    }

    body {
        --scale-bezier: cubic-bezier(0.81, 0, 0.37, 3.69);
        --scale-transition: transform 0.2s cubic-bezier(0.81, 0, 0.37, 3.69);

        --ok-l1: 1.5;
        --ok-l2: 0.6;
        --ok-l3: 75%;
        --ok-c-factor: 1.5;
        
        --secondary-color: #415153;
        --background-color: #0A102E;
        --hi-vis-color: #DBE4FF;
        
        --accent-1: #18F7F7;
        --accent-2: #FF61FF;
        --accent-3: #FFFF16;
        
        @media (prefers-color-scheme: light) {
            --ok-l1: 0.95;
            --ok-l2: 1.3;
            --ok-l3: 50%;
            --ok-c-factor: 1.4;
            
            --background-color: #FEF6C7;
            --hi-vis-color: #0c007d;
            --secondary-color: #d6d6d6;
            
            --accent-1: #D61500;
            --accent-2: #2F8000;
            --accent-3: #034cdf;
        }

        code {
            font-family: 'Space Mono', monospace;
            color: var(--hi-vis-gray);
            background-color: var(--secondary-color);
            padding: 0 0.3rem;
            border-radius: 5px;
        }
        
        // fallback while firefox is bugged
        --hi-vis-gray: var(--hi-vis-color);
        
        @supports (color: oklch(from white l c h)) {
            --hi-vis-gray: oklch(from var(--hi-vis-color) l 0 h);
        }
            
        background-color: var(--background-color);
        color: var(--hi-vis-color);
        margin: 0;
    }

    #root {
        display: flex;
        font-family: "Asap", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    :root {
        color-scheme: dark light;
    }

    h1 {
        font-stretch: 125%;
    }

    h1,
    h2 {
        margin: 0 0 1rem;
    }

    footer {
        font-size: small;
        text-align: center;
        margin: 2rem 0 0;
        font-weight: 200;
    }

    a {
        color: light-dark(var(--accent-3), var(--accent-1));
       
        &:visited {
            color: var(--accent-2);
        }
    }

    nav {
        z-index: 10;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        position: sticky;
        top: 0;
        align-items: center;

        text-transform: uppercase;
        max-height: calc(100% - 5rem);
        padding: 2.5rem 0;

        font-size: 1.5rem;
        font-weight: 550;
        flex: 1 1;
        max-width: 6rem;

        writing-mode: vertical-lr;
        transform: rotate(180deg);

        div {
            display: flex;
            flex-direction: row-reverse;
        }

        a {
            font-stretch: 125%;
        }

        *:nth-child(3n+1) {
            color: var(--accent-1);
        }

        *:nth-child(3n+2) {  
            color: var(--accent-2);
        }
        
        *:nth-child(3n+3) {  
            color: var(--accent-3);
        }
    }

    p {
        max-width: calc(100% - 1rem);
        line-height: 1.75em;
        margin-block-start: 0;
        margin-inline: 1rem;
    }

    article {
        margin: 1.75rem 0;
    }
`,y=o.Ay.div`
    display: flex;
    justify-content: center;
    flex: 10;
    margin: 2.5rem 1rem 1.5rem 0rem;
    min-height: calc(100vh - 4rem);
`,w=o.Ay.div`
    ${({$extendWidth:e})=>e?o.AH`width: min(calc(80vh * 1.66), 100%);`:o.AH`max-width: min(calc(80vh * 1.66), 100%);`}

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`,k=(0,o.Ay)(s)`
    margin-top: 0;
    font-family: 'NerdFontsSymbols Nerd Font';
    rotate: 180deg;
`;var j=n(9683),C=n(9970);const S=(0,o.Ay)((function({components:e,children:r,remarkPlugins:n,...o}){return(0,t.jsx)(j.o,{components:{h1:"h2",h2:"h3",...e},remarkPlugins:[C.A,...n??[]],...o,children:r})}))`
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
`;!function(e,r="root"){const n=document.getElementById(r);if(null==n)throw new Error("Could not find root element");(0,i.H)(n).render(e)}((0,t.jsxs)((function({children:e,extendMainWidth:r}){return(0,t.jsxs)(a.StrictMode,{children:[(0,t.jsx)(x,{}),(0,t.jsxs)("nav",{children:[(0,t.jsx)(l.A,{style:{pointerEvents:"all",width:"2rem",transform:"rotate(180deg)",aspectRatio:1},defaultFilter:{baseFrequency:.02,scale:10,disable:!0},hoverFilter:{animation:"alternating loop",scale:15},children:(0,t.jsxs)("svg",{viewBox:"0 0 100 75",fill:"#0000",xmlns:"http://www.w3.org/2000/svg",version:"1.1",xlinkHref:"http://www.w3.org/1999/xlink",children:[(0,t.jsxs)("defs",{children:[(0,t.jsxs)("linearGradient",{id:"cyan",x1:"0",y1:"1",x2:"0.75",y2:"0.5",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"var(--accent-2)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#0000"})]}),(0,t.jsxs)("linearGradient",{id:"yellow",x1:"0.5",y1:"0",x2:"0.5",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"var(--accent-1)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#0000"})]}),(0,t.jsxs)("linearGradient",{id:"magenta",x1:"1",y1:"1",x2:"0.25",y2:"0.5",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"var(--accent-3)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#0000"})]})]}),(0,t.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"white",points:"0 75, 50 0, 100 75"}),(0,t.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#magenta)",points:"0 75, 50 0, 100 75"}),(0,t.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#yellow)",points:"0 75, 50 0, 100 75"}),(0,t.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#cyan)",points:"0 75, 50 0, 100 75"})]})}),(0,t.jsxs)("div",{children:[(0,t.jsx)(s,{href:"/",children:"About"}),(0,t.jsx)(v,{}),(0,t.jsx)(s,{href:"/resume",children:"Resume"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)(k,{href:"https://github.com/cbunt",target:"_blank",rel:"noreferrer noopener",children:""}),(0,t.jsx)(k,{href:"https://www.linkedin.com/in/cbunt",target:"_blank",rel:"noreferrer noopener",children:"󰌻"}),(0,t.jsx)(k,{href:"mailto:cass@cbunt.ing",children:"󰇮"})]})]}),(0,t.jsx)(y,{children:(0,t.jsxs)(w,{$extendWidth:r,children:[(0,t.jsx)("main",{children:e}),(0,t.jsx)("footer",{children:"MIT © 2024"})]})})]})}),{children:[(0,t.jsx)("h1",{children:"Cass Bunting's Resume"}),(0,t.jsx)(S,{components:{del:({children:e})=>"string"==typeof e?(0,t.jsx)("i",{children:String.fromCodePoint(parseInt(e,16))}):void 0},children:"\n# Education\n## University of British Columbia  \nBachelors of Arts, Majoring in Computer Science  \nGraduated May 2024\n\n## Notable Courses  \n- [**Digital Media Practicum**](https://www.students.cs.ubc.ca/~cs-344/current-term/)  \nServed as programmer and technical artist to\ndevelop a Unity game MVP for external client\nHammer & Tong. Contributed to research and\nplanning, and created gameplay infrastructure,\ngraphical shaders, and tools for artists and designers.  \n- [**Compiler Construction**](https://www.students.cs.ubc.ca/~cs-411/2022w2/)  \n- [**Parallel Computation**](https://vancouver.calendar.ubc.ca/course-descriptions/courses/cpscv-418-parallel-computation)  \n- [**Human Computer Interaction**](https://www.students.cs.ubc.ca/~cs-344/current-term/)\n- **Creative Writing for Video Games**\n\n\n# Work\n## Edmonds Unitarian Universalist Congregation\nYouth Program Coordinator  \nSupported youth programming, managed teachers and volunteers,\nordered and organized supplies, lead activities, wrote weekly\nnewsletters, and developed  goals, approach, and policy.  \n2016 - 2020\n\n## Education Roles\nInstructor and Program Coordinator  \nCollaboratively developed and facilitated teen leadership training.\n\n- *YMCA Camp Orkila*, 2018\n- *Goldmine Youth Leadership School*, 2014, 2016, 2017\n\n## Various Restaurants and Bars\n- *Bánh Town*, Server, Seattle, 2018 - 2019\n- *Percy's & Co*, Server, Seattle, 2017 - 2018\n- *Giddy Up Burgers*, Server & Cook, Seattle, 2016 - 2017\n- *Miho Izakaya*, Dishwasher, Portland, 2015 - 2016\n\n\n# Projects\n## [Portfolio Site, cbunt.ing](https://github.com/cbunt/cbunt-portfolio)  \nPersonal portfolio developed with React, Webpack, and Typescript, with interactive WebGPU samples.\n\n## [Cubemap Gaussian Blur](https://github.com/cbunt/cbunt-portfolio/blob/main/src/samples/cubemap-blur/cubemap-guassian-pyramid.ts)  \nAlgorithm and implementation for perceptually even Gaussian blurring of cubemaps.\n\n## [WebGPU glTF Viewer](https://cbunt.ing/samples/gltf-viewer/)  \nFrom-scratch WebGPU 3D renderer and model viewer.\n\n## [Voronoi Water Shader](https://github.com/cbunt/unity-voronoi-water)\nStylized procedural water shader made in Unity using 4D voronoi noise and flowmaps.\n\n# Skills\n## Proficient\n1. HLSL\n1. ~f06af~ Unity\n1. ~e648~ C Sharp\n1. WebGPU\n1. ~f06e6~ Typescript\n1. ~f0708~ React\n1. ~e749~ CSS\n1. ~ed0d~ Node\n1. ~f072b~ Webpack\n1. ~f21f~ Docker\n1. ~ebc6~ Linux\n\n## Familiar\n1. ~f09b1~ Unreal\n1. ~e61e~ C\n1. ~e61d~ C++\n1. CUDA\n1. ~e73c~ Python\n1. Vulkan\n1. ~e777~ Haskell\n\n## Non-Tech Skills\n1. Color Design\n1. Public Speaking\n1. Guitar\n1. Songwriting\n1. Typesetting\n1. Writing—Technical, Professional, and Creative\n"})]}))}},n={};function t(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={exports:{}};return r[e].call(i.exports,i,i.exports,t),i.exports}t.m=r,e=[],t.O=(r,n,o,i)=>{if(!n){var a=1/0;for(d=0;d<e.length;d++){for(var[n,o,i]=e[d],l=!0,s=0;s<n.length;s++)(!1&i||a>=i)&&Object.keys(t.O).every((e=>t.O[e](n[s])))?n.splice(s--,1):(l=!1,i<a&&(a=i));if(l){e.splice(d--,1);var c=o();void 0!==c&&(r=c)}}return r}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[n,o,i]},t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={798:0};t.O.j=r=>0===e[r];var r=(r,n)=>{var o,i,[a,l,s]=n,c=0;if(a.some((r=>0!==e[r]))){for(o in l)t.o(l,o)&&(t.m[o]=l[o]);if(s)var d=s(t)}for(r&&r(n);c<a.length;c++)i=a[c],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(d)},n=self.webpackChunkcbunt_portfolio=self.webpackChunkcbunt_portfolio||[];n.forEach(r.bind(null,0)),n.push=r.bind(null,n.push.bind(n))})(),t.nc=void 0;var o=t.O(void 0,[917],(()=>t(6807)));o=t.O(o)})();
//# sourceMappingURL=resume.bundle.js.map