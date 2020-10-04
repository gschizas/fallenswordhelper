import{C as t,A as n,b as e,B as s,D as a,t as i,y as f,P as c,Q as r,x as u,R as o,o as l}from"./calfSystem-3bdf319e.js"
import{s as d}from"./setTipped-141d3404.js"
import"./insertElementBefore-543d9ef0.js"
import{c as m}from"./createSpan-a10d5602.js"
import"./indexAjaxJson-5033dc48.js"
import"./cmdExport-7ba590c1.js"
import{c as h}from"./csvSplit-c9226810.js"
import{i as b}from"./insertHtmlAfterEnd-56f50dfb.js"
import{i as p}from"./insertElementAfter-1daad9f9.js"
import{o as k}from"./outputFormat-d53ee8dc.js"
import{f as q}from"./formatLastActivity-02e55416.js"
import{g as y}from"./getProfile-ca7df963.js"
import{d as E,q as v}from"./quickbuffSuccess-a8614e0f.js"
function T(s){const a=function(n){let s=t("span.fshLastActivity",n)
if(!s){s=m({className:"fshLastActivity"})
const t=e("h1",n)[0]
p(s,t)}return s}(t(`div.player[data-username="${s.username}"]`))
n(`Last Activity: ${q(s.last_login)}<br>Stamina: ${s.current_stamina} / ${s.stamina} ( ${Math.floor(s.current_stamina/s.stamina*100)}% )`,a)}function g(t){return Number(s(t).replace(/\[|\]/g,""))}function S(t,e,s){if(!e)return void n("",s)
const a=g(t.nextElementSibling.children[0].children[0]),i=function(t,n){if(!n){const n=m({className:"fshPlayer"})
return p(n,t.nextElementSibling),n}return n}(t,s),f=function(t,n){return t>n?"fshRed":"fshGreen"}(a,e)
n(` <span class="${f}">[${e}]</span>`,i)}function j(t,n){return n[0]===t}function $(t,n){const e=function(t,n){const e=n.getAttribute("data-name"),s=t.find(i(j,e))
if(s)return s[1]}(t,n),s=n.nextElementSibling.nextElementSibling;(e||s)&&S(n,e,s)}function x(t){return t.split(/ \[|]/)}function B(t){const n=t.target
if("H1"!==n.tagName)return
y(s(n)).then(T)
const e=function(t){return h(s(t.parentNode.lastElementChild)).map(x)}(n)
a("#buff-outer input[name]").forEach(i($,e))}const A=[50,54,55,56,60,61,98,101]
function D(t,n){(function(t,n){return!A.includes(Number(t.htmlFor.slice(6)))&&g(n.children[0])<125})(t,n)&&t.classList.add("fshDim")}function H(t){const n=t.children[0]
!function(t,n){const e=n.dataset.tipped,{cost:s}=t.previousElementSibling.dataset
d(e.replace("</center>",`<br>Stamina Cost: ${s}$&`),n)}(t,n),D(t,n)}function L(){a('#buff-outer label[for^="skill-"]').forEach(H)}function N(t){const n=e("h1",f("players"))[0]
!function(t,n){return!t&&n}(n,t)?n&&c(n):setTimeout(N,100,t-1)}function R(){f("targetPlayers").value&&N(9)}function w(t){return`<span class="fshLime">On</span>&nbsp;<span class="fshBuffOn">(${function(t){const n=Math.floor(t/60),e=t%60
let s=k(n,"m")
return n>0&&e>0&&(s+=" "),s+=k(e,"s"),s}(t)})</span>`}function F(n,e){const s=n[e]||0
return s?w(s):function(n){const e=t(`#buff-outer input[data-name="${n}"]`)
return e?`<span class="quickbuffActivate" data-buffid="${e.value}">Activate</span>`:'<span class="fshRed;">Off</span>'}(e)}function M(t,e,s){n(F(t,e),s)}function C(t,n){return t[n.name]=n.duration,t}function G(t,n){return n.name===t}function P(t,e,s){const a=function(t,n){const e=t.find(i(G,n))
return e&&e.value||0}(t,e)
let f="fshLime"
a<100&&(f="fshRed"),n(`<span class="${f}">${a}%</span>`,s)}function _(t){!function(t){const n=t._enhancements
P(n,"Sustain",f("fshSus")),P(n,"Fury Caster",f("fshFur"))}(t),function(t){const n=t._skills.reduce(C,{})
M(n,"Guild Buffer",f("fshGB")),M(n,"Buff Master",f("fshBM")),M(n,"Extend",f("fshExt")),M(n,"Reinforce",f("fshRI"))}(t)}function O(t){const n=f("skill-"+t)
n&&(n.checked=!0)}function Q(){const t=r("blist")
t&&function(t){t.split(";").forEach(O)}(t)}let I
function J(){I.length?(window.addPlayer(I.shift()),setTimeout(J,200)):R()}function z(){const t=r("players")
t&&(I=h(t),J())}function K(t,e){v(e)&&(t.className="fshLime",n("On",t))}function U(t){const n=t.target
"quickbuffActivate"===n.className&&E([window.self],[n.dataset.buffid]).then(i(K,n))}function V(){l(f("helperQBheader"),U),l(f("players"),B)}function W(){if(u())return
const t=f("quickbuff")
t&&(y(window.self).then(_),b(t.children[0],'<div id="helperQBheader"><table class="quickbuffTable"><thead><tr><th class="quickbuffTableHeader">Sustain</th><th class="quickbuffTableHeader">Fury Caster</th><th class="quickbuffTableHeader">Guild Buffer</th><th class="quickbuffTableHeader">Buff Master</th><th class="quickbuffTableHeader">Extend</th><th class="quickbuffTableHeader">Reinforce</th></tr></thead><tbody><tr><td id="fshSus" class="quickbuffTableDetail">&nbsp;</td><td id="fshFur" class="quickbuffTableDetail">&nbsp;</td><td id="fshGB"  class="quickbuffTableDetail">&nbsp;</td><td id="fshBM"  class="quickbuffTableDetail">&nbsp;</td><td id="fshExt" class="quickbuffTableDetail">&nbsp;</td><td id="fshRI"  class="quickbuffTableDetail">&nbsp;</td></tr></tbody></table></div>'),o([L,Q,z,V,R]))}export default W
//# sourceMappingURL=quickBuff-900bdddc.js.map
