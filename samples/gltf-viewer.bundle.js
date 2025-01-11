/*! For license information see: https://cbunt.ing/oss-licenses.json */
(()=>{"use strict";var e,r,n,t,o,i,s,a,l,u,c,d,p={2349:(e,r,n)=>{function t(e,r){const n=Object.entries(e).map((([e,n])=>[e,r(n)]));return Object.fromEntries(n)}function o(e,r,n){return Math.max(r,Math.min(n,e))}function i(e,...r){const n=[e[0]];return r.forEach(((r,t)=>{return n.push(null==(o=r)||""===o?"":` ${o}`,e[t+1]);var o})),n.join("")}function s(e,r){return function(e){return[...Array(e).keys()]}(e).map(r)}function a(e,r){let n;return function(...t){const o=self;null!=n&&clearTimeout(n),n=setTimeout((()=>{e.apply(o,t)}),r)}}function l(e,r,n,t=0,o=e.length-1){if(o-t<=1)n(r,e[t]??r)<0?e.splice(t,0,r):n(r,e[o]??r)>0?e.splice(o+1,0,r):e.splice(o,0,r);else{const i=Math.floor((o-t)/2)+t;n(r,e[i])<0?l(e,r,n,t,i):l(e,r,n,i,o)}}function u(e){return"object"==typeof e&&null!=e}n.d(r,{Gv:()=>u,LG:()=>t,OY:()=>i,_b:()=>s,nn:()=>l,qE:()=>o,sg:()=>a})},1937:(e,r,n)=>{var t=n(7577),o=n(5105),i=n(5855);const s=()=>Promise.all([n.e(353),n.e(446)]).then(n.bind(n,2446)).then((e=>e.default));function a(e){const r={a:"a",li:"li",p:"p",ul:"ul",...e.components};return(0,o.jsxs)(i.A,{modelName:"glTF Viewer",loadModelConstructor:s,children:[(0,o.jsxs)(r.p,{children:["A glTF renderer written in WebGPU and Typescript. Includes deferred rendering and\nmulti-scattering image based lighting adapted from https://bruop.github.io/ibl/.\nModels with unsupported features will likely load without issue, but will display\nincorrectly. Included assets are pulled directly from their repos. Models are from\n",(0,o.jsx)(r.a,{href:"https://github.com/KhronosGroup/glTF-Sample-Assets",children:"glTF Sample Assets"}),"\nand environment maps are from\n",(0,o.jsx)(r.a,{href:"https://github.com/KhronosGroup/glTF-Sample-Environments",children:"glTF Sample Environments"}),"."]}),(0,o.jsx)(r.p,{children:"Unsupported features:"}),(0,o.jsxs)(r.ul,{children:["\n",(0,o.jsx)(r.li,{children:"Skinned Meshes"}),"\n",(0,o.jsx)(r.li,{children:"Animations"}),"\n",(0,o.jsx)(r.li,{children:"Cameras"}),"\n"]}),(0,o.jsx)(r.p,{children:"Supported extensions:"}),(0,o.jsxs)(r.ul,{children:["\n",(0,o.jsx)(r.li,{children:(0,o.jsx)(r.a,{href:"https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_emissive_strength/README.md",children:"KHR_materials_emissive_strength"})}),"\n"]})]})}(0,t.A)((function(e={}){const{wrapper:r}=e.components||{};return r?(0,o.jsx)(r,{...e,children:(0,o.jsx)(a,{...e})}):a(e)}))}},f={};function m(e){var r=f[e];if(void 0!==r)return r.exports;var n=f[e]={id:e,loaded:!1,exports:{}};return p[e](n,n.exports,m),n.loaded=!0,n.exports}m.m=p,m.c=f,e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",r="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",n="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",t=e=>{e&&e.d<1&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},m.a=(o,i,s)=>{var a;s&&((a=[]).d=-1);var l,u,c,d=new Set,p=o.exports,f=new Promise(((e,r)=>{c=r,u=e}));f[r]=p,f[e]=e=>(a&&e(a),d.forEach(e),f.catch((e=>{}))),o.exports=f,i((o=>{var i;l=(o=>o.map((o=>{if(null!==o&&"object"==typeof o){if(o[e])return o;if(o.then){var i=[];i.d=0,o.then((e=>{s[r]=e,t(i)}),(e=>{s[n]=e,t(i)}));var s={};return s[e]=e=>e(i),s}}var a={};return a[e]=e=>{},a[r]=o,a})))(o);var s=()=>l.map((e=>{if(e[n])throw e[n];return e[r]})),u=new Promise((r=>{(i=()=>r(s)).r=0;var n=e=>e!==a&&!d.has(e)&&(d.add(e),e&&!e.d&&(i.r++,e.push(i)));l.map((r=>r[e](n)))}));return i.r?u:s()}),(e=>(e?c(f[n]=e):u(p),t(a)))),a&&a.d<0&&(a.d=0)},o=[],m.O=(e,r,n,t)=>{if(!r){var i=1/0;for(u=0;u<o.length;u++){for(var[r,n,t]=o[u],s=!0,a=0;a<r.length;a++)(!1&t||i>=t)&&Object.keys(m.O).every((e=>m.O[e](r[a])))?r.splice(a--,1):(s=!1,t<i&&(i=t));if(s){o.splice(u--,1);var l=n();void 0!==l&&(e=l)}}return e}t=t||0;for(var u=o.length;u>0&&o[u-1][2]>t;u--)o[u]=o[u-1];o[u]=[r,n,t]},m.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return m.d(r,{a:r}),r},m.d=(e,r)=>{for(var n in r)m.o(r,n)&&!m.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},m.f={},m.e=e=>Promise.all(Object.keys(m.f).reduce(((r,n)=>(m.f[n](e,r),r)),[])),m.u=e=>e+".bundle.js",m.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),m.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),i={},s="cbunt-portfolio:",m.l=(e,r,n,t)=>{if(i[e])i[e].push(r);else{var o,a;if(void 0!==n)for(var l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var c=l[u];if(c.getAttribute("src")==e||c.getAttribute("data-webpack")==s+n){o=c;break}}o||(a=!0,(o=document.createElement("script")).charset="utf-8",o.timeout=120,m.nc&&o.setAttribute("nonce",m.nc),o.setAttribute("data-webpack",s+n),o.src=e),i[e]=[r];var d=(r,n)=>{o.onerror=o.onload=null,clearTimeout(p);var t=i[e];if(delete i[e],o.parentNode&&o.parentNode.removeChild(o),t&&t.forEach((e=>e(n))),r)return r(n)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=d.bind(null,o.onerror),o.onload=d.bind(null,o.onload),a&&document.head.appendChild(o)}},m.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},m.j=915,m.p="/",(()=>{var e={915:0};m.f.j=(r,n)=>{var t=m.o(e,r)?e[r]:void 0;if(0!==t)if(t)n.push(t[2]);else{var o=new Promise(((n,o)=>t=e[r]=[n,o]));n.push(t[2]=o);var i=m.p+m.u(r),s=new Error;m.l(i,(n=>{if(m.o(e,r)&&(0!==(t=e[r])&&(e[r]=void 0),t)){var o=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;s.message="Loading chunk "+r+" failed.\n("+o+": "+i+")",s.name="ChunkLoadError",s.type=o,s.request=i,t[1](s)}}),"chunk-"+r,r)}},m.O.j=r=>0===e[r];var r=(r,n)=>{var t,o,[i,s,a]=n,l=0;if(i.some((r=>0!==e[r]))){for(t in s)m.o(s,t)&&(m.m[t]=s[t]);if(a)var u=a(m)}for(r&&r(n);l<i.length;l++)o=i[l],m.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return m.O(u)},n=self.webpackChunkcbunt_portfolio=self.webpackChunkcbunt_portfolio||[];n.forEach(r.bind(null,0)),n.push=r.bind(null,n.push.bind(n))})(),m.nc=void 0,u={},c={7814:function(){return{"./mikktspace_module_bg.js":{__wbindgen_string_new:function(e,r){return void 0===a&&(a=m.c[6565].exports),a.yc(e,r)},__wbindgen_rethrow:function(e){return void 0===l&&(l=m.c[6565].exports),l.PG(e)}}}}},d={451:[7814]},m.w={},m.f.wasm=function(e,r){(d[e]||[]).forEach((function(n,t){var o=u[n];if(o)r.push(o);else{var i,s=c[n](),a=fetch(m.p+""+{451:{7814:"a601c671eced5b06f1e1"}}[e][n]+".module.wasm");i=s&&"function"==typeof s.then&&"function"==typeof WebAssembly.compileStreaming?Promise.all([WebAssembly.compileStreaming(a),s]).then((function(e){return WebAssembly.instantiate(e[0],e[1])})):"function"==typeof WebAssembly.instantiateStreaming?WebAssembly.instantiateStreaming(a,s):a.then((function(e){return e.arrayBuffer()})).then((function(e){return WebAssembly.instantiate(e,s)})),r.push(u[n]=i.then((function(e){return m.w[n]=(e.instance||e).exports})))}}))};var h=m.O(void 0,[788,637,44,577,855],(()=>m(1937)));h=m.O(h)})();
//# sourceMappingURL=gltf-viewer.bundle.js.map