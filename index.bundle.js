/*! For license information see: https://cbunt.ing/oss-licenses.json */
(()=>{"use strict";var e,r={7462:(e,r,o)=>{var t=o(758),n=Symbol.for("react.element"),i=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,s=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,r,o){var t,i={},c=null,d=null;for(t in void 0!==o&&(c=""+o),void 0!==r.key&&(c=""+r.key),void 0!==r.ref&&(d=r.ref),r)a.call(r,t)&&!l.hasOwnProperty(t)&&(i[t]=r[t]);if(e&&e.defaultProps)for(t in r=e.defaultProps)void 0===i[t]&&(i[t]=r[t]);return{$$typeof:n,type:e,key:c,ref:d,props:i,_owner:s.current}}r.jsx=c,r.jsxs=c},6070:(e,r,o)=>{e.exports=o(7462)},9036:(e,r,o)=>{var t=o(6070),n=o(758),i=o(2620),a=o(3864);const s=(0,i.Ay)(a.A).attrs({forwardedAs:"a",defaultFilter:{disable:!0},activeFilter:{scale:7},hoverFilter:{animation:"alternating loop",scale:7}})`
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
`;var l=o(4977);var c="child-elements-module_border__O5L1W",d="child-elements-module_background__QpTHi";!function(e,r){void 0===r&&(r={});var o=r.insertAt;if("undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css","top"===o&&t.firstChild?t.insertBefore(n,t.firstChild):t.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}}(".child-elements-module_border__O5L1W {\n    position: absolute;\n    z-index: 1;\n    pointer-events: none;\n    box-sizing: border-box;\n\n    width: calc(100% + var(--border-width, 0px));\n    height: calc(100% + var(--border-width, 0px));\n    top: calc(-0.5 * var(--border-width, 0px));\n    left: calc(-0.5 * var(--border-width, 0px));\n\n    border: solid;\n    background-color: #0000;\n    border-radius: inherit;\n    border-width: var(--border-width, inherit);\n    border-color: var(--border-color, currentcolor);\n}\n\n.child-elements-module_background__QpTHi {\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n\n    border-radius: inherit;\n    background-color: var(--background-color, inherit);\n}");const h=(0,t.jsx)("div",{className:d}),m=((0,t.jsx)("div",{className:c}),{border:c,background:d}),p=["cubemap-blur","gltf-viewer"].map((e=>e.replaceAll("-"," "))),f=i.Ay.div`
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
    overflow: visible;
    z-index: 10;
`,u=(0,i.Ay)(a.A).attrs({forwardedAs:l.S,defaultFilter:{disable:!0,scale:10,baseFrequency:.02},distortChildren:h})`
    transition: height 300ms ease-out;
    
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
`,b=(0,i.Ay)(s).attrs({forwardedAs:"button"})`
    text-transform: uppercase;
    border: none;
    background: none;
    padding: 0;

    color: inherit !important;

    font: inherit;
    cursor: pointer;
`,x=(0,i.Ay)(s)`
    text-transform: uppercase;
    max-width: 100%;
    overflow: hidden;

    &, &:visited {
        color: light-dark(var(--accent-3), var(--accent-1));
    }
`;function g(){const[e,r]=(0,n.useState)(!1),[o,i]=(0,n.useState)(!1),a=(0,n.useMemo)((()=>p.map(((e,r)=>(0,t.jsx)(x,{href:`/samples/${["cubemap-blur","gltf-viewer"][r]}`,children:e},r)))),[]);return(0,t.jsxs)(f,{onMouseLeave:()=>{r(o)},children:[(0,t.jsx)(b,{onMouseDown:()=>{i((e=>!e)),r(!o||e)},onMouseEnter:()=>{r(!0)},onKeyDown:()=>{i((e=>!e)),r(!o)},children:"Samples"}),(0,t.jsxs)(u,{isOpen:e,children:[...a]})]})}const v=i.DU`
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
        display: flex;
        flex: 1 1;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
        
        position: sticky;
        top: 0;
        z-index: 10;
        max-height: 100vh;
        max-width: 6rem;
        box-sizing: border-box;
        padding: 2.5rem 0;
        
        text-transform: uppercase;
        font-size: 1.5rem;
        font-weight: 550;

        writing-mode: vertical-lr;
        transform: rotate(180deg);

        div {
            display: flex;
            flex-direction: row-reverse;
        }

        a {
            font-stretch: 125%;
        }

        *:nth-child(3n+1) { color: var(--accent-1); }
        *:nth-child(3n+2) { color: var(--accent-2); }
        *:nth-child(3n+3) { color: var(--accent-3); }
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
`,y=i.Ay.div`
    display: flex;
    justify-content: center;
    flex: 10;
    margin: 2.5rem 1rem 1.5rem 0rem;
    min-height: calc(100vh - 4rem);
    max-width: calc(100vw - 3.5rem);
`,w=i.Ay.div`
    ${({$extendWidth:e})=>e?i.AH`width: min(calc(80vh * 1.66), 100%);`:i.AH`max-width: min(calc(80vh * 1.66), 100%);`}

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`,j=i.Ay.div`
    writing-mode: initial;
    display: flex;
    flex-direction: column-reverse;

    a {
        margin-top: 0;
        font-family: 'NerdFontsSymbols Nerd Font';
        rotate: 180deg;
    }
`;var k=o(9576);const _=i.Ay.div.attrs({className:m.background})`
    transition: background-color 0.2s ease;
    --background-color: var(--secondary-color);

`,A=i.Ay.div`
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
`,F=(0,i.Ay)(a.A).attrs({defaultFilter:{disable:!0,scale:10,baseFrequency:.015},hoverFilter:{disable:!0,animation:"alternating endless",scale:12,baseFrequency:.02,animationInterval:700,animationJitter:200},distortChildren:(0,t.jsx)(_,{})})`
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
        margin: 0rem;
        margin-left: 1rem;
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
`;function R({name:e,description:r,videoURL:o,projectURL:i,thumbnailURL:a}){const s=(0,n.useRef)(null),l=(0,n.useRef)(!0),c=(0,n.useId)();return(0,t.jsxs)(F,{filterId:c,onMouseEnter:()=>{l.current&&s.current?.play().catch((()=>{l.current=!1}))},onMouseLeave:()=>{s.current?.pause()},children:[(0,t.jsx)("h3",{children:e}),null!=o?(0,t.jsxs)(A,{children:[(0,t.jsx)("video",{ref:s,loop:!0,muted:!0,disablePictureInPicture:!0,disableRemotePlayback:!0,playsInline:!0,preload:"metadata",poster:a,src:`${o}#t=0.1`}),(0,t.jsx)("div",{className:m.border,style:{filter:`url(#${c})`}})]}):void 0,(0,t.jsx)("p",{children:r}),null!=i?(0,t.jsx)("a",{href:i,"aria-label":e}):void 0]})}const z=o.p+"792f4dbd0f0ff54c9c28.mp4",L=o.p+"090239f5df9dbef4d959.mp4",O=o.p+"d8e2a849b19f9c3a2f3f.mp4",C=o.p+"fd6cbd240cf758430057.mp4",U=o.p+"5afa4f647104f0bb2e5d.png",E=o.p+"f57173ad0aa4fc11dddf.png",M=o.p+"498a8a13cce26ec6b626.png",S=o.p+"921eb0ab8b0918fb6253.png",B=i.Ay.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), max-content));
    padding: 1rem 2rem 3rem;

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

    div {
        align-content: center;
        width: fit-content;
    }

    p {
        padding: 1rem 0 0;
        margin: 0;
    }
`,I=i.Ay.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    column-gap: 1.5rem;
    row-gap: 2rem;

    padding: 0.5rem 1rem 0;

    &:hover > :not(:hover) {
        --secondary-color: var(--background-color);
        opacity: 0.5;
    }
`;!function(e,r="root"){const o=document.getElementById(r);if(null==o)throw new Error("Could not find root element");(0,k.H)(o).render(e)}((0,t.jsxs)((function({children:e,extendMainWidth:r}){return(0,t.jsxs)(n.StrictMode,{children:[(0,t.jsx)(v,{}),(0,t.jsxs)("nav",{children:[(0,t.jsx)(a.A,{style:{pointerEvents:"all",width:"2rem",transform:"rotate(180deg)",aspectRatio:1},defaultFilter:{baseFrequency:.02,scale:10,disable:!0},hoverFilter:{animation:"alternating loop",scale:15},children:(0,t.jsxs)("svg",{viewBox:"0 0 100 75",fill:"#00000000",xmlns:"http://www.w3.org/2000/svg",version:"1.1",xlinkHref:"http://www.w3.org/1999/xlink",width:"100%",height:"100%",children:[(0,t.jsxs)("defs",{children:[(0,t.jsxs)("linearGradient",{id:"cyan",x1:"0",y1:"1",x2:"0.75",y2:"0.5",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"var(--accent-2)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#00000000"})]}),(0,t.jsxs)("linearGradient",{id:"yellow",x1:"0.5",y1:"0",x2:"0.5",y2:"1",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"var(--accent-1)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#00000000"})]}),(0,t.jsxs)("linearGradient",{id:"magenta",x1:"1",y1:"1",x2:"0.25",y2:"0.5",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"var(--accent-3)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#0000"})]})]}),(0,t.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"white",points:"0 75, 50 0, 100 75"}),(0,t.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#magenta)",points:"0 75, 50 0, 100 75"}),(0,t.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#yellow)",points:"0 75, 50 0, 100 75"}),(0,t.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#cyan)",points:"0 75, 50 0, 100 75"})]})}),(0,t.jsxs)("div",{children:[(0,t.jsx)(s,{href:"/",children:"About"}),(0,t.jsx)(g,{}),(0,t.jsx)(s,{href:"/resume",children:"Resume"})]}),(0,t.jsxs)(j,{children:[(0,t.jsx)(s,{href:"https://github.com/cbunt",target:"_blank",rel:"noreferrer noopener",children:""}),(0,t.jsx)(s,{href:"https://www.linkedin.com/in/cbunt",target:"_blank",rel:"noreferrer noopener",children:"󰌻"}),(0,t.jsx)(s,{href:"mailto:cass@cbunt.ing",children:"󰇮"})]})]}),(0,t.jsx)(y,{children:(0,t.jsxs)(w,{$extendWidth:r,children:[(0,t.jsx)("main",{children:e}),(0,t.jsx)("footer",{children:"MIT © 2024"})]})})]})}),{children:[(0,t.jsxs)(B,{children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{children:"Cass Bunting"}),(0,t.jsx)("h3",{children:"Graphics Programmer"}),(0,t.jsx)("h3",{children:"Web Developer"})]}),(0,t.jsx)("p",{children:"\nRecent computer science grad looking to help build unique interactive experiences in\ngames and on the web. I'm also big into guitar, songwriting, containing multitudes, etc.\n"})]}),(0,t.jsxs)(I,{children:[(0,t.jsx)(R,{name:"React Distortion",description:"A React component library for adding procedural distortion to other components.",projectURL:"https://github.com/cbunt/react-distortion",videoURL:L,thumbnailURL:E}),(0,t.jsx)(R,{name:"glTF Viewer",description:"A WebGPU deferred 3D renderer and glTF model viewer.",projectURL:"/samples/gltf-viewer",videoURL:C,thumbnailURL:S}),(0,t.jsx)(R,{name:"Cubemap Blur",description:"A tool to seamlessly and evenly blur cubemap textures.",projectURL:"/samples/cubemap-blur",videoURL:O,thumbnailURL:M}),(0,t.jsx)(R,{name:"Voronoi Water",description:"A stylized procedural water shader through voronoi noise and flowmaps",projectURL:"https://github.com/cbunt/unity-voronoi-water",videoURL:z,thumbnailURL:U})]})]}))}},o={};function t(e){var n=o[e];if(void 0!==n)return n.exports;var i=o[e]={exports:{}};return r[e](i,i.exports,t),i.exports}t.m=r,e=[],t.O=(r,o,n,i)=>{if(!o){var a=1/0;for(d=0;d<e.length;d++){for(var[o,n,i]=e[d],s=!0,l=0;l<o.length;l++)(!1&i||a>=i)&&Object.keys(t.O).every((e=>t.O[e](o[l])))?o.splice(l--,1):(s=!1,i<a&&(a=i));if(s){e.splice(d--,1);var c=n();void 0!==c&&(r=c)}}return r}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[o,n,i]},t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var o in r)t.o(r,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.p="/",(()=>{var e={57:0};t.O.j=r=>0===e[r];var r=(r,o)=>{var n,i,[a,s,l]=o,c=0;if(a.some((r=>0!==e[r]))){for(n in s)t.o(s,n)&&(t.m[n]=s[n]);if(l)var d=l(t)}for(r&&r(o);c<a.length;c++)i=a[c],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(d)},o=self.webpackChunkcbunt_portfolio=self.webpackChunkcbunt_portfolio||[];o.forEach(r.bind(null,0)),o.push=r.bind(null,o.push.bind(o))})(),t.nc=void 0;var n=t.O(void 0,[856],(()=>t(9036)));n=t.O(n)})();
//# sourceMappingURL=index.bundle.js.map