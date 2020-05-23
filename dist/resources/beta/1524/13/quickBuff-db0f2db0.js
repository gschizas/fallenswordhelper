import{R as t,C as n,S as s,T as e,b as a,U as i,D as f,V as u,W as c,N as r,v as l,X as o,A as d,Y as h,Z as b,z as m,_ as p,o as k}from"./calfSystem-1e164202.js"
import{s as q}from"./setTipped-dbd83d5f.js"
import{d as v,q as T}from"./quickbuffSuccess-65977563.js"
function S(f){const u=function(n){let s=t("span.fshLastActivity",n)
if(!s){s=e({className:"fshLastActivity"})
const t=a("h1",n)[0]
i(s,t)}return s}(t(`div.player[data-username="${f.username}"]`))
n(`Last Activity: ${s(f.last_login)}<br>Stamina: ${f.current_stamina} / ${f.stamina} ( ${Math.floor(f.current_stamina/f.stamina*100)}% )`,u)}function $(t){return Number(f(t).replace(/\[|\]/g,""))}function y(t,s,a){if(!s)return void n("",a)
const f=$(t.nextElementSibling.children[0].children[0]),u=function(t,n){if(!n){const n=e({className:"fshPlayer"})
return i(n,t.nextElementSibling),n}return n}(t,a),c=function(t,n){return t>n?"fshRed":"fshGreen"}(f,s)
n(` <span class="${c}">[${s}]</span>`,u)}function E(t,n){return n[0]===t}function g(t,n){const s=function(t,n){const s=n.getAttribute("data-name"),e=t.find(l(E,s))
if(e)return e[1]}(t,n),e=n.nextElementSibling.nextElementSibling;(s||e)&&y(n,s,e)}function B(t){return t.split(/ \[|]/)}function x(t){const n=t.target
if("H1"!==n.tagName)return
u(f(n)).then(S)
const s=function(t){return c(f(t.parentNode.lastElementChild)).map(B)}(n)
r("#buff-outer input[name]").forEach(l(g,s))}const N=[50,54,55,56,60,61,98,101]
function A(t,n){(function(t,n){return!N.includes(Number(t.htmlFor.slice(6)))&&$(n.children[0])<125})(t,n)&&t.classList.add("fshDim")}function D(t){const n=t.children[0]
!function(t,n){const s=n.dataset.tipped,{cost:e}=t.previousElementSibling.dataset
q(s.replace("</center>",`<br>Stamina Cost: ${e}$&`),n)}(t,n),A(t,n)}function R(t){const n=d("skill-"+t)
n&&(n.checked=!0)}function H(){const t=o("blist")
t&&function(t){t.split(";").forEach(R)}(t)}let L=0
function M(){const t=a("h1",d("players"))[0]
if(function(t){return!t&&L<9}(t))return L+=1,void setTimeout(M,100)
t&&h(t)}function _(t){return`<span class="fshLime">On</span>&nbsp;<span class="fshBuffOn">(${function(t){const n=Math.floor(t/60),s=t%60
let e=b(n,"m")
return n>0&&s>0&&(e+=" "),e+=b(s,"s"),e}(t)})</span>`}function C(n,s){const e=n[s]||0
return e?_(e):function(n){const s=t(`#buff-outer input[data-name="${n}"]`)
return s?`<span class="quickbuffActivate" data-buffid="${s.value}">Activate</span>`:'<span class="fshRed;">Off</span>'}(s)}function F(t,s,e){n(C(t,s),e)}function G(t,n){return t[n.name]=n.duration,t}function w(t,n){return n.name===t}function O(t,s,e){const a=function(t,n){const s=t.find(l(w,n))
return s&&s.value||0}(t,s)
let i="fshLime"
a<100&&(i="fshRed"),n(`<span class="${i}">${a}%</span>`,e)}function j(t){!function(t){const n=t._enhancements
O(n,"Sustain",d("fshSus")),O(n,"Fury Caster",d("fshFur"))}(t),function(t){const n=t._skills.reduce(G,{})
F(n,"Guild Buffer",d("fshGB")),F(n,"Buff Master",d("fshBM")),F(n,"Extend",d("fshExt")),F(n,"Reinforce",d("fshRI"))}(t)}function I(t,s){T(s)&&(t.className="fshLime",n("On",t))}function P(t){const n=t.target
"quickbuffActivate"===n.className&&v([window.self],[n.dataset.buffid]).then(l(I,n))}export default function(){if(m())return
const t=d("quickbuff")
t&&(u(window.self).then(j),p(t.children[0],'<div id="helperQBheader"><table class="quickbuffTable"><thead><tr><th class="quickbuffTableHeader">Sustain</th><th class="quickbuffTableHeader">Fury Caster</th><th class="quickbuffTableHeader">Guild Buffer</th><th class="quickbuffTableHeader">Buff Master</th><th class="quickbuffTableHeader">Extend</th><th class="quickbuffTableHeader">Reinforce</th></tr></thead><tbody><tr><td id="fshSus" class="quickbuffTableDetail">&nbsp;</td><td id="fshFur" class="quickbuffTableDetail">&nbsp;</td><td id="fshGB"  class="quickbuffTableDetail">&nbsp;</td><td id="fshBM"  class="quickbuffTableDetail">&nbsp;</td><td id="fshExt" class="quickbuffTableDetail">&nbsp;</td><td id="fshRI"  class="quickbuffTableDetail">&nbsp;</td></tr></tbody></table></div>'),r('#buff-outer label[for^="skill-"]').forEach(D),H(),k(d("helperQBheader"),P),k(d("players"),x),d("targetPlayers").value&&M())}
//# sourceMappingURL=quickBuff-db0f2db0.js.map
