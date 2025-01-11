/*! For license information see: https://cbunt.ing/oss-licenses.json */
"use strict";(self.webpackChunkcbunt_portfolio=self.webpackChunkcbunt_portfolio||[]).push([[434],{7434:(e,r,t)=>{t.d(r,{A:()=>ue});var o=t(6070),n=t(9969),a=t(9564),i=t(758),s=t(9241),l=t(8859);const c=(0,s.Ay)(l.A).attrs({forwardedAs:"a",defaultFilter:{disable:!0},activeFilter:{scale:7},hoverFilter:{animation:"alternating loop",scale:7}})`
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
`;var d=t(8420);const h=["cubemap-blur","gltf-viewer"].map((e=>e.replaceAll("-"," "))),u=s.Ay.div`
    display: flex;
    flex-direction: column;
`,p=(0,s.Ay)(l.A).attrs({defaultFilter:{disable:!0,scale:10,baseFrequency:.02},distortChildren:d.E$})`
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
`,f=(0,s.Ay)(c).attrs({forwardedAs:"button"})`
    text-transform: uppercase;
    border: none;
    background: none;
    padding: 0;

    color: inherit !important;

    font: inherit;
    cursor: pointer;
`,m=(0,s.Ay)(c)`
    display: flex;
    text-transform: uppercase;
    max-width: 100%;
    overflow: hidden;

    &, &:visited {
        color: light-dark(var(--accent-3), var(--accent-1)) !important;
    }
`;function g(){const[e,r]=(0,i.useState)(!1),[t,n]=(0,i.useState)(!1),a=(0,i.useMemo)((()=>h.map(((e,r)=>(0,o.jsx)(m,{href:`/samples/${["cubemap-blur","gltf-viewer"][r]}`,children:e},r)))),[]);return(0,o.jsxs)(u,{onMouseLeave:()=>{r(t)},children:[(0,o.jsx)(f,{onMouseDown:()=>{n((e=>!e)),r(!t||e)},onMouseEnter:()=>{r(!0)},onKeyDown:()=>{n((e=>!e)),r(!t)},children:"Samples"}),(0,o.jsxs)(p,{$isOpen:e,children:[...a]})]})}const v=s.Ay.aside`
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
`,b=s.Ay.div`
    writing-mode: initial;
    display: flex;
    flex-direction: column-reverse;

    a {
        margin-top: 0;
        font-family: 'NerdFontsSymbols Nerd Font';
        rotate: 180deg;
    }
`;function x(){return(0,o.jsxs)(v,{children:[(0,o.jsx)(l.A,{style:{pointerEvents:"all",width:"2rem",transform:"rotate(180deg)",aspectRatio:1},defaultFilter:{baseFrequency:.02,scale:10,disable:!0},hoverFilter:{animation:"alternating loop",scale:15},children:(0,o.jsxs)("svg",{viewBox:"0 0 100 75",fill:"#00000000",xmlns:"http://www.w3.org/2000/svg",version:"1.1",xlinkHref:"http://www.w3.org/1999/xlink",width:"100%",height:"100%",children:[(0,o.jsxs)("defs",{children:[(0,o.jsxs)("linearGradient",{id:"cyan",x1:"0",y1:"1",x2:"0.75",y2:"0.5",children:[(0,o.jsx)("stop",{offset:"0%",stopColor:"var(--accent-2)"}),(0,o.jsx)("stop",{offset:"100%",stopColor:"#00000000"})]}),(0,o.jsxs)("linearGradient",{id:"yellow",x1:"0.5",y1:"0",x2:"0.5",y2:"1",children:[(0,o.jsx)("stop",{offset:"0%",stopColor:"var(--accent-1)"}),(0,o.jsx)("stop",{offset:"100%",stopColor:"#00000000"})]}),(0,o.jsxs)("linearGradient",{id:"magenta",x1:"1",y1:"1",x2:"0.25",y2:"0.5",children:[(0,o.jsx)("stop",{offset:"0%",stopColor:"var(--accent-3)"}),(0,o.jsx)("stop",{offset:"100%",stopColor:"#0000"})]})]}),(0,o.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"white",points:"0 75, 50 0, 100 75"}),(0,o.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#magenta)",points:"0 75, 50 0, 100 75"}),(0,o.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#yellow)",points:"0 75, 50 0, 100 75"}),(0,o.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#cyan)",points:"0 75, 50 0, 100 75"})]})}),(0,o.jsxs)("nav",{children:[(0,o.jsx)(c,{href:"/",children:"About"}),(0,o.jsx)(g,{}),(0,o.jsx)(c,{href:"/resume",children:"Resume"})]}),(0,o.jsxs)(b,{children:[(0,o.jsx)(c,{href:"https://github.com/cbunt",target:"_blank",rel:"noreferrer noopener",children:""}),(0,o.jsx)(c,{href:"https://www.linkedin.com/in/cbunt",target:"_blank",rel:"noreferrer noopener",children:"󰌻"}),(0,o.jsx)(c,{href:"mailto:cass@cbunt.ing",children:"󰇮"})]})]})}const w=s.DU`
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
`;function y({children:e}){return(0,o.jsxs)(i.StrictMode,{children:[(0,o.jsx)(w,{}),(0,o.jsx)(x,{}),(0,o.jsx)("main",{children:e}),(0,o.jsx)("footer",{children:"MIT © 2024"})]})}var k=t(4037);const j="\n    .distortion-tooltip {\n        position: fixed;\n        top: 10;\n        left: 0;\n        z-index: 5;\n\n        --background-color: var(--secondary-color);\n        background-color: #0000;\n        color: var(--hi-vis-gray);\n        \n        padding: 12px;\n        max-width: 10rem;\n        width: max-content;\n        \n        border-radius: 8px;\n        font-size: inherit;\n    }\n";function A(e){const r=(0,i.useRef)(null),[t,n]=(0,i.useState)(!1),a=null!=e?(0,o.jsxs)(l.A,{className:"distortion-tooltip",defaultFilter:{scale:10,disable:!0},distortChildren:d.E$,ref:r,children:[(0,o.jsx)("style",{children:j}),e]}):void 0;return[t?a:void 0,()=>{n(!0)},()=>{n(!1),r.current?.refreshSeed()}]}const C=(0,s.Ay)(l.A).attrs({defaultFilter:{scale:6},hoverFilter:{mode:"alternating loop",scale:4},activeFilter:{mode:"static",scale:6}})`
    --height: 1rem;

    width: fit-content;
    justify-self: center;
    height: var(--height);
    display: flex;
    border-radius: 10px;
`,F=s.Ay.input.attrs({type:"checkbox"})`
    appearance: none;
    border-radius: 5px;
    border: max(3.5px, 0.15rem) solid oklch(from var(--accent-2) calc(l * var(--ok-l2)) c h);
    height: 100%;
    aspect-ratio: 1;
    position: relative;
    margin: 0;
    cursor: pointer;
    background-color: var(--background-color);
    transition: 
        var(--scale-transition),
        background-color 0.2s ease-out,
        border-color 0.2s ease-out;

    label:not(:hover) + ${C}:has(&) {
        input:hover {
            transform: scale(1.05);
        }
        input:active {
            transform: scale(0.95);
        }
    }

    &:checked {
        background-color: var(--accent-2);
        border-color: var(--accent-2);
    }

    &:before,
    &:after {
        content: "";
        position: absolute;
        background: oklch(from var(--accent-2) calc(l * var(--ok-l2)) c h);
        width: calc(var(--height) * sqrt(2));
        height: max(4px, 0.2rem);
        border-radius: 6px;
        top: -4px;
    }

    &:before {
        transform: rotate(45deg) scaleX(0);
        transform-origin: left top;
        transition: transform 75ms ease-in 100ms;
        left: 0;
    }

    &:after {
        transform: rotate(-45deg) scaleX(0);
        transform-origin: right top;
        transition: transform 75ms ease-in;
        right: 0;
    }

    &:checked:before {
        transform: rotate(45deg) scaleX(1);
        transition: transform 100ms ease-in;
    }

    &:checked:after {  
        transform: rotate(-45deg) scaleX(1);
        transition: transform 100ms ease-out 150ms;
    }
`;function S({label:e,value:r,onChange:t=()=>{},callbacks:n,description:a}){const s=(0,i.useId)(),[l,c]=(0,i.useState)(r),d=e=>{"boolean"==typeof e&&e!==l&&c(e)};null!=n&&(0,i.useEffect)((()=>(n.add(d),()=>{n.delete(d)})));const[h,u,p]=A(a);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("label",{style:{position:"relative"},htmlFor:s,onMouseEnter:u,onMouseLeave:p,children:[e,h]}),(0,o.jsx)(C,{tabindex:0,children:(0,o.jsx)(F,{"aria-label":e,checked:l,onChange:e=>{c(e.target.checked),t(e.target.checked)},id:s})}),(0,o.jsx)("div",{})]})}const z=(0,s.Ay)(l.A).attrs({forwardedAs:"button",type:"button",defaultFilter:{disable:!0,scale:5,baseFrequency:.02,numOctaves:1},hoverFilter:{animation:"alternating loop",scale:4,baseFrequency:.01},activeFilter:{scale:5,baseFrequency:.01},distortChildren:d.cg})`
    color: var(--accent-3);
    --border-color: var(--accent-3);
    --border-width: max(3px, 0.1rem);

    border-radius: 3px;
    border: var(--border-width) solid #0000;

    position: relative;
    grid-column: span 2;
    height: 1.5rem;

    appearance: none;
    box-shadow: none;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    
    background-color: #0000;
    overflow: visible;

    cursor: pointer;
    user-select: none;
    touch-action: manipulation;
    font-family: inherit;
    font-stretch: inherit;
    font-size:  inherit;
    font-weight: 800;

    transition: 
        font-size 0.1s var(--scale-bezier),
        font-stretch 0.15s var(--scale-bezier),
        var(--scale-transition);

    &:hover:not(:disabled) {
        transform: scale(1.015);
        font-stretch: 125%;
    }
    
    &:active:not(:disabled) {
        transform: scale(0.995);
        font-stretch: 120%;
    }

    &:disabled {
        cursor: default;
    } 
`,T=(0,s.Ay)(l.A).attrs({defaultFilter:{disable:!0},distortChildren:d.E$})`
    min-height: var(--label-total-height);
    max-height: calc(10 * var(--label-total-height));
    display: flex;
    overflow: hidden;
    position: absolute;
    width: 100%;

    & > div:last-of-type {
        background-color: color-mix(in oklab, var(--secondary-color) 85%, var(--hi-vis-gray));
        z-index: 0;
        border-radius: 5px;
    }
`,M=s.Ay.div`
    overflow-y: scroll;
    overflow-x: hidden;

    z-index: 2;

    width: 100%;
    display: flex;
    flex-direction: column;
    color: inherit;

    &::-webkit-scrollbar-thumb {
        background-color:rgb(from var(--accent-3) r g b / 0.75);
    }
`,I=s.Ay.div`
    --label-padding-top: 6px;
    --label-padding-bottom: 4px;
    --label-padding: calc(var(--label-padding-bottom) + var(--label-padding-top));
    --label-total-height: calc(1rem + var(--label-padding));

    min-height: var(--label-total-height);
    max-height: calc(10 * var(--label-total-height));

    display: flex;
    width: 100%;
    position: relative;
    flex-direction: column;
    color: var(--hi-vis-color);

    grid-column: span 2;

    input[type="radio"] {
        display: none;
    }

    label {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        transform-origin: center left;
        flex-shrink: 0;
        
        padding: var(--label-padding-top) 10px var(--label-padding-bottom);
        display: none;
        transition: 
            transform 0.1s var(--scale-bezier),
            color 0.1s ease-in;

        &:hover {
            transform: scale(1.05);
        }

        &:not(:first-of-type) {
            padding-top: 8px;
            padding-bottom: 8px;
        }

        &:first-of-type {
            display: block;
        }
    }

    ${({$disabled:e})=>e?s.AH`
            filter: brightness(80%);
        `:s.AH`
            cursor: pointer;

            label {
                cursor: pointer;
            }

            &::after {
                content: "\\25BC";
                position: absolute;
                top: 6px;
                right: 8px;
                transition: 0.25s transform ease-in-out;
                pointer-events: none;
            }

            &:hover:not(:focus) {
                label,
                &::after {
                    color: var(--accent-3);
                }
            }

            &:focus {
                z-index: 2;

                label {
                    display: inline-block;
                
                    &:hover {
                        color: var(--accent-3);
                    }
                }

                &::after {
                    visibility: hidden;
                    transform: rotate(180deg);
                }

                &:has(label:first-of-type:hover)::after {
                    color: var(--accent-3);
                }
            }`}
`;function E({label:e,process:r,buttonText:t,accept:n,onChange:a,selection:s,callbacks:l}){const[c,d]=(0,i.useState)(s?.value),h=(0,i.useRef)(null),u=(0,i.useRef)(null),p=(0,i.useRef)(s?.initialValues??{});(0,i.useEffect)((()=>{c&&a?.(p.current[c],"value")}),[]);const f=e=>{const r="string"==typeof e?e:e.currentTarget.value;r!==c?(u.current?.blur(),d(r),a?.(p.current[r],"value")):document.activeElement===u.current&&u.current?.blur()},m=function(e){const r=(0,i.useId)();return(t,n)=>{const a=Array(t.length);let i=0;for(const s of t){const t=s===n;a[t?0:i+=1]=(0,o.jsxs)("label",{style:{userSelect:"none"},children:[s.replace(/\.[^/.]+$/,""),(0,o.jsx)("input",{type:"radio",name:r,value:s,checked:t,onChange:e})]})}return a}}(f),g=t??`Upload ${n??"file"}`,v=Object.keys(p.current).length>1;function b(e,r){if("selection"!==r||null==e)return;const{value:t,initialValues:o}=e;null!=t&&null!=o?.[t]&&t!==c&&o[t]!==p.current[t]&&(p.current[t]=o[t],d(t))}return null!=l&&(0,i.useEffect)((()=>(l.add(b),()=>{l.delete(b)}))),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("label",{style:{gridRow:"span 2"},children:e}),(0,o.jsxs)(z,{onClick:()=>{h.current?.click()},children:[g,(0,o.jsx)("input",{type:"file",style:{display:"none"},ref:h,accept:n,onInput:e=>{const t=e.currentTarget.files?.[0];null!=t&&(p.current[t.name]=r(t),f(t.name))}})]}),(0,o.jsx)(I,{ref:u,tabIndex:v?0:void 0,$disabled:!v,children:(0,o.jsx)(T,{children:(0,o.jsxs)(M,{children:[...m(Object.keys(p.current),c)]})})})]})}var P=t(825);const N=s.Ay.input.attrs({type:"range"})`
    --brightness-hover: 70%;
    --track-color: var(--accent-2);
    --slider-color: oklch(from var(--track-color) calc(l * var(--ok-l2)) calc(c * 0.6) h);

    border-radius: 4px;
    border: solid max(2.5px, 0.1rem) var(--track-color);

    background: #0000;
    transition: 
        background-color 0.3s,
        var(--scale-transition);

    color: var(--slider-color);
    appearance: none;
    overflow: hidden;
    height: max(12px, 0.7rem);
    width: 100%;
    cursor: ew-resize;

    label:not(:hover) + div:has(&) {
        input:hover {
            transform: scale(1.02);

            &::-webkit-slider-thumb {
                color: color-mix(in oklch, var(--slider-color) 50%, var(--track-color));
            }

            &::-moz-range-progress {
                color: color-mix(in oklch, var(--slider-color) 50%, var(--track-color));
            }
        }

        input:active {
            transform: scale(0.98);
        }
    }

    /* === WebKit specific styles === */
    &::-webkit-slider-thumb {
        transition: all 0.3s;
        width: 0;
        appearance: inherit;
        box-shadow: calc(-100vmax + 2px) 0 0
        100vmax currentcolor;
        filter: inherit;
    }

    /* === Firefox specific styles === */
    &::-moz-range-track,
    &::-moz-range-thumb {
        visibility: hidden;
    }

    &::-moz-range-progress {
        background: currentcolor;
        transition: all 0.3s;
        height: 100%;
    }
`,B=(0,s.Ay)(l.A).attrs({defaultFilter:{scale:7,disable:!0},distortChildren:d.E$,minRefresh:200})`
    width: 100%;
    position: relative;
    border-radius: 3px;
    background-color: #0000;

    &:has(*:focus-visible) > div {
        outline: 2px solid var(--hi-vis-gray);
    }
`,O=s.Ay.input.attrs({type:"number"})`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    font: inherit;
    color: inherit;
    appearance: none;
    border: none;
    border-radius: 3px;
    padding-left: 6px;
    background-color: inherit;
    caret-color: var(--hi-vis-gray);

    &::-webkit-inner-spin-button {
        appearance: none;
    }

    &:focus-visible {
        outline: none;
    }
`,R=(0,s.Ay)(l.A).attrs({hoverFilter:{mode:"alternating loop",baseFrequency:.02,scale:6},activeFilter:{mode:"static",baseFrequency:.02,scale:6},tabIndex:0})`
    display: flex;
`;function V({label:e,onChange:r,min:t=0,max:n=10,step:a=1,value:s=5,description:l,callbacks:c}){const d=(0,i.useId)(),[h,u]=(0,i.useState)({min:t,max:n,step:a,value:s}),p=(0,i.useRef)(null),f=e=>{let t=""!==e.target.value?parseFloat(e.target.value):h.min;t=(0,P.qE)(t,h.min,h.max),t!==h.value&&(u({...h,value:t}),r?.(t),p.current?.refreshSeed())};function m(e,r){"max"!==r&&"min"!==r&&"value"!==r&&"step"!==r||h[r]!==e&&u((t=>({...t,[r]:e})))}null!=c&&(0,i.useEffect)((()=>(c.add(m),()=>{c.delete(m)})));const[g,v,b]=A(l);return(0,o.jsxs)(o.Fragment,{children:[g,(0,o.jsx)("label",{style:{position:"relative"},htmlFor:d,onMouseEnter:v,onMouseLeave:b,children:e}),(0,o.jsx)(R,{ref:p,children:(0,o.jsx)(N,{"aria-label":`${e}-slider`,onChange:f,...h})}),(0,o.jsx)(B,{children:(0,o.jsx)(O,{...h,id:d,"aria-label":`${e}-text-input`,onChange:f})})]})}var $=t(3357),L=t(6460),Z=t.n(L),_=t(4977);const W=(0,s.Ay)(_.S).attrs({elementType:"form"})`
    display: grid;
    grid-template-columns: minmax(4rem, auto) minmax(4rem, 0.6fr) minmax(3rem, 0.3fr);
    column-gap: 6px;
    align-items: center;

    transition: 
        height 300ms cubic-bezier(0.4, 0, 0.2, 1),
        var(--scale-transition);

    & > * {
        margin-top: max(8px, 0.3rem);
    }

    & > label {
        user-select: none;
        margin-top: 0;
        padding-top: max(8px, 0.3rem);
        padding-left: max(6px, 0.3rem);
        padding-right: max(6px, 0.3rem);
    }

    & > label:hover:has(+ [role=tooltip]) {
        transform: rotate(-3deg);
    }
`,G=s.Ay.div`
    --mask-width: 0.9rem;
    cursor: move;
    cursor: grab;
    pointer-events: all;

    width: var(--mask-width);

    margin: max(14px, 0.5rem) max(8px, 0.25rem);
    transition: 
        padding-top 0.3s,
        background-color 0.3s;

    &:after {
        content: " ";
        mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNyA5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPiAgCiAgPGNpcmNsZSBjeD0iMiIgY3k9IjEuNSIgcj0iMSI+PC9jaXJjbGU+CiAgPGNpcmNsZSBjeD0iMiIgY3k9IjQuNSIgcj0iMSI+PC9jaXJjbGU+CiAgPGNpcmNsZSBjeD0iNSIgY3k9IjEuNSIgcj0iMSI+PC9jaXJjbGU+CiAgPGNpcmNsZSBjeD0iNSIgY3k9IjQuNSIgcj0iMSI+PC9jaXJjbGU+CiAgPGNpcmNsZSBjeD0iNSIgY3k9IjcuNSIgcj0iMSI+PC9jaXJjbGU+CiAgPGNpcmNsZSBjeD0iMiIgY3k9IjcuNSIgcj0iMSI+PC9jaXJjbGU+Cjwvc3ZnPg==");
        mask-repeat: repeat-y;
        mask-size: var(--mask-width);
        background-color: var(--background-color);
        display: block;
        height: 100%;
        transition: transform 0.3s;
    }
`,q=s.Ay.div`
    margin: 12px;
    margin-left: 0;
`,X=(0,s.Ay)(l.A).attrs({defaultFilter:{scale:7,disable:!0},distortChildren:d.E$,minRefresh:200})`
    background-color: #0000;
    color: var(--accent-1);
    z-index: 2;

    font-size: 0.6rem;
    font-weight: 700;
    font-stretch: 115%;
    border-radius: 5px;

    display: flex;
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;

    & > div:last-of-type {
        background-color: var(--secondary-color);
        box-shadow: color-mix(in oklch, var(--background-color) 50%, black) 6px 6px 4px;
    }
`,D=(0,s.Ay)(z).attrs({forwardedAs:"label"})`
    width: 100%;

    &::after {
        transition: content 0.3s;
        content: "Show Controls";
    }
    
    &:has(input:checked)::after {
        content: "Hide Controls";
    }
`;function Y({children:e}){const r=(0,i.useId)(),t=(0,i.useRef)(null),n=(0,i.useRef)(null),[a,s]=(0,i.useState)(!0);return(0,o.jsx)(Z(),{handle:`#${CSS.escape(r)}`,onDrag:()=>n.current?.refreshSeed(),bounds:"parent",nodeRef:t,children:(0,o.jsxs)(X,{ref:n,forwardedRef:t,children:[(0,o.jsx)(G,{id:r}),(0,o.jsxs)(q,{children:[(0,o.jsx)(D,{children:(0,o.jsx)("input",{type:"checkbox",style:{position:"absolute",top:-9999,left:-9999},onInput:()=>{s((e=>!e))},checked:a,readOnly:!0})}),(0,o.jsx)(W,{isOpen:a,overflowOnExpanded:!0,children:e})]})]})})}const H=(0,s.Ay)(z)`
    grid-column: span 3; 
    color: var(--accent-2); 
    --border-color: var(--accent-2);
`;function U({settings:e}){return(0,o.jsxs)(Y,{children:[...Object.entries(e).map((([e,r])=>{const{[$.t.$type]:t,[$.t.$callback]:n,[$.t.$listeners]:a,...i}=r,s={...i,callbacks:a,label:e,onChange:e=>{r.value=e}};switch(r[$.t.$type]){case"button":return(0,o.jsx)(H,{...i,children:e});case"checkbox":return(0,o.jsx)(S,{...s});case"slider":return(0,o.jsx)(V,{...s});case"file":return(0,o.jsx)(E,{...s});default:throw new Error}}))]})}var Q=t(3205);const J=(0,s.Ay)(l.A).attrs({forwardedAs:"button",defaultFilter:{scale:3},hoverFilter:{animation:"alternating loop",scale:7}})`
    --open-svg: ${({open:e})=>(0,Q.f)(`\n        <svg width="199" height="199" viewBox="-1.62 -1.62 21.24 21.24" xmlns="http://www.w3.org/2000/svg" fill="currentcolor" stroke="currentcolor" stroke-width=".738">\n            <defs>\n                <path \n                    id="arrow"\n                    d="M7.707 6.242 4.42 2.977 5.71 1.7A1 1 0 0 0 5 0H1a1 1 0 0 0-1 .993v3.97a.98.98 0 0 0 .62.913 1.01 1.01 0 0 0 1.09-.208L3 4.388 6.288 7.65a1.01 1.01 0 0 0 1.42 0 .994.994 0 0 0 0-1.41z" \n                />\n            </defs>\n        ${e?'\n                <use href="#arrow" transform="translate(10 10)"/>\n                <use href="#arrow" transform="rotate(90 -1 9)"/>\n                <use href="#arrow" transform="rotate(-90 9 -1)"/>\n                <use href="#arrow" transform="rotate(180 4 4)"/>':'\n                <use href="#arrow"/>\n                <use href="#arrow" transform="rotate(90 9 9)"/>\n                <use href="#arrow" transform="rotate(180 9 9)"/>\n                <use href="#arrow" transform="rotate(-90 9 9)"/>'}\n        </svg>\n    `)};

    padding: 0;
    appearance: none;
    border: none;
    background: none;

    display: flex;
    position: absolute;
    right: 20px;
    top: 20px;

    width: 5%;
    min-width: 30px;
    max-width: 65px;
    aspect-ratio: 1;

    cursor: pointer;
    transform-origin: center;
    transition: var(--scale-transition);
    color: color-mix(in oklab, var(--background-color) 85%, var(--hi-vis-gray));

    &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #0000;
        background-image: var(--open-svg);
        background-size: cover;
        filter: 
            drop-shadow(2px 2px 0px color-mix(in oklab, currentcolor 65%, var(--hi-vis-gray))) 
            drop-shadow(-1px -1px 0px color-mix(in oklab, currentcolor 75%, var(--hi-vis-gray)));
    }

    &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: currentColor;
        mask-image: var(--open-svg);
        mask-size: cover;
    }

    &:hover {
        transform: scale(1.08);

        &:before { 
            filter: 
                drop-shadow(2px 2px 0px var(--accent-3))
                drop-shadow(-1px -1px 0px var(--accent-2));
        }
    }

    &:active {
        transform: scale(0.98);
    }
`;function K({element:e,onClick:r,...t}){const n=(0,i.useCallback)((()=>null!=e?.current&&document.fullscreenElement===e.current),[e]),[a,s]=(0,i.useState)(n()),l=()=>{s(n())},c=(0,i.useCallback)((t=>{const o=n();r?.(t),null!=e&&null!=e.current&&(o?document.exitFullscreen():e.current.requestFullscreen(),s(o))}),[n]);return(0,i.useEffect)((()=>(document.addEventListener("fullscreenchange",l,!1),()=>{document.removeEventListener("fullscreenchange",l)})),[c]),(0,o.jsx)(J,{type:"button","aria-label":"fullscreen",onClick:c,...t,open:a})}t(9887);var ee=t(282);class re{constructor(e){this.camera=e,this.xSensitivity=.25,this.ySensitivity=.25,this.panSpeed=5e-4,this.zoomSensitivity=.001,this.minZoomSpeed=.1,this.maxZoomSpeed=5,this.minZoom=0,this.maxZoom=50,this.currentZoom=2.5,this.focusPoint=ee.eR.create(),this.rotationY=0,this.rotationX=0,this.movement=ee.eR.create(),this.update()}rotate(e,r){this.rotationY-=e*this.xSensitivity,this.rotationY=(this.rotationY+360)%360,this.rotationX-=r*this.ySensitivity,this.rotationX=(0,P.qE)(this.rotationX,-90,90),ee.Yu.fromEuler(this.rotationX*(Math.PI/180),this.rotationY*(Math.PI/180),0,"zyx",this.camera.rotation),this.update()}pan(e,r){const t=this.panSpeed*Math.max(this.currentZoom,.1),o=ee.eR.transformQuat([e*t,r*t,0],this.camera.rotation);ee.eR.add(o,this.focusPoint,this.focusPoint),this.update()}zoom(e){const r=this.currentZoom*Math.abs(e)*this.zoomSensitivity,t=Math.sign(e)*(0,P.qE)(r,this.minZoomSpeed,this.maxZoomSpeed);this.currentZoom=(0,P.qE)(this.currentZoom+t,this.minZoom,this.maxZoom),this.update()}update(){const e=ee.eR.transformQuat([0,0,this.currentZoom],this.camera.rotation,[]);ee.eR.add(e,this.focusPoint,this.camera.location)}}const te=s.Ay.div`
    position: relative;
    width: 100%;
    height: 100%;

    canvas {
        width: 100%;
        height: 100%;
        cursor: grab;
        display: block;
    }
`;function oe({getModelConstructor:e}){const r=(0,i.useRef)(null),n=(0,i.useRef)(null),a=(0,i.useRef)(null),s=(0,i.useRef)(!1),l=(0,i.useRef)(!0),c=(0,i.useRef)(null),d=(0,i.useRef)(0),[h,u]=(0,i.useState)(null),p=e=>{if(null==a.current)return;const r=a.current,{movementX:t,movementY:o}=e;1&d.current&&r.rotate(t,o),2&d.current&&r.zoom(10*o),4&d.current&&r.pan(-t,o)},f=()=>{document.removeEventListener("mousemove",p,!1),r.current?.blur(),r.current&&(0,k.fY)(r.current),s.current&&(s.current=!1,l.current=!1,setTimeout((()=>{l.current=!0}),1500))},m=()=>{document.pointerLockElement===r.current?(s.current=!0,r.current&&(0,k.mh)(r.current,{reserveScrollBarGap:!0}),document.addEventListener("mousemove",p,!1)):f()},g=()=>{document.removeEventListener("pointerlockchange",m),s.current&&f()};(0,i.useEffect)((()=>null==r.current?()=>{}:(document.addEventListener("pointerlockchange",m,!1),null==n.current&&Promise.all([t.e(438).then(t.bind(t,1438)),e()]).then((async([e,t])=>{if(null==r.current)throw new Error("webgpu render -- canvas uninitialized");n.current=await e.default.CreateInitialized(r.current),a.current=new re(n.current.camera);const o=new t(n.current);u(o.settings),requestAnimationFrame(n.current.render)})),g)));const v=null!=h?(0,o.jsx)(U,{settings:h}):void 0;return(0,o.jsxs)(te,{ref:c,children:[(0,o.jsx)(K,{element:c}),(0,o.jsx)("canvas",{ref:r,onMouseDown:e=>{d.current=7&e.buttons,l.current&&r.current?.requestPointerLock()},onMouseUp:e=>{d.current=7&e.buttons,0===d.current&&(s.current=!1,document.exitPointerLock())},onWheel:e=>{s.current&&a.current?.zoom(e.deltaY)},tabIndex:0}),v]})}const ne=s.Ay.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-weight: 500;
    line-height: 1.5;
    background-color: var(--secondary-color);

    > p { 
        margin: 1rem;
    }
`,ae=(0,s.Ay)(l.A).attrs({defaultFilter:{disable:!0,scale:5},distortChildren:d.cg})`
    --border-width: 10px;
    --border-color: var(--background-color);

    aspect-ratio: 1.66 / 1;
    position: relative;
    border: 0px solid #0000;
    width: 100%;
`;function ie({loadModelConstructor:e}){return(0,o.jsx)(ae,{children:null==navigator.gpu?.requestAdapter?(0,o.jsx)(ne,{children:(0,o.jsxs)("p",{children:["This browser does not support webgpu.",(0,o.jsx)("br",{}),(0,o.jsx)("br",{}),"For an up to date list of supported browsers,",(0,o.jsx)("br",{}),"see"," ",(0,o.jsx)("a",{href:"https://caniuse.com/webgpu",children:"caniuse.com/webgpu"}),"."]})}):(0,o.jsx)(oe,{getModelConstructor:e})})}var se=t(7851),le=t(895);const ce=(0,se.a)({theme:"dark",settings:{background:"var(--background-color)",foreground:"var(--hi-vis-color)",caret:"red",selection:"#8884",selectionMatch:"#8880",lineHighlight:"#0000",gutterBackground:"var(--background-color)",gutterForeground:"var(--accent-3)",fontFamily:"Space Mono",fontSize:"min(2vw, 1rem)"},styles:[{tag:le._A.propertyName,"font-style":"italic"},{tag:le._A.literal,color:"var(--accent-3)"},{tag:[le._A.className,le._A.typeName],color:"var(--accent-2)"},{tag:[le._A.string,le._A.special(le._A.brace)],color:"light-dark(#037b55, #c1fba0)"},{tag:le._A.comment,color:"color-mix(in oklab, var(--background-color) 40%, var(--hi-vis-gray))"},{tag:[le._A.keyword,le._A.operator],color:"var(--accent-2)","font-weight":"bold"},{tag:[le._A.brace,le._A.bracket,le._A.paren,le._A.angleBracket],color:"var(--accent-3)","font-weight":"bold"},{tag:[le._A.function(le._A.propertyName),le._A.function(le._A.variableName)],color:"var(--accent-1)","font-weight":"bold"}]}),de=(0,s.Ay)(l.A).attrs({defaultFilter:{disable:!0},distortChildren:d.cg})`
    position: relative;
    --border-color: var(--secondary-color);
    --border-width: 5px;
    border-style: solid;
    border-color: #0000;

    display: flex;
    border-radius: 6px;

    > div:first-of-type {
        flex-grow: 1;
        width: 0;
        overscroll-behavior: contain;
        margin: 0.5rem;
    }
`,he=s.Ay.h1`
    text-transform: capitalize;
`;function ue({loadModelConstructor:e,modelName:r,sourceText:t,children:i}){return(0,o.jsxs)(y,{extendMainWidth:!0,children:[(0,o.jsx)(he,{children:r}),(0,o.jsx)(ie,{loadModelConstructor:e}),i,null!=t?(0,o.jsx)(de,{children:(0,o.jsx)(n.Ay,{theme:ce,editable:!1,maxHeight:"80vh",value:t,extensions:[(0,a.Q2)({jsx:!0,typescript:!0})]})}):void 0]})}},9887:(e,r,t)=>{t.d(r,{A:()=>d});var o,n,a,i=t(282),s=t(8617),l=function(e,r,t,o){if("a"===t&&!o)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof r?e!==r||!o:!r.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===t?o:"a"===t?o.call(e):o?o.value:r.get(e)};class c{constructor(e={}){o.add(this),this.buffer=new ArrayBuffer(n.bufferLength),this.worldToView=new Float32Array(this.buffer,n.worldToViewOffset,s.vV.mat4x4Count),this.viewToClip=new Float32Array(this.buffer,n.viewToClipOffset,s.vV.mat4x4Count),this.worldToClip=new Float32Array(this.buffer,n.worldToClipOffset,s.vV.mat4x4Count),this.viewToWorld=new Float32Array(this.buffer,n.viewToWorldOffset,s.vV.mat4x4Count),this.clipToView=new Float32Array(this.buffer,n.clipToViewOffset,s.vV.mat4x4Count),this.clipToWorld=new Float32Array(this.buffer,n.clipToWorldOffset,s.vV.mat4x4Count),this.location=new Float32Array([0,0,0]),this.rotation=new Float32Array([0,0,0,1]),this.params={nearPlane:.01,farPlane:500,fov:40,width:1920,height:1080,projection:"perspective"},this.updateParams(e)}updateParams(e){this.params={...this.params,...e},l(this,o,"m",a).call(this)}cacheView(){i.pB.fromQuat(this.rotation,this.viewToWorld),i.pB.setTranslation(this.viewToWorld,this.location,this.viewToWorld),i.pB.invert(this.viewToWorld,this.worldToView),i.pB.mul(this.viewToClip,this.worldToView,this.worldToClip),i.pB.mul(this.viewToWorld,this.clipToView,this.clipToWorld)}}n=c,o=new WeakSet,a=function(){if("perspective"===this.params.projection)i.pB.perspective(this.params.fov*(Math.PI/180),this.params.width/this.params.height,this.params.nearPlane,this.params.farPlane,this.viewToClip);else{const e=this.params.width/2,r=this.params.height/2;i.pB.ortho(-e,e,-r,r,this.params.nearPlane,this.params.farPlane,this.viewToClip)}i.pB.invert(this.viewToClip,this.clipToView)},c.worldToViewOffset=0,c.viewToClipOffset=n.worldToViewOffset+s.vV.sizeofMat4x4f,c.worldToClipOffset=n.viewToClipOffset+s.vV.sizeofMat4x4f,c.viewToWorldOffset=n.worldToClipOffset+s.vV.sizeofMat4x4f,c.clipToViewOffset=n.viewToWorldOffset+s.vV.sizeofMat4x4f,c.clipToWorldOffset=n.clipToViewOffset+s.vV.sizeofMat4x4f,c.bufferLength=n.clipToWorldOffset+s.vV.sizeofMat4x4f;const d=c},3357:(e,r,t)=>{t.d(r,{A:()=>l,t:()=>s});var o=t(825);const n=Symbol("PropertyListener -- Type"),a=Symbol("PropertyListener -- Callback"),i=Symbol("PropertyListener -- Listeners"),s=Object.freeze({$type:n,$callback:a,$listeners:i});function l(e){for(const r of Object.values(e))r[i]=new Set;return{publicSettings:(0,o.LG)(e,(e=>new Proxy(e,{set:(e,r,t)=>(e[r]!==t&&(e[r]=t,e[a]?.(t,r)),!0)}))),privateSettings:(0,o.LG)(e,(e=>new Proxy(e,{set:(e,r,t)=>(e[r]!==t&&(e[r]=t,e[i].forEach((e=>{e(t,r)}))),!0)})))}}},3205:(e,r,t)=>{t.d(r,{C:()=>a,f:()=>n});var o=t(9576);function n(e){let r=e.replace(/"/g,"'");return r=r.replace(/>\s{1,}\n*</g,"><"),r=r.replace(/(\s{2,}|\n)/g," "),r=r.replace(/[\r\n%#()<>?[\\\]^`{|}]/g,encodeURIComponent),`url("data:image/svg+xml,${r}")`}function a(e,r="root"){const t=document.getElementById(r);if(null==t)throw new Error("Could not find root element");(0,o.H)(t).render(e)}}}]);
//# sourceMappingURL=434.bundle.js.map