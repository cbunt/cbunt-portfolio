/*! For license information see: https://cbunt.ing/oss-licenses.json */
"use strict";(self.webpackChunkcbunt_portfolio=self.webpackChunkcbunt_portfolio||[]).push([[431],{8203:(e,r,t)=>{t.d(r,{A:()=>i});var o=t(6070),a=t(9683),n=t(553);function i({as:e,children:r,options:{remarkPlugins:t,components:i,...s}={},...l}){const c=e??"article";return(0,o.jsx)(c,{...l,children:(0,o.jsx)(a.o,{components:{h1:"h2",h2:"h3",...i},remarkPlugins:[n.A,...t??[]],...s,children:r})})}},4261:(e,r,t)=>{t.d(r,{A:()=>pe});var o=t(6070),a=t(4233),n=t(9564),i=t(758),s=t(2620),l=t(3864);const c=(0,s.Ay)(l.A).attrs({forwardedAs:"a",defaultFilter:{disable:!0},activeFilter:{scale:7},hoverFilter:{animation:"alternating loop",scale:7}})`
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
`;var d=t(4977),h=t(525);const u=["cubemap-blur","gltf-viewer"].map((e=>e.replaceAll("-"," "))),p=s.Ay.div`
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
    overflow: visible;
    z-index: 10;
`,f=(0,s.Ay)(l.A).attrs({forwardedAs:d.S,defaultFilter:{disable:!0,scale:10,baseFrequency:.02},distortChildren:h.E$})`
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
        background-color: oklch(from var(--background-color) calc(l * var(--ok-l1)) calc(c * var(--ok-c-factor)) h);
    }
`,m=(0,s.Ay)(c).attrs({forwardedAs:"button"})`
    text-transform: uppercase;
    border: none;
    background: none;
    padding: 0;

    color: inherit !important;

    font: inherit;
    cursor: pointer;
`,g=(0,s.Ay)(c)`
    text-transform: uppercase;
    max-width: 100%;
    overflow: hidden;

    &, &:visited {
        color: light-dark(var(--accent-3), var(--accent-1));
    }
`;function v(){const[e,r]=(0,i.useState)(!1),[t,a]=(0,i.useState)(!1),n=(0,i.useMemo)((()=>u.map(((e,r)=>(0,o.jsx)(g,{href:`/samples/${["cubemap-blur","gltf-viewer"][r]}`,children:e},r)))),[]);return(0,o.jsxs)(p,{onMouseLeave:()=>{r(t)},children:[(0,o.jsx)(m,{onMouseDown:()=>{a((e=>!e)),r(!t||e)},onMouseEnter:()=>{r(!0)},onKeyDown:()=>{a((e=>!e)),r(!t)},children:"Samples"}),(0,o.jsxs)(f,{isOpen:e,children:[...n]})]})}const b=s.DU`
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
`,x=s.Ay.div`
    display: flex;
    justify-content: center;
    flex: 10;
    margin: 2.5rem 1rem 1.5rem 0rem;
    min-height: calc(100vh - 4rem);
`,w=s.Ay.div`
    ${({$extendWidth:e})=>e?s.AH`width: min(calc(80vh * 1.66), 100%);`:s.AH`max-width: min(calc(80vh * 1.66), 100%);`}

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`,y=(0,s.Ay)(c)`
    margin-top: 0;
    font-family: 'NerdFontsSymbols Nerd Font';
    rotate: 180deg;
`;function k({children:e,extendMainWidth:r}){return(0,o.jsxs)(i.StrictMode,{children:[(0,o.jsx)(b,{}),(0,o.jsxs)("nav",{children:[(0,o.jsx)(l.A,{style:{pointerEvents:"all",width:"2rem",transform:"rotate(180deg)",aspectRatio:1},defaultFilter:{baseFrequency:.02,scale:10,disable:!0},hoverFilter:{animation:"alternating loop",scale:15},children:(0,o.jsxs)("svg",{viewBox:"0 0 100 75",fill:"#0000",xmlns:"http://www.w3.org/2000/svg",version:"1.1",xlinkHref:"http://www.w3.org/1999/xlink",children:[(0,o.jsxs)("defs",{children:[(0,o.jsxs)("linearGradient",{id:"cyan",x1:"0",y1:"1",x2:"0.75",y2:"0.5",children:[(0,o.jsx)("stop",{offset:"0%",stopColor:"var(--accent-2)"}),(0,o.jsx)("stop",{offset:"100%",stopColor:"#0000"})]}),(0,o.jsxs)("linearGradient",{id:"yellow",x1:"0.5",y1:"0",x2:"0.5",y2:"1",children:[(0,o.jsx)("stop",{offset:"0%",stopColor:"var(--accent-1)"}),(0,o.jsx)("stop",{offset:"100%",stopColor:"#0000"})]}),(0,o.jsxs)("linearGradient",{id:"magenta",x1:"1",y1:"1",x2:"0.25",y2:"0.5",children:[(0,o.jsx)("stop",{offset:"0%",stopColor:"var(--accent-3)"}),(0,o.jsx)("stop",{offset:"100%",stopColor:"#0000"})]})]}),(0,o.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"white",points:"0 75, 50 0, 100 75"}),(0,o.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#magenta)",points:"0 75, 50 0, 100 75"}),(0,o.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#yellow)",points:"0 75, 50 0, 100 75"}),(0,o.jsx)("polygon",{style:{mixBlendMode:"hard-light"},fill:"url(#cyan)",points:"0 75, 50 0, 100 75"})]})}),(0,o.jsxs)("div",{children:[(0,o.jsx)(c,{href:"/",children:"About"}),(0,o.jsx)(v,{}),(0,o.jsx)(c,{href:"/resume",children:"Resume"})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)(y,{href:"https://github.com/cbunt",target:"_blank",rel:"noreferrer noopener",children:""}),(0,o.jsx)(y,{href:"https://www.linkedin.com/in/cbunt",target:"_blank",rel:"noreferrer noopener",children:"󰌻"}),(0,o.jsx)(y,{href:"mailto:cass@cbunt.ing",children:"󰇮"})]})]}),(0,o.jsx)(x,{children:(0,o.jsxs)(w,{$extendWidth:r,children:[(0,o.jsx)("main",{children:e}),(0,o.jsx)("footer",{children:"MIT © 2024"})]})})]})}var j=t(4037),A=t(1968);const C=(0,s.Ay)(l.A).attrs({forwardedAs:A.m_,defaultFilter:{scale:10,disable:!0},distortChildren:h.E$,disableStyleInjection:!0,opacity:1,offset:12})`
    background-color: #0000;
    color: var(--hi-vis-gray);
    padding: 12px;
    font-size: inherit;
    z-index: 5;
    max-width: 10rem;
    width: max-content;
    border-radius: 8px;

    --background-color: var(--secondary-color);
`;function F({children:e,tooltipProps:r,tooltipContent:t,forwardedAs:a,...n}){const s=a??"a",l=(0,i.useId)(),c=(0,i.useRef)(null),d=(0,i.useMemo)((()=>{if(null==t)return;return(0,o.jsx)(C,{...r,id:l,afterHide:()=>{c.current?.refreshSeed(),r?.afterHide?.()},ref:c,children:t})}),[t,r]);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s,{...n,"data-tooltip-id":l,children:e}),d]})}const S=(0,s.Ay)(l.A).attrs({defaultFilter:{scale:6},hoverFilter:{mode:"alternating loop",scale:4},activeFilter:{mode:"static",scale:6}})`
    --height: 1rem;

    width: fit-content;
    justify-self: center;
    height: var(--height);
    display: flex;
    border-radius: 10px;
`,z=s.Ay.input.attrs({type:"checkbox"})`
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

    label:not(:hover) + ${S}:has(&) {
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
`;function T({label:e,value:r,onChange:t=()=>{},callbacks:a,description:n}){const s=(0,i.useId)(),[l,c]=(0,i.useState)(r),d=e=>{"boolean"==typeof e&&e!==l&&c(e)};return null!=a&&(0,i.useEffect)((()=>(a.add(d),()=>{a.delete(d)}))),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(F,{forwardedAs:"label",htmlFor:s,tooltipContent:n,children:e}),(0,o.jsx)(S,{children:(0,o.jsx)(z,{"aria-label":e,checked:l,onChange:e=>{c(e.target.checked),t(e.target.checked)},id:s})}),(0,o.jsx)("div",{})]})}const M=(0,s.Ay)(l.A).attrs({forwardedAs:"button",type:"button",defaultFilter:{disable:!0,scale:5,baseFrequency:.02,numOctaves:1},hoverFilter:{animation:"alternating loop",scale:4,baseFrequency:.01},activeFilter:{scale:5,baseFrequency:.01},distortChildren:h.cg})`
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
`,I=(0,s.Ay)(l.A).attrs({defaultFilter:{disable:!0},distortChildren:h.E$})`
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
`,P=s.Ay.div`
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
`,E=s.Ay.div`
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
`;function N({label:e,process:r,buttonText:t,accept:a,onChange:n,selection:s,callbacks:l}){const[c,d]=(0,i.useState)(s?.value),h=(0,i.useRef)(null),u=(0,i.useRef)(null),p=(0,i.useRef)(s?.initialValues??{});(0,i.useEffect)((()=>{c&&n?.(p.current[c],"value")}),[]);const f=e=>{const r="string"==typeof e?e:e.currentTarget.value;r!==c?(u.current?.blur(),d(r),n?.(p.current[r],"value")):document.activeElement===u.current&&u.current?.blur()},m=function(e){const r=(0,i.useId)();return(t,a)=>{const n=Array(t.length);let i=0;for(const s of t){const t=s===a;n[t?0:i+=1]=(0,o.jsxs)("label",{style:{userSelect:"none"},children:[s.replace(/\.[^/.]+$/,""),(0,o.jsx)("input",{type:"radio",name:r,value:s,checked:t,onChange:e})]})}return n}}(f),g=t??`Upload ${a??"file"}`,v=Object.keys(p.current).length>1;function b(e,r){if("selection"!==r||null==e)return;const{value:t,initialValues:o}=e;null!=t&&null!=o?.[t]&&t!==c&&o[t]!==p.current[t]&&(p.current[t]=o[t],d(t))}return null!=l&&(0,i.useEffect)((()=>(l.add(b),()=>{l.delete(b)}))),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("label",{style:{gridRow:"span 2"},children:e}),(0,o.jsxs)(M,{onClick:()=>{h.current?.click()},children:[g,(0,o.jsx)("input",{type:"file",style:{display:"none"},ref:h,accept:a,onInput:e=>{const t=e.currentTarget.files?.[0];null!=t&&(p.current[t.name]=r(t),f(t.name))}})]}),(0,o.jsx)(E,{ref:u,tabIndex:v?0:void 0,$disabled:!v,children:(0,o.jsx)(I,{children:(0,o.jsxs)(P,{children:[...m(Object.keys(p.current),c)]})})})]})}var B=t(5225);const R=s.Ay.input.attrs({type:"range"})`
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
`,O=(0,s.Ay)(l.A).attrs({defaultFilter:{scale:7,disable:!0},distortChildren:h.E$,minRefresh:200})`
    width: 100%;
    position: relative;
    border-radius: 3px;
    background-color: #0000;

    &:has(*:focus-visible) > div {
        outline: 2px solid var(--hi-vis-gray);
    }
`,V=s.Ay.input.attrs({type:"number"})`
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
`,$=(0,s.Ay)(l.A).attrs({hoverFilter:{mode:"alternating loop",baseFrequency:.02,scale:6},activeFilter:{mode:"static",baseFrequency:.02,scale:6}})`
    display: flex;
`;function W({label:e,onChange:r,min:t=0,max:a=10,step:n=1,value:s=5,description:l,callbacks:c}){const d=(0,i.useId)(),[h,u]=(0,i.useState)({min:t,max:a,step:n,value:s}),p=(0,i.useRef)(null),f=e=>{let t=""!==e.target.value?parseFloat(e.target.value):h.min;t=(0,B.qE)(t,h.min,h.max),t!==h.value&&(u({...h,value:t}),r?.(t),p.current?.refreshSeed())};function m(e,r){"max"!==r&&"min"!==r&&"value"!==r&&"step"!==r||h[r]!==e&&u((t=>({...t,[r]:e})))}return null!=c&&(0,i.useEffect)((()=>(c.add(m),()=>{c.delete(m)}))),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(F,{forwardedAs:"label",htmlFor:d,tooltipContent:l,children:e}),(0,o.jsx)($,{ref:p,children:(0,o.jsx)(R,{"aria-label":`${e}-slider`,onChange:f,...h})}),(0,o.jsx)(O,{children:(0,o.jsx)(V,{...h,id:d,"aria-label":`${e}-text-input`,onChange:f})})]})}var _=t(541),Z=t(6460),L=t.n(Z);const G=(0,s.Ay)(d.S).attrs({elementType:"form"})`
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
`,q=s.Ay.div`
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
`,X=s.Ay.div`
    margin: 12px;
    margin-left: 0;
`,D=(0,s.Ay)(l.A).attrs({defaultFilter:{scale:7,disable:!0},distortChildren:h.E$,minRefresh:200})`
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
        background-color: oklch(from var(--background-color) calc(l * var(--ok-l1)) calc(c * var(--ok-c-factor)) h);
        box-shadow: color-mix(in oklch, var(--background-color) 50%, black) 6px 6px 4px;
    }
`,Y=(0,s.Ay)(M).attrs({forwardedAs:"label"})`
    width: 100%;

    &::after {
        transition: content 0.3s;
        content: "Show Controls";
    }
    
    &:has(input:checked)::after {
        content: "Hide Controls";
    }
`;function H({children:e}){const r=(0,i.useId)(),t=(0,i.useRef)(null),a=(0,i.useRef)(null),[n,s]=(0,i.useState)(!0);return(0,o.jsx)(L(),{handle:`#${CSS.escape(r)}`,onDrag:()=>a.current?.refreshSeed(),bounds:"parent",nodeRef:t,children:(0,o.jsxs)(D,{ref:a,forwardedRef:t,children:[(0,o.jsx)(q,{id:r}),(0,o.jsxs)(X,{children:[(0,o.jsx)(Y,{children:(0,o.jsx)("input",{type:"checkbox",style:{position:"absolute",top:-9999,left:-9999},onInput:()=>{s((e=>!e))},checked:n,readOnly:!0})}),(0,o.jsx)(G,{isOpen:n,overflowOnExpanded:!0,children:e})]})]})})}const U=(0,s.Ay)(M)`
    grid-column: span 3; 
    color: var(--accent-2); 
    --border-color: var(--accent-2);
`;function Q({settings:e}){return(0,o.jsxs)(H,{children:[...Object.entries(e).map((([e,r])=>{const{[_.t.$type]:t,[_.t.$callback]:a,[_.t.$listeners]:n,...i}=r,s={...i,callbacks:n,label:e,onChange:e=>{r.value=e}};switch(r[_.t.$type]){case"button":return(0,o.jsx)(U,{...i,children:e});case"checkbox":return(0,o.jsx)(T,{...s});case"slider":return(0,o.jsx)(W,{...s});case"file":return(0,o.jsx)(N,{...s});default:throw new Error}}))]})}var J=t(8245);const K=(0,s.Ay)(l.A).attrs({forwardedAs:"button",defaultFilter:{scale:3},hoverFilter:{animation:"alternating loop",scale:7}})`
    --open-svg: ${({open:e})=>(0,J.f)(`\n        <svg width="199" height="199" viewBox="-1.62 -1.62 21.24 21.24" xmlns="http://www.w3.org/2000/svg" fill="currentcolor" stroke="currentcolor" stroke-width=".738">\n            <defs>\n                <path \n                    id="arrow"\n                    d="M7.707 6.242 4.42 2.977 5.71 1.7A1 1 0 0 0 5 0H1a1 1 0 0 0-1 .993v3.97a.98.98 0 0 0 .62.913 1.01 1.01 0 0 0 1.09-.208L3 4.388 6.288 7.65a1.01 1.01 0 0 0 1.42 0 .994.994 0 0 0 0-1.41z" \n                />\n            </defs>\n        ${e?'\n                <use href="#arrow" transform="translate(10 10)"/>\n                <use href="#arrow" transform="rotate(90 -1 9)"/>\n                <use href="#arrow" transform="rotate(-90 9 -1)"/>\n                <use href="#arrow" transform="rotate(180 4 4)"/>':'\n                <use href="#arrow"/>\n                <use href="#arrow" transform="rotate(90 9 9)"/>\n                <use href="#arrow" transform="rotate(180 9 9)"/>\n                <use href="#arrow" transform="rotate(-90 9 9)"/>'}\n        </svg>\n    `)};

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
`;function ee({element:e,onClick:r,...t}){const a=(0,i.useCallback)((()=>null!=e?.current&&document.fullscreenElement===e.current),[e]),[n,s]=(0,i.useState)(a()),l=()=>{s(a())},c=(0,i.useCallback)((t=>{const o=a();r?.(t),null!=e&&null!=e.current&&(o?document.exitFullscreen():e.current.requestFullscreen(),s(o))}),[a]);return(0,i.useEffect)((()=>(document.addEventListener("fullscreenchange",l,!1),()=>{document.removeEventListener("fullscreenchange",l)})),[c]),(0,o.jsx)(K,{type:"button","aria-label":"fullscreen",onClick:c,...t,open:n})}t(3519);var re=t(282);class te{constructor(e){this.camera=e,this.xSensitivity=.25,this.ySensitivity=.25,this.panSpeed=5e-4,this.zoomSensitivity=.001,this.minZoomSpeed=.1,this.maxZoomSpeed=5,this.minZoom=0,this.maxZoom=50,this.currentZoom=2.5,this.focusPoint=re.eR.create(),this.rotationY=0,this.rotationX=0,this.movement=re.eR.create(),this.update()}rotate(e,r){this.rotationY-=e*this.xSensitivity,this.rotationY=(this.rotationY+360)%360,this.rotationX-=r*this.ySensitivity,this.rotationX=(0,B.qE)(this.rotationX,-90,90),re.Yu.fromEuler(this.rotationX*(Math.PI/180),this.rotationY*(Math.PI/180),0,"zyx",this.camera.rotation),this.update()}pan(e,r){const t=this.panSpeed*Math.max(this.currentZoom,.1),o=re.eR.transformQuat([e*t,r*t,0],this.camera.rotation);re.eR.add(o,this.focusPoint,this.focusPoint),this.update()}zoom(e){const r=this.currentZoom*Math.abs(e)*this.zoomSensitivity,t=Math.sign(e)*(0,B.qE)(r,this.minZoomSpeed,this.maxZoomSpeed);this.currentZoom=(0,B.qE)(this.currentZoom+t,this.minZoom,this.maxZoom),this.update()}update(){const e=re.eR.transformQuat([0,0,this.currentZoom],this.camera.rotation,[]);re.eR.add(e,this.focusPoint,this.camera.location)}}const oe=s.Ay.div`
    position: relative;
    width: 100%;
    height: 100%;

    canvas {
        width: 100%;
        height: 100%;
        cursor: grab;
        display: block;
    }
`;function ae({getModelConstructor:e}){const r=(0,i.useRef)(null),a=(0,i.useRef)(null),n=(0,i.useRef)(null),s=(0,i.useRef)(!1),l=(0,i.useRef)(!0),c=(0,i.useRef)(null),d=(0,i.useRef)(0),[h,u]=(0,i.useState)(null),p=e=>{if(null==n.current)return;const r=n.current,{movementX:t,movementY:o}=e;1&d.current&&r.rotate(t,o),2&d.current&&r.zoom(10*o),4&d.current&&r.pan(-t,o)},f=()=>{document.removeEventListener("mousemove",p,!1),r.current?.blur(),r.current&&(0,j.fY)(r.current),s.current&&(s.current=!1,l.current=!1,setTimeout((()=>{l.current=!0}),1500))},m=()=>{document.pointerLockElement===r.current?(s.current=!0,r.current&&(0,j.mh)(r.current,{reserveScrollBarGap:!0}),document.addEventListener("mousemove",p,!1)):f()},g=()=>{document.removeEventListener("pointerlockchange",m),s.current&&f()};(0,i.useEffect)((()=>null==r.current?()=>{}:(document.addEventListener("pointerlockchange",m,!1),null==a.current&&Promise.all([t.e(377).then(t.bind(t,377)),e()]).then((async([e,t])=>{if(null==r.current)throw new Error("webgpu render -- canvas uninitialized");a.current=await e.default.CreateInitialized(r.current),n.current=new te(a.current.camera);const o=new t(a.current);u(o.settings),requestAnimationFrame(a.current.render)})),g)));const v=null!=h?(0,o.jsx)(Q,{settings:h}):void 0;return(0,o.jsxs)(oe,{ref:c,children:[(0,o.jsx)(ee,{element:c}),(0,o.jsx)("canvas",{ref:r,onMouseDown:e=>{d.current=7&e.buttons,l.current&&r.current?.requestPointerLock()},onMouseUp:e=>{d.current=7&e.buttons,0===d.current&&(s.current=!1,document.exitPointerLock())},onWheel:e=>{s.current&&n.current?.zoom(e.deltaY)},tabIndex:0}),v]})}const ne=s.Ay.div`
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
`,ie=(0,s.Ay)(l.A).attrs({defaultFilter:{disable:!0,scale:5},distortChildren:h.cg})`
    --border-width: 10px;
    --border-color: var(--background-color);

    aspect-ratio: 1.66 / 1;
    position: relative;
    border: 0px solid #0000;
    width: 100%;
`;function se({getModelConstructor:e}){return(0,o.jsx)(ie,{children:null==navigator.gpu?.requestAdapter?(0,o.jsx)(ne,{children:(0,o.jsxs)("p",{children:["This browser does not support webgpu.",(0,o.jsx)("br",{}),(0,o.jsx)("br",{}),"For an up to date list of supported browsers,",(0,o.jsx)("br",{}),"see"," ",(0,o.jsx)("a",{href:"https://caniuse.com/webgpu",children:"caniuse.com/webgpu"}),"."]})}):(0,o.jsx)(ae,{getModelConstructor:e})})}var le=t(9135),ce=t(895);const de=(0,le.a)({theme:"dark",settings:{background:"var(--background-color)",foreground:"var(--hi-vis-color)",caret:"red",selection:"#8884",selectionMatch:"#8880",lineHighlight:"#0000",gutterBackground:"var(--background-color)",gutterForeground:"var(--accent-3)",fontFamily:"Space Mono"},styles:[{tag:ce._A.propertyName,"font-style":"italic"},{tag:ce._A.literal,color:"var(--accent-3)"},{tag:[ce._A.className,ce._A.typeName],color:"var(--accent-2)"},{tag:[ce._A.string,ce._A.special(ce._A.brace)],color:"light-dark(#037b55, #c1fba0)"},{tag:ce._A.comment,color:"color-mix(in oklab, var(--background-color) 40%, var(--hi-vis-gray))"},{tag:[ce._A.keyword,ce._A.operator],color:"var(--accent-2)","font-weight":"bold"},{tag:[ce._A.brace,ce._A.bracket,ce._A.paren,ce._A.angleBracket],color:"var(--accent-3)","font-weight":"bold"},{tag:[ce._A.function(ce._A.propertyName),ce._A.function(ce._A.variableName)],color:"var(--accent-1)","font-weight":"bold"}]}),he=(0,s.Ay)(l.A).attrs({defaultFilter:{disable:!0},distortChildren:h.cg})`
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
`,ue=s.Ay.h1`
    text-transform: capitalize;
`;function pe({getModelConstructor:e,modelName:r,sourceText:t,children:i}){return(0,o.jsxs)(k,{extendMainWidth:!0,children:[(0,o.jsx)(ue,{children:r}),null!=e?(0,o.jsx)(se,{getModelConstructor:e}):void 0,i,null!=t?(0,o.jsx)(he,{children:(0,o.jsx)(a.Ay,{theme:de,editable:!1,maxHeight:"80vh",value:t,extensions:[(0,n.Q2)({jsx:!0,typescript:!0})]})}):void 0]})}},3519:(e,r,t)=>{t.d(r,{A:()=>d});var o,a,n,i=t(282),s=t(2009),l=function(e,r,t,o){if("a"===t&&!o)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof r?e!==r||!o:!r.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===t?o:"a"===t?o.call(e):o?o.value:r.get(e)};class c{constructor(e={}){o.add(this),this.buffer=new ArrayBuffer(a.bufferLength),this.worldToView=new Float32Array(this.buffer,a.worldToViewOffset,s.vV.mat4x4Count),this.viewToClip=new Float32Array(this.buffer,a.viewToClipOffset,s.vV.mat4x4Count),this.worldToClip=new Float32Array(this.buffer,a.worldToClipOffset,s.vV.mat4x4Count),this.viewToWorld=new Float32Array(this.buffer,a.viewToWorldOffset,s.vV.mat4x4Count),this.clipToView=new Float32Array(this.buffer,a.clipToViewOffset,s.vV.mat4x4Count),this.clipToWorld=new Float32Array(this.buffer,a.clipToWorldOffset,s.vV.mat4x4Count),this.location=new Float32Array([0,0,0]),this.rotation=new Float32Array([0,0,0,1]),this.params={nearPlane:.01,farPlane:500,fov:40,width:1920,height:1080,projection:"perspective"},this.updateParams(e)}updateParams(e){this.params={...this.params,...e},l(this,o,"m",n).call(this)}cacheView(){i.pB.fromQuat(this.rotation,this.viewToWorld),i.pB.setTranslation(this.viewToWorld,this.location,this.viewToWorld),i.pB.invert(this.viewToWorld,this.worldToView),i.pB.mul(this.viewToClip,this.worldToView,this.worldToClip),i.pB.mul(this.viewToWorld,this.clipToView,this.clipToWorld)}}a=c,o=new WeakSet,n=function(){if("perspective"===this.params.projection)i.pB.perspective(this.params.fov*(Math.PI/180),this.params.width/this.params.height,this.params.nearPlane,this.params.farPlane,this.viewToClip);else{const e=this.params.width/2,r=this.params.height/2;i.pB.ortho(-e,e,-r,r,this.params.nearPlane,this.params.farPlane,this.viewToClip)}i.pB.invert(this.viewToClip,this.clipToView)},c.worldToViewOffset=0,c.viewToClipOffset=a.worldToViewOffset+s.vV.sizeofMat4x4f,c.worldToClipOffset=a.viewToClipOffset+s.vV.sizeofMat4x4f,c.viewToWorldOffset=a.worldToClipOffset+s.vV.sizeofMat4x4f,c.clipToViewOffset=a.viewToWorldOffset+s.vV.sizeofMat4x4f,c.clipToWorldOffset=a.clipToViewOffset+s.vV.sizeofMat4x4f,c.bufferLength=a.clipToWorldOffset+s.vV.sizeofMat4x4f;const d=c},541:(e,r,t)=>{t.d(r,{A:()=>l,t:()=>s});var o=t(5225);const a=Symbol("PropertyListener -- Type"),n=Symbol("PropertyListener -- Callback"),i=Symbol("PropertyListener -- Listeners"),s=Object.freeze({$type:a,$callback:n,$listeners:i});function l(e){for(const r of Object.values(e))r[i]=new Set;return{publicSettings:(0,o.LG)(e,(e=>new Proxy(e,{set:(e,r,t)=>(e[r]!==t&&(e[r]=t,e[n]?.(t,r)),!0)}))),privateSettings:(0,o.LG)(e,(e=>new Proxy(e,{set:(e,r,t)=>(e[r]!==t&&(e[r]=t,e[i].forEach((e=>{e(t,r)}))),!0)})))}}},8245:(e,r,t)=>{t.d(r,{C:()=>n,f:()=>a});var o=t(9576);function a(e){let r=e.replace(/"/g,"'");return r=r.replace(/>\s{1,}\n*</g,"><"),r=r.replace(/(\s{2,}|\n)/g," "),r=r.replace(/[\r\n%#()<>?[\\\]^`{|}]/g,encodeURIComponent),`url("data:image/svg+xml,${r}")`}function n(e,r="root"){const t=document.getElementById(r);if(null==t)throw new Error("Could not find root element");(0,o.H)(t).render(e)}}}]);
//# sourceMappingURL=431.bundle.js.map