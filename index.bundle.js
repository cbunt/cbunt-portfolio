/*! For license information see: https://cbunt.ing/oss-licenses.json */
(()=>{"use strict";var e,r={5794:(e,r,o)=>{var n=o(6070),t=o(758),i=o(2620),a=o(4008);const s=(0,i.Ay)(a.A).attrs({forwardedAs:"a",defaultFilter:{disable:!0},activeFilter:{scale:7},hoverFilter:{animation:"alternating loop",scale:7}})`
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
`;var l=o(4977);var c="child-elements-module_border__O5L1W",d="child-elements-module_background__QpTHi";!function(e,r){void 0===r&&(r={});var o=r.insertAt;if("undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css","top"===o&&n.firstChild?n.insertBefore(t,n.firstChild):n.appendChild(t),t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e))}}(".child-elements-module_border__O5L1W {\n    position: absolute;\n    z-index: 1;\n    pointer-events: none;\n    box-sizing: border-box;\n\n    width: calc(100% + var(--border-width, 0px));\n    height: calc(100% + var(--border-width, 0px));\n    top: calc(-0.5 * var(--border-width, 0px));\n    left: calc(-0.5 * var(--border-width, 0px));\n\n    border: solid;\n    background-color: #0000;\n    border-radius: inherit;\n    border-width: var(--border-width, inherit);\n    border-color: var(--border-color, currentcolor);\n}\n\n.child-elements-module_background__QpTHi {\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n\n    border-radius: inherit;\n    background-color: var(--background-color, inherit);\n}");const h=(0,n.jsx)("div",{className:d}),f=((0,n.jsx)("div",{className:c}),["cubemap-blur","gltf-viewer"].map((e=>e.replaceAll("-"," ")))),p=i.Ay.div`
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
    position: relative;
    overflow: visible;
    z-index: 10;
`,m=(0,i.Ay)(a.A).attrs({forwardedAs:l.S,defaultFilter:{disable:!0,scale:10,baseFrequency:.02},distortChildren:h})`
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
`,u=(0,i.Ay)(s).attrs({forwardedAs:"button"})`
    text-transform: uppercase;
    border: none;
    background: none;
    padding: 0;

    color: inherit !important;

    font: inherit;
    cursor: pointer;
`,g=(0,i.Ay)(s)`
    text-transform: uppercase;
    max-width: 100%;
    overflow: hidden;

    &, &:visited {
        color: light-dark(var(--accent-3), var(--accent-1));
    }
`;function b(){const[e,r]=(0,t.useState)(!1),[o,i]=(0,t.useState)(!1),a=(0,t.useMemo)((()=>f.map(((e,r)=>(0,n.jsx)(g,{href:`/samples/${["cubemap-blur","gltf-viewer"][r]}`,children:e},r)))),[]);return(0,n.jsxs)(p,{onMouseLeave:()=>{r(o)},children:[(0,n.jsx)(u,{onMouseDown:()=>{i((e=>!e)),r(!o||e)},onMouseEnter:()=>{r(!0)},onKeyDown:()=>{i((e=>!e)),r(!o)},children:"Samples"}),(0,n.jsxs)(m,{isOpen:e,collapseHeight:"0px",children:[...a]})]})}const v=i.DU`
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
`,x=i.Ay.div`
    display: flex;
    justify-content: center;
    flex: 10;
    margin: 2.5rem 1rem 1.5rem 0rem;
    min-height: calc(100vh - 4rem);
`,y=i.Ay.div`
    ${({$extendWidth:e})=>e?i.AH`width: min(calc(80vh * 1.66), 100%);`:i.AH`max-width: min(calc(80vh * 1.66), 100%);`}

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`,w=(0,i.Ay)(s)`
    margin-top: 0;
    font-family: 'NerdFontsSymbols Nerd Font';
    rotate: 180deg;
`;var k=o(9576);const j=o.p+"d7d71e2f6f004a0527f0.png";var A=o(9683),F=o(9970);const _=(0,i.Ay)((function({components:e,children:r,remarkPlugins:o,...t}){return(0,n.jsx)(A.o,{components:{h1:"h2",h2:"h3",...e},remarkPlugins:[F.A,...o??[]],...t,children:r})}))`
    img {
        width: 256px; 
        float: left; 
        margin: 1rem; 
        margin-top: 0; 
        border-radius: 5px;
    }
`,C=`\n![Headshot of Cass Bunting, smiling in front of a background of trees](${j})\n\n# About the Dev\n\nI'm Cass Bunting, a graphics-programmer,\ntechnical artist, and (now, with this site) web developer based in Vancouver, BC. I'm\nexcited about real time rendering, developing useful, streamlined technical \ntools for other artists and developers, and creating unique interactive experiences.\n\nMy experience includes designing water surfaces through voronoi noise for \na game about Metis history, creating tools and workflows for Unity, and everything you \nsee on this very website. I love to work with stylized graphics, procedural \ngeneration, and combinations of the two. During my recently-completed \nstudies at the University of British Columbia, I honed my skills with and developed\nmy passion for both low- and high- level programming—from functional languages to \nassembly. I also have significant experience working outside of tech. I worked just \nabout every position in restaurants for six years, and in education, particularly\nteen leadership building, for four.\n\nAside from working with graphics, my overwhelmingly numerous hobbies include\nplaying music, hiking, cooking, reading about history and social theory,\ncreative writing, and—of course—playing video games.\n\n# About the Site\n\nThis website is my effort to present my knowledge and work in a unified way.\nIt was made from the ground up in Typescript and React, with realtime samples \ncreated with WebGPU. Its source code can be found at <https://github.com/cbunt/cbunt-portfolio>.\n`;!function(e,r="root"){const o=document.getElementById(r);if(null==o)throw new Error("Could not find root element");(0,k.H)(o).render(e)}((0,n.jsxs)((function({children:e,extendMainWidth:r}){return(0,n.jsxs)(t.StrictMode,{children:[(0,n.jsx)(v,{}),(0,n.jsxs)("nav",{children:[(0,n.jsx)(a.A,{style:{pointerEvents:"all",width:"2rem",transform:"rotate(180deg)",aspectRatio:1},defaultFilter:{baseFrequency:.02,scale:10,disable:!0},hoverFilter:{animation:"alternating loop",scale:15},children:(0,n.jsxs)("svg",{viewBox:"0 0 100 75",fill:"#0000",xmlns:"http://www.w3.org/2000/svg",version:"1.1",xlinkHref:"http://www.w3.org/1999/xlink",children:[(0,n.jsxs)("defs",{children:[(0,n.jsxs)("linearGradient",{id:"cyan",x1:"0",y1:"1",x2:"0.75",y2:"0.5",children:[(0,n.jsx)("stop",{offset:"0%",stopColor:"var(--accent-2)"}),(0,n.jsx)("stop",{offset:"100%",stopColor:"#0000"})]}),(0,n.jsxs)("linearGradient",{id:"yellow",x1:"0.5",y1:"0",x2:"0.5",y2:"1",children:[(0,n.jsx)("stop",{offset:"0%",stopColor:"var(--accent-1)"}),(0,n.jsx)("stop",{offset:"100%",stopColor:"#0000"})]}),(0,n.jsxs)("linearGradient",{id:"magenta",x1:"1",y1:"1",x2:"0.25",y2:"0.5",children:[(0,n.jsx)("stop",{offset:"0%",stopColor:"var(--accent-3)"}),(0,n.jsx)("stop",{offset:"100%",stopColor:"#0000"})]})]}),(0,n.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"white",points:"0 75, 50 0, 100 75"}),(0,n.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#magenta)",points:"0 75, 50 0, 100 75"}),(0,n.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#yellow)",points:"0 75, 50 0, 100 75"}),(0,n.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#cyan)",points:"0 75, 50 0, 100 75"})]})}),(0,n.jsxs)("div",{children:[(0,n.jsx)(s,{href:"/",children:"About"}),(0,n.jsx)(b,{}),(0,n.jsx)(s,{href:"/resume",children:"Resume"})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)(w,{href:"https://github.com/cbunt",target:"_blank",rel:"noreferrer noopener",children:""}),(0,n.jsx)(w,{href:"https://www.linkedin.com/in/cbunt",target:"_blank",rel:"noreferrer noopener",children:"󰌻"}),(0,n.jsx)(w,{href:"mailto:cass@cbunt.ing",children:"󰇮"})]})]}),(0,n.jsx)(x,{children:(0,n.jsxs)(y,{$extendWidth:r,children:[(0,n.jsx)("main",{children:e}),(0,n.jsx)("footer",{children:"MIT © 2024"})]})})]})}),{children:[(0,n.jsx)("h1",{children:"cbunt.ing, a Portfolio"}),(0,n.jsx)(_,{children:C})]}))}},o={};function n(e){var t=o[e];if(void 0!==t)return t.exports;var i=o[e]={exports:{}};return r[e].call(i.exports,i,i.exports,n),i.exports}n.m=r,e=[],n.O=(r,o,t,i)=>{if(!o){var a=1/0;for(d=0;d<e.length;d++){for(var[o,t,i]=e[d],s=!0,l=0;l<o.length;l++)(!1&i||a>=i)&&Object.keys(n.O).every((e=>n.O[e](o[l])))?o.splice(l--,1):(s=!1,i<a&&(a=i));if(s){e.splice(d--,1);var c=t();void 0!==c&&(r=c)}}return r}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[o,t,i]},n.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return n.d(r,{a:r}),r},n.d=(e,r)=>{for(var o in r)n.o(r,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})},n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="/",(()=>{var e={57:0};n.O.j=r=>0===e[r];var r=(r,o)=>{var t,i,[a,s,l]=o,c=0;if(a.some((r=>0!==e[r]))){for(t in s)n.o(s,t)&&(n.m[t]=s[t]);if(l)var d=l(n)}for(r&&r(o);c<a.length;c++)i=a[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(d)},o=self.webpackChunkcbunt_portfolio=self.webpackChunkcbunt_portfolio||[];o.forEach(r.bind(null,0)),o.push=r.bind(null,o.push.bind(o))})(),n.nc=void 0;var t=n.O(void 0,[917],(()=>n(5794)));t=n.O(t)})();
//# sourceMappingURL=index.bundle.js.map