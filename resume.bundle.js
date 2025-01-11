/*! For license information see: https://cbunt.ing/oss-licenses.json */
(()=>{"use strict";var e,r,o,t,n,i={2784:(e,r,o)=>{o.d(r,{A:()=>i});var t=o(9241),n=o(8859);const i=(0,t.Ay)(n.A).attrs({forwardedAs:"a",defaultFilter:{disable:!0},activeFilter:{scale:7},hoverFilter:{animation:"alternating loop",scale:7}})`
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
`},3176:(e,r,o)=>{o.d(r,{A:()=>d});var t=o(6070),n=o(9241),i=o(8859),a=o(2784),l=o(8487);const s=n.Ay.aside`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;

    
    grid-row: span 2;
    align-self: start;
    position: sticky;
    top: 0;

    z-index: 10;
    height: 100vh;
    box-sizing: border-box;
    padding: 2.5rem 0;
    
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 550;

    writing-mode: vertical-lr;
    transform: rotate(180deg);

    nav {
        display: flex;
        flex-direction: row-reverse;
    }

    a {
        font-stretch: 125%;
    }

    *:nth-child(3n+1) { color: var(--accent-1); }
    *:nth-child(3n+2) { color: var(--accent-2); }
    *:nth-child(3n+3) { color: var(--accent-3); }
`,c=n.Ay.div`
    writing-mode: initial;
    display: flex;
    flex-direction: column-reverse;

    a {
        margin-top: 0;
        font-family: 'NerdFontsSymbols Nerd Font';
        rotate: 180deg;
    }
`;function d(){return(0,t.jsxs)(s,{children:[(0,t.jsx)(i.A,{style:{pointerEvents:"all",width:"2rem",transform:"rotate(180deg)",aspectRatio:1},defaultFilter:{baseFrequency:.02,scale:10,disable:!0},hoverFilter:{animation:"alternating loop",scale:15},children:(0,t.jsxs)("svg",{viewBox:"0 0 100 75",fill:"#00000000",xmlns:"http://www.w3.org/2000/svg",version:"1.1",xlinkHref:"http://www.w3.org/1999/xlink",width:"100%",height:"100%",children:[(0,t.jsxs)("defs",{children:[(0,t.jsxs)("linearGradient",{id:"cyan",x1:"0",y1:"1",x2:"0.75",y2:"0.5",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"var(--accent-2)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#00000000"})]}),(0,t.jsxs)("linearGradient",{id:"yellow",x1:"0.5",y1:"0",x2:"0.5",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"var(--accent-1)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#00000000"})]}),(0,t.jsxs)("linearGradient",{id:"magenta",x1:"1",y1:"1",x2:"0.25",y2:"0.5",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"var(--accent-3)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#0000"})]})]}),(0,t.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"white",points:"0 75, 50 0, 100 75"}),(0,t.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#magenta)",points:"0 75, 50 0, 100 75"}),(0,t.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#yellow)",points:"0 75, 50 0, 100 75"}),(0,t.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#cyan)",points:"0 75, 50 0, 100 75"})]})}),(0,t.jsxs)("nav",{children:[(0,t.jsx)(a.A,{href:"/",children:"About"}),(0,t.jsx)(l.A,{}),(0,t.jsx)(a.A,{href:"/resume",children:"Resume"})]}),(0,t.jsxs)(c,{children:[(0,t.jsx)(a.A,{href:"https://github.com/cbunt",target:"_blank",rel:"noreferrer noopener",children:""}),(0,t.jsx)(a.A,{href:"https://www.linkedin.com/in/cbunt",target:"_blank",rel:"noreferrer noopener",children:"󰌻"}),(0,t.jsx)(a.A,{href:"mailto:cass@cbunt.ing",children:"󰇮"})]})]})}},6917:(e,r,o)=>{o.d(r,{A:()=>s});var t=o(6070),n=o(758),i=o(9241),a=o(3176);const l=i.DU`
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
        font-family: "Asap", sans-serif;

        --scale-bezier: cubic-bezier(0.81, 0, 0.37, 3.69);
        --scale-transition: transform 0.2s cubic-bezier(0.81, 0, 0.37, 3.69);

        --ok-l2: 0.6;

        --background-color: #0A102E;
        --hi-vis-color: #DBE4FF;

        --secondary-color: oklch(from var(--background-color) calc(l * 1.5) calc(c * 1.5) h);

        --accent-1: #18F7F7;
        --accent-2: #FF61FF;
        --accent-3: #FFFF16;

        @media (prefers-color-scheme: light) {
            --ok-l2: 1.3;

            --background-color: #FEF6C7;
            --hi-vis-color: #0c007d;
            --secondary-color: oklch(from var(--background-color) calc(l * 0.95) calc(c * 1.4) h);

            --accent-1: #D61500;
            --accent-2: #2F8000;
            --accent-3: #034cdf;
        }
        
        @supports (color: oklch(from white l c h)) {
            --hi-vis-gray: oklch(from var(--hi-vis-color) l 0 h);
        }
            
        background-color: var(--background-color);
        color: var(--hi-vis-color);
        margin: 0;
    }

    :root {
        color-scheme: dark light;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    #root {
        display: grid;
        grid-template-rows: 1fr auto;
        grid-template-columns: minmax(min-content, 6rem) auto;

        min-height: 100vh;
        min-height: 100svh;
    }

    h1 {
        font-stretch: 125%;
    }

    h1, h2 {
        margin: 0 0 1rem;
    }

    a {
        text-decoration: none;
        color: light-dark(var(--accent-3), var(--accent-1));
       
        &:visited {
            color: var(--accent-2);
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

    code {
        font-family: 'Space Mono', monospace;
        color: var(--hi-vis-gray);
        background-color: var(--secondary-color);
        padding: 0 0.3rem;
        border-radius: 5px;
    }

    main {
        width: min(calc(80vh * 1.66), 100%);
        margin: 0 auto;
        padding-top: 2rem;
        box-sizing: border-box;
    }

    footer {
        font-size: small;
        text-align: center;
        padding: 1.5rem 0;
        font-weight: 200;
    }
`;function s({children:e}){return(0,t.jsxs)(n.StrictMode,{children:[(0,t.jsx)(l,{}),(0,t.jsx)(a.A,{}),(0,t.jsx)("main",{children:e}),(0,t.jsx)("footer",{children:"MIT © 2024"})]})}},8487:(e,r,o)=>{o.d(r,{A:()=>f});var t=o(6070),n=o(9241),i=o(758),a=o(8859),l=o(8420),s=o(2784);const c=["cubemap-blur","gltf-viewer"].map((e=>e.replaceAll("-"," "))),d=n.Ay.div`
    display: flex;
    flex-direction: column;
`,h=(0,n.Ay)(a.A).attrs({defaultFilter:{disable:!0,scale:10,baseFrequency:.02},distortChildren:l.E$})`
    transition: height 300ms ease-out;
    display: ${({$isOpen:e})=>e?"flex":"none"};
    
    width: 100vh;
    justify-content: space-evenly;
    
    transform: rotate(90deg);
    writing-mode: initial;
    position: absolute;
    top: 0;
    transform-origin: top left;
    
    font-weight: bold;
    font-size: 1.4rem;

    a {
        padding: 0.5rem;
        margin: 0.5rem;
        white-space: nowrap;
        color: var(--accent-1);
    }

    div {
        background-color: var(--secondary-color);
    }
`,m=(0,n.Ay)(s.A).attrs({forwardedAs:"button"})`
    text-transform: uppercase;
    border: none;
    background: none;
    padding: 0;

    color: inherit !important;

    font: inherit;
    cursor: pointer;
`,p=(0,n.Ay)(s.A)`
    display: flex;
    text-transform: uppercase;
    max-width: 100%;
    overflow: hidden;

    &, &:visited {
        color: light-dark(var(--accent-3), var(--accent-1)) !important;
    }
`;function f(){const[e,r]=(0,i.useState)(!1),[o,n]=(0,i.useState)(!1),a=(0,i.useMemo)((()=>c.map(((e,r)=>(0,t.jsx)(p,{href:`/samples/${["cubemap-blur","gltf-viewer"][r]}`,children:e},r)))),[]);return(0,t.jsxs)(d,{onMouseLeave:()=>{r(o)},children:[(0,t.jsx)(m,{onMouseDown:()=>{n((e=>!e)),r(!o||e)},onMouseEnter:()=>{r(!0)},onKeyDown:()=>{n((e=>!e)),r(!o)},children:"Samples"}),(0,t.jsxs)(h,{$isOpen:e,children:[...a]})]})}},7924:(e,r,o)=>{o.a(e,(async(e,r)=>{try{var t=o(6070),n=o(9241),i=o(3205),a=o(6917),l=o(8158),s=o(8023);const e=n.Ay.article`
    columns: 2 max(15rem, 30vw);
    column-gap: 3rem;

    * {
        break-before: avoid;
        break-inside: avoid;
    }

    h2 {
        break-before: auto;
    }

    h3 {
        margin-bottom: 0;
        font-size: medium;
        font-weight: bold;
    }

    a {
        text-decoration: none;
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
`,c="https://raw.githubusercontent.com/cbunt/resume/refs/heads/main/resume.md",d=await fetch(c).then((e=>e.text()));(0,i.C)((0,t.jsxs)(a.A,{children:[(0,t.jsx)("h1",{children:"Cass Bunting's Resume"}),(0,t.jsx)(e,{children:(0,t.jsx)(l.o,{components:{h1:"h2",h2:"h3",del:({children:e})=>"string"==typeof e?(0,t.jsx)("i",{children:String.fromCodePoint(parseInt(e,16))}):void 0},rehypePlugins:[s.A],children:d})})]})),r()}catch(e){r(e)}}),1)},3205:(e,r,o)=>{o.d(r,{C:()=>n});var t=o(9576);function n(e,r="root"){const o=document.getElementById(r);if(null==o)throw new Error("Could not find root element");(0,t.H)(o).render(e)}},8420:(e,r,o)=>{o.d(r,{E$:()=>a});var t=o(6070);var n="child-elements-module_border__O5L1W",i="child-elements-module_background__QpTHi";!function(e,r){void 0===r&&(r={});var o=r.insertAt;if("undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css","top"===o&&t.firstChild?t.insertBefore(n,t.firstChild):t.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}}(".child-elements-module_border__O5L1W {\n    position: absolute;\n    z-index: 1;\n    pointer-events: none;\n    box-sizing: border-box;\n\n    width: calc(100% + var(--border-width, 0px));\n    height: calc(100% + var(--border-width, 0px));\n    top: calc(-0.5 * var(--border-width, 0px));\n    left: calc(-0.5 * var(--border-width, 0px));\n\n    border: solid;\n    background-color: #0000;\n    border-radius: inherit;\n    border-width: var(--border-width, inherit);\n    border-color: var(--border-color, currentcolor);\n}\n\n.child-elements-module_background__QpTHi {\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n\n    border-radius: inherit;\n    background-color: var(--background-color, inherit);\n}");const a=(0,t.jsx)("div",{className:i});(0,t.jsx)("div",{className:n})}},a={};function l(e){var r=a[e];if(void 0!==r)return r.exports;var o=a[e]={exports:{}};return i[e].call(o.exports,o,o.exports,l),o.exports}l.m=i,e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",r="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",o="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",t=e=>{e&&e.d<1&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},l.a=(n,i,a)=>{var l;a&&((l=[]).d=-1);var s,c,d,h=new Set,m=n.exports,p=new Promise(((e,r)=>{d=r,c=e}));p[r]=m,p[e]=e=>(l&&e(l),h.forEach(e),p.catch((e=>{}))),n.exports=p,i((n=>{var i;s=(n=>n.map((n=>{if(null!==n&&"object"==typeof n){if(n[e])return n;if(n.then){var i=[];i.d=0,n.then((e=>{a[r]=e,t(i)}),(e=>{a[o]=e,t(i)}));var a={};return a[e]=e=>e(i),a}}var l={};return l[e]=e=>{},l[r]=n,l})))(n);var a=()=>s.map((e=>{if(e[o])throw e[o];return e[r]})),c=new Promise((r=>{(i=()=>r(a)).r=0;var o=e=>e!==l&&!h.has(e)&&(h.add(e),e&&!e.d&&(i.r++,e.push(i)));s.map((r=>r[e](o)))}));return i.r?c:a()}),(e=>(e?d(p[o]=e):c(m),t(l)))),l&&l.d<0&&(l.d=0)},n=[],l.O=(e,r,o,t)=>{if(!r){var i=1/0;for(d=0;d<n.length;d++){for(var[r,o,t]=n[d],a=!0,s=0;s<r.length;s++)(!1&t||i>=t)&&Object.keys(l.O).every((e=>l.O[e](r[s])))?r.splice(s--,1):(a=!1,t<i&&(i=t));if(a){n.splice(d--,1);var c=o();void 0!==c&&(e=c)}}return e}t=t||0;for(var d=n.length;d>0&&n[d-1][2]>t;d--)n[d]=n[d-1];n[d]=[r,o,t]},l.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return l.d(r,{a:r}),r},l.d=(e,r)=>{for(var o in r)l.o(r,o)&&!l.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})},l.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={798:0};l.O.j=r=>0===e[r];var r=(r,o)=>{var t,n,[i,a,s]=o,c=0;if(i.some((r=>0!==e[r]))){for(t in a)l.o(a,t)&&(l.m[t]=a[t]);if(s)var d=s(l)}for(r&&r(o);c<i.length;c++)n=i[c],l.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return l.O(d)},o=self.webpackChunkcbunt_portfolio=self.webpackChunkcbunt_portfolio||[];o.forEach(r.bind(null,0)),o.push=r.bind(null,o.push.bind(o))})(),l.nc=void 0;var s=l.O(void 0,[604,510,241],(()=>l(7924)));s=l.O(s)})();
//# sourceMappingURL=resume.bundle.js.map