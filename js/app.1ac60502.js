(function(e){function t(t){for(var i,s,a=t[0],c=t[1],u=t[2],h=0,p=[];h<a.length;h++)s=a[h],r[s]&&p.push(r[s][0]),r[s]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);l&&l(t);while(p.length)p.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,a=1;a<n.length;a++){var c=n[a];0!==r[c]&&(i=!1)}i&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var i={},r={app:0},o=[];function s(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=i,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var l=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var i=n("64a9"),r=n.n(i);r.a},2999:function(e,t,n){e.exports=n.p+"./jog-dial/img/color_mask.63dee091.jpg"},"56d7":function(e,t,n){"use strict";n.r(t);n("14c6"),n("08c1"),n("4842"),n("d9fc");var i=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("JogDial",{staticClass:"volume",attrs:{channel:0}})],1)},o=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("canvas",{ref:"canvas",attrs:{width:this.width,height:this.height}}),n("div",{staticClass:"channel"},[e._v(e._s(e.currentChannel))])])},a=[],c=(n("3f9c"),n("d6b6"),n("d225")),u=n("b0b4"),l=n("5a89"),h=n("cffa"),p=h.TweenMax,d=h.Back,v=(n("6397"),function(){function e(t,i,r){var o=i.tickCount,s=i.tickLengthRatio,a=i.radiusRatio;Object(c["a"])(this,e),this.canvas=t;var u=t.width,h=t.height,p=new l["WebGLRenderer"]({canvas:t,antialias:!0,precision:"high"}),d=new l["PerspectiveCamera"](45,u/h,.001,1e3);d.position.z=100;var v=new l["Scene"],f=new l["Scene"],g=new l["WebGLRenderTarget"](u,h,{minFilter:l["LinearFilter"],magFilter:l["NearestFilter"]}),x=120,m={x:0,y:-140},y=3.2,w=6.6*1.4,k=.3*Math.PI,b=[],z=new l["Group"];z.position.x=m.x,z.position.y=m.y;for(var T=0;T<o;T++){var _=T/o*k+.5*Math.PI,M=-Math.cos(_)*x,S=Math.sin(_)*x,O=new l["PlaneBufferGeometry"](y,w),j=new l["ShaderMaterial"]({transparent:!0,uniforms:{tickSize:{type:"v2",value:new l["Vector2"](y,w)}},vertexShader:"\n          varying vec2 vUv;\n          uniform vec2 tickSize;\n          void main() {\n            vUv = (position.xy + (tickSize * 0.5)) * 1. / tickSize;\n            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n          }\n        ",fragmentShader:"\n          varying vec2 vUv;\n\n          void main() {\n            vec2 uv = vUv;\n            float d = 0.6 - distance(vUv, vec2(0.5));\n            d *= 1.1;\n            // d = pow(d, 2.0);\n\n            float w = smoothstep(0.45, 0.55, uv.x) - smoothstep(0.55, 0.65, uv.x);\n            float h = smoothstep(-0.1, 0.2, uv.y) - smoothstep(0.65, 0.8, uv.y);\n            d += w * h;\n\n            // d = pow(horizontalBlur * verticalBlur, 3.);\n            \n            // d = horizontalBlur;\n\n\n\n            vec4 color = vec4(d);\n            \n            gl_FragColor = color;\n          }\n        "}),I=new l["Mesh"](O,j);I.rotation.z=Math.atan2(S,M)-.5*Math.PI,I.position.set(M,S,.1),b.push({idx:T,deg:_,init:{position:{x:I.position.x,y:I.position.y,z:I.position.z},scale:{x:I.scale.x,y:I.scale.y,z:I.scale.z}},curr:{position:{x:I.position.x,y:I.position.y,z:I.position.z},scale:{x:I.scale.x,y:I.scale.y,z:I.scale.z}},mesh:I}),z.add(I)}f.add(z);var C=new l["PlaneBufferGeometry"](2,2),R=new l["ShaderMaterial"]({transparent:!0,uniforms:{u_resolution:{type:"v2",value:new l["Vector2"](u,h)},u_shadowMask:{type:"t",value:new l["ImageUtils"].loadTexture(n("77d2"))},u_colorMask:{type:"t",value:new l["ImageUtils"].loadTexture(n("2999"))},u_bufferTexture:{type:"t",value:g}},vertexShader:"\n        varying vec2 vUv;\n        void main() {\n          vUv = (position.xy + 1.0) * 0.5;\n          gl_Position = vec4(position, 1.0);\n        }\n      ",fragmentShader:"\n        varying vec2 vUv;\n        uniform sampler2D u_shadowMask;\n        uniform sampler2D u_colorMask;\n        uniform sampler2D u_bufferTexture;\n\n        void main() {\n          vec2 uv = vUv;\n\n          vec4 s = texture2D(u_shadowMask, uv);\n          vec4 c = texture2D(u_colorMask, uv);\n          vec4 b = texture2D(u_bufferTexture, uv);\n\n          vec4 color = s * c * b;\n          gl_FragColor = color;\n        }\n      "}),P=new l["Mesh"](C,R);v.add(P),this.renderer=p,this.camera=d,this.bufferScene=f,this.bufferTexture=g,this.scene=v,this.ticks=b,this.tickGroup=z,this.degRange=k,this.currTickIdx=r,this.currDeg=0,this.center=m,this.plane=P,this.tickCount=o,this.tickLengthRatio=s,this.radius=.5*t.width*a,this.draw(),this.nextTick(0,0,!0)}return Object(u["a"])(e,[{key:"getCurrentTick",value:function(){return this.currTickIdx}},{key:"draw",value:function(){var e=this,t=this.renderer,n=this.camera,i=this.scene,r=this.bufferScene,o=this.bufferTexture,s=this.plane;t.setRenderTarget(o),t.render(r,n),s.material.uniforms.u_bufferTexture.value=o,t.setRenderTarget(null),t.render(i,n),requestAnimationFrame(function(){return e.draw()})}},{key:"nextTick",value:function(e,t,n){var i=this.ticks,r=this.tickGroup,o=this.degRange,s=i[this.currTickIdx];this.currTickIdx+=e,this.currTickIdx<0&&(this.currTickIdx=0),this.currTickIdx>=i.length&&(this.currTickIdx=i.length-1);var a=i[this.currTickIdx];if(n||s!=a){var c=r.rotation.z,u=this.currTickIdx/i.length*o,l=u-c,h={progress:0};if(this.tickAnim){var v={progress:0},f=JSON.parse(JSON.stringify(s.init)),g=JSON.parse(JSON.stringify(s.curr));p.to(v,.8,{progress:1,ease:d.easeOut.config(1.1),onUpdate:function(){var e={x:g.position.x+(f.position.x-g.position.x)*v.progress,y:g.position.y+(f.position.y-g.position.y)*v.progress,z:g.position.z+(f.position.z-g.position.z)*v.progress},t={x:g.scale.x+(f.scale.x-g.scale.x)*v.progress,y:g.scale.y+(f.scale.y-g.scale.y)*v.progress,z:g.scale.z+(f.scale.z-g.scale.z)*v.progress};s.mesh.position.x=s.curr.position.x=e.x,s.mesh.position.y=s.curr.position.y=e.y,s.mesh.position.z=s.curr.position.z=e.z,s.mesh.scale.x=s.curr.scale.x=t.x,s.mesh.scale.y=s.curr.scale.y=t.y,s.mesh.scale.z=s.curr.scale.z=t.z}}),this.tickAnim.kill()}this.tickAnim=p.to(h,t,{progress:1,ease:d.easeOut.config(1.1),onUpdate:function(){var e=c+l*h.progress;r.rotation.z=e;var t=a.init.position.z,n=a.init.position.y,i=a.init.scale.x+.5*h.progress,o=a.init.scale.y+1.5*h.progress;a.mesh.position.y=n,a.mesh.position.z=t,a.mesh.scale.x=i,a.mesh.scale.y=o,a.curr.position.y=n,a.curr.position.z=t,a.curr.scale.x=i,a.curr.scale.y=o}})}}}]),e}()),f=v,g={name:"jog-dial",data:function(){return{currentChannel:this.channel}},props:{tickCount:{type:Number,default:60},tickLengthRatio:{type:Number,default:.07},radiusRatio:{type:Number,default:1.4},width:{type:Number,default:window.innerWidth},height:{type:Number,default:window.innerHeight},channel:{type:Number,default:1}},mounted:function(){var e=this,t=new f(this.$refs.canvas,{tickCount:this.tickCount,tickLengthRatio:this.tickLengthRatio,radiusRatio:this.radiusRatio},this.channel),n=!1,i=0,r={x:-1,y:-1},o={x:-1,y:-1},s=.05,a=0,c=300,u=0,l=function(){if(n){var i=(new Date).getTime(),l=1-a;l>1&&(l=1-(l-1));var h=.2*c+l*c*.8;if(!(i-u<h)){u=(new Date).getTime();var p=o.x,d=(o.y,Math.sign(p-r.x));a+=d*s,a*=.95,Math.abs(a)>1&&(a=Math.sign(a));var v=.2+.5*h/c;t.nextTick(d,v),e.currentChannel=t.getCurrentTick()+1}}};setInterval(function(){l()},10),window.addEventListener("mousedown",function(e){n=!0,r.x=e.clientX,r.y=e.clientY,u=(new Date).getTime()}),window.addEventListener("mousemove",function(e){if(n){o.x=e.clientX,o.y=e.clientY;var t=Math.sign(o.x-r.x);i!=t&&(a=0),i=t}}),window.addEventListener("mouseup",function(e){n=!1,a=0})}},x=g,m=(n("d20e"),n("2877")),y=Object(m["a"])(x,s,a,!1,null,"05025e6f",null),w=y.exports,k={name:"app",components:{JogDial:w}},b=k,z=(n("034f"),Object(m["a"])(b,r,o,!1,null,null,null)),T=z.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(e){return e(T)}}).$mount("#app")},6424:function(e,t,n){},"64a9":function(e,t,n){},"77d2":function(e,t,n){e.exports=n.p+"./jog-dial/img/shadow_mask.aeb20f27.jpg"},d20e:function(e,t,n){"use strict";var i=n("6424"),r=n.n(i);r.a}});
//# sourceMappingURL=app.1ac60502.js.map