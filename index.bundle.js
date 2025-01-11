/*! For license information see: https://cbunt.ing/oss-licenses.json */
(()=>{"use strict";var e,r={7462:(e,r,o)=>{var t=o(758),n=Symbol.for("react.element"),i=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,s=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,r,o){var t,i={},c=null,d=null;for(t in void 0!==o&&(c=""+o),void 0!==r.key&&(c=""+r.key),void 0!==r.ref&&(d=r.ref),r)a.call(r,t)&&!l.hasOwnProperty(t)&&(i[t]=r[t]);if(e&&e.defaultProps)for(t in r=e.defaultProps)void 0===i[t]&&(i[t]=r[t]);return{$$typeof:n,type:e,key:c,ref:d,props:i,_owner:s.current}}r.jsx=c,r.jsxs=c},6070:(e,r,o)=>{e.exports=o(7462)},2978:(e,r,o)=>{var t=o(6070),n=o(758),i=o(9241),a=o(8859);const s=(0,i.Ay)(a.A).attrs({forwardedAs:"a",defaultFilter:{disable:!0},activeFilter:{scale:7},hoverFilter:{animation:"alternating loop",scale:7}})`
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
`;var l="child-elements-module_border__O5L1W",c="child-elements-module_background__QpTHi";!function(e,r){void 0===r&&(r={});var o=r.insertAt;if("undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css","top"===o&&t.firstChild?t.insertBefore(n,t.firstChild):t.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}}(".child-elements-module_border__O5L1W {\n    position: absolute;\n    z-index: 1;\n    pointer-events: none;\n    box-sizing: border-box;\n\n    width: calc(100% + var(--border-width, 0px));\n    height: calc(100% + var(--border-width, 0px));\n    top: calc(-0.5 * var(--border-width, 0px));\n    left: calc(-0.5 * var(--border-width, 0px));\n\n    border: solid;\n    background-color: #0000;\n    border-radius: inherit;\n    border-width: var(--border-width, inherit);\n    border-color: var(--border-color, currentcolor);\n}\n\n.child-elements-module_background__QpTHi {\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n\n    border-radius: inherit;\n    background-color: var(--background-color, inherit);\n}");const d=(0,t.jsx)("div",{className:c}),p=((0,t.jsx)("div",{className:l}),{border:l,background:c}),h=["cubemap-blur","gltf-viewer"].map((e=>e.replaceAll("-"," "))),m=i.Ay.div`
    display: flex;
    flex-direction: column;
`,u=(0,i.Ay)(a.A).attrs({defaultFilter:{disable:!0,scale:10,baseFrequency:.02},distortChildren:d})`
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
`,f=(0,i.Ay)(s).attrs({forwardedAs:"button"})`
    text-transform: uppercase;
    border: none;
    background: none;
    padding: 0;

    color: inherit !important;

    font: inherit;
    cursor: pointer;
`,b=(0,i.Ay)(s)`
    display: flex;
    text-transform: uppercase;
    max-width: 100%;
    overflow: hidden;

    &, &:visited {
        color: light-dark(var(--accent-3), var(--accent-1)) !important;
    }
`;function g(){const[e,r]=(0,n.useState)(!1),[o,i]=(0,n.useState)(!1),a=(0,n.useMemo)((()=>h.map(((e,r)=>(0,t.jsx)(b,{href:`/samples/${["cubemap-blur","gltf-viewer"][r]}`,children:e},r)))),[]);return(0,t.jsxs)(m,{onMouseLeave:()=>{r(o)},children:[(0,t.jsx)(f,{onMouseDown:()=>{i((e=>!e)),r(!o||e)},onMouseEnter:()=>{r(!0)},onKeyDown:()=>{i((e=>!e)),r(!o)},children:"Samples"}),(0,t.jsxs)(u,{$isOpen:e,children:[...a]})]})}const x=i.Ay.aside`
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
`,v=i.Ay.div`
    writing-mode: initial;
    display: flex;
    flex-direction: column-reverse;

    a {
        margin-top: 0;
        font-family: 'NerdFontsSymbols Nerd Font';
        rotate: 180deg;
    }
`;function y(){return(0,t.jsxs)(x,{children:[(0,t.jsx)(a.A,{style:{pointerEvents:"all",width:"2rem",transform:"rotate(180deg)",aspectRatio:1},defaultFilter:{baseFrequency:.02,scale:10,disable:!0},hoverFilter:{animation:"alternating loop",scale:15},children:(0,t.jsxs)("svg",{viewBox:"0 0 100 75",fill:"#00000000",xmlns:"http://www.w3.org/2000/svg",version:"1.1",xlinkHref:"http://www.w3.org/1999/xlink",width:"100%",height:"100%",children:[(0,t.jsxs)("defs",{children:[(0,t.jsxs)("linearGradient",{id:"cyan",x1:"0",y1:"1",x2:"0.75",y2:"0.5",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"var(--accent-2)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#00000000"})]}),(0,t.jsxs)("linearGradient",{id:"yellow",x1:"0.5",y1:"0",x2:"0.5",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"var(--accent-1)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#00000000"})]}),(0,t.jsxs)("linearGradient",{id:"magenta",x1:"1",y1:"1",x2:"0.25",y2:"0.5",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"var(--accent-3)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#0000"})]})]}),(0,t.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"white",points:"0 75, 50 0, 100 75"}),(0,t.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#magenta)",points:"0 75, 50 0, 100 75"}),(0,t.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#yellow)",points:"0 75, 50 0, 100 75"}),(0,t.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#cyan)",points:"0 75, 50 0, 100 75"})]})}),(0,t.jsxs)("nav",{children:[(0,t.jsx)(s,{href:"/",children:"About"}),(0,t.jsx)(g,{}),(0,t.jsx)(s,{href:"/resume",children:"Resume"})]}),(0,t.jsxs)(v,{children:[(0,t.jsx)(s,{href:"https://github.com/cbunt",target:"_blank",rel:"noreferrer noopener",children:""}),(0,t.jsx)(s,{href:"https://www.linkedin.com/in/cbunt",target:"_blank",rel:"noreferrer noopener",children:"󰌻"}),(0,t.jsx)(s,{href:"mailto:cass@cbunt.ing",children:"󰇮"})]})]})}const w=i.DU`
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
`;var j=o(9576);const k=i.Ay.div`
    position: relative;

    z-index: 1;
    border: none;
    border-radius: 20px;
    --border-width: 10px;
    --border-color: var(--secondary-color);

    * {
        transition: border-color 0.2s ease;
    }

    video {
        max-width: 100%;
        max-height: 100%;
        border-radius: inherit;
    }
    
    margin: 0.5rem 0;
`,_=(0,i.Ay)(a.A).attrs({defaultFilter:{disable:!0,scale:10,baseFrequency:.015},hoverFilter:{disable:!0,animation:"alternating endless",scale:12,baseFrequency:.02,animationInterval:700,animationJitter:200},distortChildren:d})`
    position: relative;
    transform-origin: center;
    padding: 1.5rem 0.5rem 0rem;

    border-radius: 20px;
    background: none;

    transition:
        opacity 0.3s ease,
        color 0.1s ease,
        transform 0.1s cubic-bezier(.35,-1.02,.38,.75);

    &:hover {
        transform: scale(1.025);
        transition:
            opacity 0.3s ease,
            color 0.2s ease, 
            transform 0.2s cubic-bezier(.38,-0.65,.41,1.67);

        h3 {
            color: var(--accent-1);
        }
    }
    
    &:active {
        transform: scale(1);
    }

    p, h3 {
        margin: 0 1rem;
        z-index: 2;
    }

    a {
        position: absolute;
        width: 100%;
        height: 100%;
        top:0;
        left: 0;
        z-index: 3;
    }

    > div {
        transition: background-color 0.2s ease;
        --background-color: var(--secondary-color);
    }
`;function F({name:e,description:r,videoURL:o,projectURL:i,thumbnailURL:a}){const s=(0,n.useRef)(null),l=(0,n.useRef)(!0),c=(0,n.useId)();return(0,t.jsxs)(_,{filterId:c,onMouseEnter:()=>{l.current&&s.current?.play().catch((()=>{l.current=!1}))},onMouseLeave:()=>{s.current?.pause()},children:[(0,t.jsx)("h3",{children:e}),null!=o?(0,t.jsxs)(k,{children:[(0,t.jsx)("video",{ref:s,loop:!0,muted:!0,disablePictureInPicture:!0,disableRemotePlayback:!0,playsInline:!0,preload:"metadata",poster:a,src:`${o}#t=0.1`}),(0,t.jsx)("div",{className:p.border,style:{filter:`url(#${c})`}})]}):void 0,(0,t.jsx)("p",{children:r}),null!=i?(0,t.jsx)("a",{href:i,"aria-label":e}):void 0]})}const R=o.p+"792f4dbd0f0ff54c9c28.mp4",A=o.p+"090239f5df9dbef4d959.mp4",O=o.p+"d8e2a849b19f9c3a2f3f.mp4",L=o.p+"fd6cbd240cf758430057.mp4",z=o.p+"a66accc5fba8c3415eea.png",C=o.p+"cbfc26fefde48a8a64be.png",U=o.p+"15d5539ea71729f4e26c.png",E=o.p+"3f900e0f247e996bbeaf.png",M=i.Ay.hgroup`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), max-content));
    grid-template-rows: auto auto 1fr;
    grid-auto-flow: column;

    padding: 1rem 2rem 3rem;
    width: fit-content;

    h2 {
        font-size: 2rem;
        width: max-content;
        padding: 0 0 0.5rem;
        margin: 0;
    }

    h3 {
        font-style: italic;
        width: max-content;
        margin: 0;
        padding: 0.5rem 1rem;
        font-weight: 300;
        font-stretch: 110%;
    }

    p {
        grid-row: span 3;
        padding: 1rem 0 0;
        margin: 0;
    }
`,S=i.Ay.div`
    padding: 0.5rem 1rem 0;
    grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));

    &, > div {
        display: grid;
        column-gap: 1.5rem;
        row-gap: 2rem;
    }

    > div {
        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    }

    &:hover > div > :not(:hover) {
        --secondary-color: var(--background-color);
        opacity: 0.5;
    }
`;!function(e,r="root"){const o=document.getElementById(r);if(null==o)throw new Error("Could not find root element");(0,j.H)(o).render(e)}((0,t.jsxs)((function({children:e}){return(0,t.jsxs)(n.StrictMode,{children:[(0,t.jsx)(w,{}),(0,t.jsx)(y,{}),(0,t.jsx)("main",{children:e}),(0,t.jsx)("footer",{children:"MIT © 2024"})]})}),{children:[(0,t.jsxs)(M,{children:[(0,t.jsx)("h2",{children:"Cass Bunting"}),(0,t.jsx)("h3",{children:"Graphics Programmer"}),(0,t.jsx)("h3",{children:"Web Developer"}),(0,t.jsx)("p",{children:"\nRecent computer science grad looking to help build unique interactive experiences in\ngames and on the web. I'm also big into guitar, songwriting, containing multitudes, etc.\n"})]}),(0,t.jsxs)(S,{children:[(0,t.jsxs)("div",{children:[(0,t.jsx)(F,{name:"React Distortion",description:"A React component library for adding procedural distortion to other components.",projectURL:"https://github.com/cbunt/react-distortion",videoURL:A,thumbnailURL:C}),(0,t.jsx)(F,{name:"glTF Viewer",description:"A WebGPU deferred 3D renderer and glTF model viewer.",projectURL:"/samples/gltf-viewer",videoURL:L,thumbnailURL:E})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)(F,{name:"Cubemap Blur",description:"A tool to seamlessly and evenly blur cubemap textures.",projectURL:"/samples/cubemap-blur",videoURL:O,thumbnailURL:U}),(0,t.jsx)(F,{name:"Voronoi Water",description:"A stylized procedural water shader through voronoi noise and flowmaps",projectURL:"https://github.com/cbunt/unity-voronoi-water",videoURL:R,thumbnailURL:z})]})]})]}))}},o={};function t(e){var n=o[e];if(void 0!==n)return n.exports;var i=o[e]={exports:{}};return r[e](i,i.exports,t),i.exports}t.m=r,e=[],t.O=(r,o,n,i)=>{if(!o){var a=1/0;for(d=0;d<e.length;d++){for(var[o,n,i]=e[d],s=!0,l=0;l<o.length;l++)(!1&i||a>=i)&&Object.keys(t.O).every((e=>t.O[e](o[l])))?o.splice(l--,1):(s=!1,i<a&&(a=i));if(s){e.splice(d--,1);var c=n();void 0!==c&&(r=c)}}return r}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[o,n,i]},t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var o in r)t.o(r,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.p="/",(()=>{var e={57:0};t.O.j=r=>0===e[r];var r=(r,o)=>{var n,i,[a,s,l]=o,c=0;if(a.some((r=>0!==e[r]))){for(n in s)t.o(s,n)&&(t.m[n]=s[n]);if(l)var d=l(t)}for(r&&r(o);c<a.length;c++)i=a[c],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(d)},o=self.webpackChunkcbunt_portfolio=self.webpackChunkcbunt_portfolio||[];o.forEach(r.bind(null,0)),o.push=r.bind(null,o.push.bind(o))})(),t.nc=void 0;var n=t.O(void 0,[604,241],(()=>t(2978)));n=t.O(n)})();
//# sourceMappingURL=index.bundle.js.map