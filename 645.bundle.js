/*! For license information see: https://cbunt.ing/oss-licenses.json */
"use strict";(self.webpackChunkcbunt_portfolio=self.webpackChunkcbunt_portfolio||[]).push([[645],{1044:(e,r,t)=>{t.d(r,{y:()=>a});var n=t(3706);t(8452);function a(e){const r=new TextDecoder,t=e instanceof Uint8Array?e:new Uint8Array(e);let a=0;const i=(e=1024)=>{const n=Math.min(t.length,e+a),i=t.subarray(a,n),o=i.indexOf(10)+1;return a+=o,0===o?void 0:r.decode(i.subarray(0,o))},o=e=>new Error("HDR Import Error: "+e),s=i();if(null==s)throw o("no header found");if(!/^#\?(\S+)/.test(s))throw o("bad initial token");const l=new RegExp(`^\\s*(${[/FORMAT=(?<format>\S+)/,/-Y\s+(?<Y>\d+)\s+\+X\s+(?<X>\d+)/,/EXPOSURE\s*=\s*(?<exposure>\d+(\.\d+)?)/,/GAMMA\s*=\s*(?<gamma>\d+(\.\d+)?)/].map((({source:e})=>`(${e})`)).join("|")})\\s*$`);let u,c,g,f=!0,b=1,m=1;for(let e=i();null!=e;e=null==u?i():void 0){const r=e.match(l)?.groups;null!=r&&(null!=r.format?f=!1:null!=r.X&&null!=r.Y?(u=parseInt(r.X),c=parseInt(r.Y)):null!=r.gamma?b=parseFloat(r.gamma):null!=r.exposure&&(m=parseFloat(r.exposure)))}if(f)throw o("missing format specifier");if(null==u||null==c)throw o("missing image size specifier");const d=u<8||u>32767,h=2!==t[a]||2!==t[a+1]||!!(128&t[a+2]);if(d||h)g=t.subarray(a);else{g=new Uint8Array(u*c*4);const e=4*u,r=new Uint8Array(e),n=t.byteLength;for(let i=0,s=0;i<c&&a<n;i++){if(a+4>n)throw o("file ended durning scanline");if(2!=t[a++]||2!=t[a++]||(t[a++]<<8|t[a++])!=u)throw o("bad rgbe scanline format");let i;for(let s=0;s<e&&a<n;s+=i){i=t[a++];const n=i>128;if(n&&(i-=128),0==i||s+i>e)throw o("bad scanline data");n?(r.fill(t[a],s,s+i),a+=1):(r.set(t.subarray(a,a+i),s),a+=i)}for(let t=0;t<u;t++)for(let n=0;n<e;n+=u)g[s++]=r[t+n]}}const p=new Uint16Array(g.length),y=(0,n.Q)(1);for(let e=0;e<u*c*4;e+=4){const r=g[e+3],t=Math.pow(2,r-128)/255;for(let r=0;r<3;r+=1)p[e+r]=(0,n.Q)(Math.min(g[e+r]*t,65504));p[e+3]=y}return{data:p,width:u,height:c,gamma:b,exposure:m}}},1075:(e,r,t)=>{t.d(r,{Lr:()=>o,gU:()=>l});var n=t(1326),a=t(6810),i=t(5834);function o(e,r,t,n,a=4){const i=a-1,o=t.createBuffer({label:n,usage:r,size:e.byteLength+i&~i,mappedAtCreation:!0}),s=new Uint8Array(o.getMappedRange()),l=e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength);return s.set(l),o.unmap(),o}async function s({device:e,texture:r,mipLevel:t=0,returnBuffer:n,storageBuffer:o,resultBuffer:s,description:l}){const u=a.T2[r.format],c=i.OY`[textureToKTX${l??""}${r.label}] --`;if(null==u)throw new Error(`${c} format ${r.format} unsupported`);const g=r.width>>t,f=r.height>>t,b=g*u,m=Math.max(b,256),d=f,h=d*m*r.depthOrArrayLayers,p=b*f*r.depthOrArrayLayers;if(null!=s&&s.byteLength<h)throw new Error(`${c} given result array not large enough.\n${s.byteLength} < ${h}`);if(null!=o&&o.size<h)throw new Error(`${c} given storage buffer not large enough.\n${o.size} < ${h}`);const y=GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ;if(null!=o&&(o.usage&y)!==y)throw new Error(`${c} given storage does not have correct usage flags.\nGiven: ${o.usage}\nRequired: ${y}`);let v=s??new Uint8Array(h);const w=o??e.createBuffer({label:`${c} storage buffer`,size:h,usage:y}),x=e.createCommandEncoder({label:`${c} encoder`});x.copyTextureToBuffer({texture:r,mipLevel:t},{buffer:w,rowsPerImage:d,bytesPerRow:m},{width:g,height:f,depthOrArrayLayers:r.depthOrArrayLayers}),e.queue.submit([x.finish()]),await Promise.all([w.mapAsync(GPUMapMode.READ,0,h),e.queue.onSubmittedWorkDone()]);const A=w.getMappedRange(0,h);if(v.set(new Uint8Array(A)),w.unmap(),m>b){for(let e=0;e<f*r.depthOrArrayLayers;e+=1)for(let r=0;r<b;r+=1)v[r+e*b]=v[r+e*m];v=v.slice(0,p)}return{imageData:v,storageBuffer:n?w:void 0}}async function l(e,r,t=!1){const o=a.T2[r.format],l=a.GE[r.format];if(null==o||null==l)throw new Error(`textureToKTX -- format ${r.format} of ${r.label} unsupported`);const u=n.n73();u.pixelWidth=r.width,u.pixelHeight=r.height,u.vkFormat=a.KO[r.format],u.typeSize=l,delete u.keyValue.KTXswizzle;const c=u.dataFormatDescriptor[0];if(c.colorModel=n.Tre,c.transferFunction=n.T5j,c.bytesPlane[0]=o,c.samples=(0,i._b)(4,(e=>({channelType:[192,193,194,207][e],samplePosition:[0,0,0,0],bitLength:8*u.typeSize-1,bitOffset:8*u.typeSize*e,sampleLower:-1082130432,sampleUpper:1065353216}))),"3d"===r.dimension)u.faceCount=1,u.pixelDepth=r.depthOrArrayLayers;else if(t){const e=r.depthOrArrayLayers/6;u.layerCount=1===e?0:e,u.faceCount=6}else u.layerCount=r.depthOrArrayLayers,u.faceCount=1;let g,f;for(let t=0;t<r.mipLevelCount;t+=1)({imageData:f,storageBuffer:g}=await s({mipLevel:t,returnBuffer:!0,device:e,texture:r,storageBuffer:g})),u.levels.push({levelData:f,uncompressedByteLength:f.byteLength});return n.M98(u)}},4727:(e,r,t)=>{t.a(e,(async(e,n)=>{try{t.r(r),t.d(r,{default:()=>m});var a=t(8777),i=t(856),o=t(7561),s=t(1075),l=t(7499),u=e([i]);i=(u.then?(await u)():u)[0];var c,g,f=function(e,r,t,n){if("a"===t&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof r?e!==r||!n:!r.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===t?n:"a"===t?n.call(e):n?n.value:r.get(e)};!function(e){e[e.IDLE=0]="IDLE",e[e.BLUR=1]="BLUR",e[e.WAIT=2]="WAIT"}(g||(g={}));class b{constructor(e){this.renderer=e,this.state=g.IDLE,c.set(this,(0,o.A)({nearestSample:{[o.t.$type]:"checkbox",[o.t.$callback]:e=>{"boolean"==typeof e&&(this.renderer.skyboxPass.useNearestSample=e)},value:!1,description:"Disables linear sampling in the viewer."},mipLevel:{[o.t.$type]:"slider",[o.t.$callback]:e=>{"number"==typeof e&&(this.renderer.skyboxPass.mipLevel=e)},value:0,min:0,max:1,step:.1,description:"The mip level to display in the viewer. 0 is the original image, max is completely blurred with 1 pixel faces."},filterDistance:{[o.t.$type]:"slider",[o.t.$callback]:this.reblur.bind(this),value:8,max:64,min:0,step:.1,description:"The number of pixels to blur from."},skybox:(0,i.A)(this),"Download Result":{[o.t.$type]:"button",onClick:()=>{this.saveFile().catch(console.error)}}})),this.settings=f(this,c,"f").publicSettings,this.priority=0,e.addForwardPass(this),this.device=e.device}setSkybox(e){this.skybox=e,f(this,c,"f").privateSettings.mipLevel.max=this.skybox.mipLevelCount-1,f(this,c,"f").privateSettings.mipLevel.value=1,this.renderer.skyboxPass.mipLevel=1,this.refresh(),this.reblur().catch(console.error)}resolve(){this.refresh();const e=this.state;this.state=g.IDLE,e===g.WAIT&&this.reblur().catch(console.error)}async reblur(){null!=this.skybox&&this.state!==g.WAIT&&(this.state!==g.BLUR?(this.state=g.BLUR,await(0,l.A)({device:this.renderer.device,texture:this.skybox,steps:this.settings.filterDistance.value,inPlace:!0,delayWork:requestAnimationFrame}),this.resolve()):this.state=g.WAIT)}refresh(){null!=this.skybox&&(this.renderer.skyboxPass.skyTexture=this.skybox.createView({dimension:"cube"}))}async saveFile(){if(null==this.skybox)return;const e=Promise.all([(0,s.gU)(this.renderer.device,this.skybox,!0).then((e=>new Blob([e],{type:"image/ktx2"}))),(0,a.H1)({types:[{accept:{"image/ktx2":[".ktx2"]}}],suggestedName:"blurred-skybox.ktx2"}).then((e=>e.createWritable({keepExistingData:!1})))]),[r,t]=await e;await r.stream().pipeTo(t)}render({encoder:e,gbuffer:r}){e.beginRenderPass({colorAttachments:[],depthStencilAttachment:{depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store",view:r.depth.view}}).end()}}c=new WeakMap;const m=b;n()}catch(e){n(e)}}))},5834:(e,r,t)=>{function n(e,r){const t=Object.entries(e).map((([e,t])=>[e,r(t)]));return Object.fromEntries(t)}function a(e,r,t){return Math.max(r,Math.min(t,e))}function i(e,...r){const t=[e[0]];return r.forEach(((r,n)=>{return t.push(null==(a=r)||""===a?"":` ${a}`,e[n+1]);var a})),t.join("")}function o(e,r){return function(e){return[...Array(e).keys()]}(e).map(r)}function s(e,r){let t;return function(...n){const a=self;null!=t&&clearTimeout(t),t=setTimeout((()=>{e.apply(a,n)}),r)}}function l(e,r,t,n=0,a=e.length-1){if(a-n<=1)t(r,e[n]??r)<0?e.splice(n,0,r):t(r,e[a]??r)>0?e.splice(a+1,0,r):e.splice(a,0,r);else{const i=Math.floor((a-n)/2)+n;t(r,e[i])<0?l(e,r,t,n,i):l(e,r,t,i,a)}}t.d(r,{LG:()=>n,OY:()=>i,_b:()=>o,nn:()=>l,qE:()=>a,sg:()=>s})},6810:(e,r,t)=>{t.d(r,{GE:()=>s,KO:()=>l,T2:()=>o,vV:()=>a});var n=t(1326);const a={mat4x4Count:16,sizeofMat4x4f:16*Float32Array.BYTES_PER_ELEMENT},i={[n.VIE]:"r8unorm",[n.B7n]:"r8snorm",[n.W_U]:"r8uint",[n.YeG]:"r8sint",[n.HYY]:"r16uint",[n.brc]:"r16sint",[n.eLQ]:"r16float",[n.sk6]:"rg8unorm",[n.aiL]:"rg8snorm",[n.xWH]:"rg8uint",[n.$Kq]:"rg8sint",[n.nR0]:"r32uint",[n.rwM]:"r32sint",[n.e4n]:"r32float",[n.P1c]:"rg16uint",[n.bc6]:"rg16sint",[n.cps]:"rg16float",[n.tsP]:"rgba8unorm",[n.Wm_]:"rgba8unorm-srgb",[n.zqn]:"rgba8snorm",[n.MZV]:"rgba8uint",[n._Je]:"rgba8sint",[n.J6Z]:"bgra8unorm",[n.mIY]:"bgra8unorm-srgb",[n.KIZ]:"rgb9e5ufloat",[n.eAA]:"rgb10a2uint",[n.fJh]:"rgb10a2unorm",[n.kot]:"rg11b10ufloat",[n.nlo]:"rg32uint",[n.x9e]:"rg32sint",[n.yAK]:"rg32float",[n.CSc]:"rgba16uint",[n.GF$]:"rgba16sint",[n.l2T]:"rgba16float",[n.KMX]:"rgba32uint",[n.KBq]:"rgba32sint",[n.Ze1]:"rgba32float",[n.QFs]:"bc1-rgba-unorm",[n.bOE]:"bc1-rgba-unorm-srgb",[n.wt4]:"bc2-rgba-unorm",[n.ZBp]:"bc2-rgba-unorm-srgb",[n.D_t]:"bc3-rgba-unorm",[n.elk]:"bc3-rgba-unorm-srgb",[n.ydS]:"bc4-r-unorm",[n.iIv]:"bc4-r-snorm",[n.LHP]:"bc5-rg-unorm",[n.xXb]:"bc5-rg-snorm",[n.mQu]:"bc6h-rgb-ufloat",[n.CpY]:"bc6h-rgb-float",[n.FD_]:"bc7-rgba-unorm",[n.GJu]:"bc7-rgba-unorm-srgb"},o={r8unorm:1,r8snorm:1,r8uint:1,r8sint:1,r16uint:2,r16sint:2,r16float:2,rg8unorm:2,rg8snorm:2,rg8uint:2,rg8sint:2,r32uint:4,r32sint:4,r32float:4,rg16uint:4,rg16sint:4,rg16float:4,rgba8unorm:4,"rgba8unorm-srgb":4,rgba8snorm:4,rgba8uint:4,rgba8sint:4,bgra8unorm:4,"bgra8unorm-srgb":4,rgb9e5ufloat:4,rgb10a2uint:4,rgb10a2unorm:4,rg11b10ufloat:4,rg32uint:8,rg32sint:8,rg32float:8,rgba16uint:8,rgba16sint:8,rgba16float:8,rgba32uint:16,rgba32sint:16,rgba32float:16},s={r8unorm:1,r8snorm:1,r8uint:1,r8sint:1,r16uint:2,r16sint:2,r16float:2,rg8unorm:1,rg8snorm:1,rg8uint:1,rg8sint:1,r32uint:4,r32sint:4,r32float:4,rg16uint:2,rg16sint:2,rg16float:2,rgba8unorm:1,"rgba8unorm-srgb":1,rgba8snorm:1,rgba8uint:1,rgba8sint:1,bgra8unorm:1,"bgra8unorm-srgb":1,rgb9e5ufloat:4,rgb10a2uint:4,rgb10a2unorm:4,rg11b10ufloat:4,rg32uint:4,rg32sint:4,rg32float:4,rgba16uint:2,rgba16sint:2,rgba16float:2,rgba32uint:4,rgba32sint:4,rgba32float:4},l=Object.fromEntries(Object.entries(i).map((([e,r])=>[r,parseInt(e,10)])))},8452:(e,r,t)=>{t.d(r,{l3:()=>s});var n=t(7812),a=t(3938),i=t(1075),o=t(5834);async function s(e,{data:r,width:t,height:s,gamma:l=1,exposure:u=1},c){const g=`\n        override EXPOSURE: f32 = 1.0;\n        override GAMMA: f32 = 1.0;\n        override FLIP_Y: bool = false;\n\n        @group(0) @binding(0) var equirectangularMap: texture_2d<f32>;\n        @group(0) @binding(1) var mapSampler: sampler;\n        @group(0) @binding(2) var<uniform> face: u32;\n\n        fn sampleSphericalMap(v: vec3f) -> vec2f {\n            const invAtan = vec2(0.1591, 0.3183);\n\n            var uv = vec2(atan2(v.z, v.x), asin(v.y));\n            uv *= invAtan;\n            uv += 0.5;\n            return uv;\n        }\n \n        ${n.A}\n        ${a.V}\n\n        @fragment\n        fn fs(@location(0) uv: vec2f) -> @location(0) vec4f {\n            var dir = toWorldDirF32(uv, face);\n            dir = vec3(dir.z, dir.y, -dir.x);\n            var coord = sampleSphericalMap(dir);\n            if (FLIP_Y) { coord.y = 1 - coord.y; }\n\n            var color = textureSample(equirectangularMap, mapSampler, coord).rgb;\n            if (GAMMA != 1.0) { color = pow(color, vec3(1.0 / GAMMA)); }\n            if (EXPOSURE != 1.0) { color /= EXPOSURE; }\n            return vec4(color, 1.0);\n        }\n    `;let f,b=0;r instanceof GPUTexture?f=r:(b=1,f=e.createTexture({label:`${c.label} equirectangular`,dimension:"2d",format:"rgba16float",size:{width:t,height:s},usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING}),e.queue.writeTexture({texture:f,mipLevel:0},r,{bytesPerRow:2*t*4},{width:t,height:s,depthOrArrayLayers:1}),await e.queue.onSubmittedWorkDone());const m=f.height>>1,d=c;d.mipLevelCount??=0|Math.log2(m),d.size={width:m,height:m,depthOrArrayLayers:6},d.dimension="2d",d.usage|=GPUTextureUsage.RENDER_ATTACHMENT;const h=e.createTexture(d),p=o.OY`hdr copy${c.label}`,y=e.createBindGroupLayout({label:p,entries:[{binding:0,texture:{},visibility:GPUShaderStage.FRAGMENT},{binding:1,sampler:{},visibility:GPUShaderStage.FRAGMENT},{binding:2,buffer:{},visibility:GPUShaderStage.FRAGMENT}]}),v=e.createShaderModule({label:p,code:g}),w=e.createSampler({label:p,minFilter:"linear",magFilter:"linear"}),x=new Uint32Array(1),A=(0,i.Lr)(x,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM,e,p),L=e.createBindGroup({label:p,layout:y,entries:[{binding:0,resource:f.createView()},{binding:1,resource:w},{binding:2,resource:{buffer:A}}]}),E=e.createPipelineLayout({label:p,bindGroupLayouts:[y]}),T=e.createRenderPipeline({label:p,layout:E,vertex:{module:v},fragment:{module:v,targets:[{format:h.format}],constants:{GAMMA:l,EXPOSURE:u,FLIP_Y:b}}});for(let r=0;r<6;r+=1){x[0]=r,e.queue.writeBuffer(A,0,x,0,1);const t=h.createView({dimension:"2d",arrayLayerCount:1,baseArrayLayer:r,mipLevelCount:1}),n=e.createCommandEncoder(),a=n.beginRenderPass({label:p,colorAttachments:[{view:t,loadOp:"clear",storeOp:"store"}]});a.setPipeline(T),a.setBindGroup(0,L),a.draw(3),a.end(),e.queue.submit([n.finish()])}return h}}}]);
//# sourceMappingURL=645.bundle.js.map