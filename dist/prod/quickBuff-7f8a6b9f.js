import{R as t,C as n,S as s,T as e,b as a,U as i,D as f,V as u,W as c,N as r,v as l,X as o,A as d,Y as h,Z as b,z as p,_ as m,o as k}from"./calfSystem-3956a623.js"
import{d as q,q as v}from"./quickbuffSuccess-380717cb.js"
function T(f){const u=function(n){let s=t("span.fshLastActivity",n)
if(!s){s=e({className:"fshLastActivity"})
const t=a("h1",n)[0]
i(s,t)}return s}(t(`div.player[data-username="${f.username}"]`))
n(`Last Activity: ${s(f.last_login)}<br>Stamina: ${f.current_stamina} / ${f.stamina} ( ${Math.floor(f.current_stamina/f.stamina*100)}% )`,u)}function $(t){return Number(f(t).replace(/\[|\]/g,""))}function S(t,s,a){if(!s)return void n("",a)
const f=$(t.nextElementSibling.children[0].children[0]),u=function(t,n){if(!n){const n=e({className:"fshPlayer"})
return i(n,t.nextElementSibling),n}return n}(t,a),c=function(t,n){return t>n?"fshRed":"fshGreen"}(f,s)
n(` <span class="${c}">[${s}]</span>`,u)}function y(t,n){return n[0]===t}function E(t,n){const s=function(t,n){const s=n.getAttribute("data-name"),e=t.find(l(y,s))
if(e)return e[1]}(t,n),e=n.nextElementSibling.nextElementSibling;(s||e)&&S(n,s,e)}function g(t){return t.split(/ \[|]/)}function B(t){const n=t.target
if("H1"!==n.tagName)return
u(f(n)).then(T)
const s=function(t){return c(f(t.parentNode.lastElementChild)).map(g)}(n)
r("#buff-outer input[name]").forEach(l(E,s))}const x=[50,54,55,56,60,61,98,101]
function N(t,n){(function(t,n){return!x.includes(Number(t.htmlFor.slice(6)))&&$(n.children[0])<125})(t,n)&&t.classList.add("fshDim")}function A(t){const n=t.children[0]
!function(t,n){const s=n.dataset.tipped,{cost:e}=t.previousElementSibling.dataset
n.dataset.tipped=s.replace("</center>",`<br>Stamina Cost: ${e}$&`)}(t,n),N(t,n)}function D(t){const n=d(`skill-${t}`)
n&&(n.checked=!0)}function R(){const t=o("blist")
t&&function(t){t.split(";").forEach(D)}(t)}let H=0
function L(){const t=a("h1",d("players"))[0]
if(function(t){return!t&&H<9}(t))return H+=1,void setTimeout(L,100)
t&&h(t)}function M(t){return`<span class="fshLime">On</span>&nbsp;<span class="fshBuffOn">(${function(t){const n=Math.floor(t/60),s=t%60
let e=b(n,"m")
return n>0&&s>0&&(e+=" "),e+=b(s,"s"),e}(t)})</span>`}function _(n,s){const e=n[s]||0
return e?M(e):function(n){const s=t(`#buff-outer input[data-name="${n}"]`)
return s?`<span class="quickbuffActivate" data-buffid="${s.value}">Activate</span>`:'<span class="fshRed;">Off</span>'}(s)}function C(t,s,e){n(_(t,s),e)}function F(t,n){return t[n.name]=n.duration,t}function G(t,n){return n.name===t}function w(t,s,e){const a=function(t,n){const s=t.find(l(G,n))
return s&&s.value||0}(t,s)
let i="fshLime"
a<100&&(i="fshRed"),n(`<span class="${i}">${a}%</span>`,e)}function O(t){!function(t){const n=t._enhancements
w(n,"Sustain",d("fshSus")),w(n,"Fury Caster",d("fshFur"))}(t),function(t){const n=t._skills.reduce(F,{})
C(n,"Guild Buffer",d("fshGB")),C(n,"Buff Master",d("fshBM")),C(n,"Extend",d("fshExt")),C(n,"Reinforce",d("fshRI"))}(t)}function j(t,s){v(s)&&(t.className="fshLime",n("On",t))}function I(t){const n=t.target
"quickbuffActivate"===n.className&&q([window.self],[n.dataset.buffid]).then(l(j,n))}export default function(){if(p())return
const t=d("quickbuff")
t&&(u(window.self).then(O),m(t.children[0],'<div id="helperQBheader"><table class="quickbuffTable"><thead><tr><th class="quickbuffTableHeader">Sustain</th><th class="quickbuffTableHeader">Fury Caster</th><th class="quickbuffTableHeader">Guild Buffer</th><th class="quickbuffTableHeader">Buff Master</th><th class="quickbuffTableHeader">Extend</th><th class="quickbuffTableHeader">Reinforce</th></tr></thead><tbody><tr><td id="fshSus" class="quickbuffTableDetail">&nbsp;</td><td id="fshFur" class="quickbuffTableDetail">&nbsp;</td><td id="fshGB"  class="quickbuffTableDetail">&nbsp;</td><td id="fshBM"  class="quickbuffTableDetail">&nbsp;</td><td id="fshExt" class="quickbuffTableDetail">&nbsp;</td><td id="fshRI"  class="quickbuffTableDetail">&nbsp;</td></tr></tbody></table></div>'),r('#buff-outer label[for^="skill-"]').forEach(A),R(),k(d("helperQBheader"),I),k(d("players"),B),d("targetPlayers").value&&L())}
//# sourceMappingURL=quickBuff-7f8a6b9f.js.map
