import{C as t,A as n,b as s,B as e,D as a,t as i,y as f,P as c,Q as r,x as u,R as o,o as l}from"./calfSystem-70c7a660.js"
import{s as d}from"./setTipped-141d3404.js"
import"./insertElementBefore-543d9ef0.js"
import{c as m}from"./createSpan-fc68466d.js"
import"./indexAjaxJson-4ca9de3e.js"
import"./cmdExport-31b9da33.js"
import{c as b}from"./csvSplit-c9226810.js"
import{i as h}from"./insertHtmlAfterEnd-005493b2.js"
import{i as p}from"./insertElementAfter-00a9b51c.js"
import{o as k}from"./outputFormat-d53ee8dc.js"
import"./splitTime-b59440b5.js"
import{f as q}from"./formatLastActivity-96960717.js"
import{g as y}from"./getProfile-62d13fa3.js"
import{d as E,q as T}from"./quickbuffSuccess-3fd22cbc.js"
function v(e){const a=function(n){let e=t("span.fshLastActivity",n)
if(!e){e=m({className:"fshLastActivity"})
const t=s("h1",n)[0]
p(e,t)}return e}(t(`div.player[data-username="${e.username}"]`))
n(`Last Activity: ${q(e.last_login)}<br>Stamina: ${e.current_stamina} / ${e.stamina} ( ${Math.floor(e.current_stamina/e.stamina*100)}% )`,a)}function g(t){return Number(e(t).replace(/\[|\]/g,""))}function j(t,s,e){if(!s)return void n("",e)
const a=g(t.nextElementSibling.children[0].children[0]),i=function(t,n){if(!n){const n=m({className:"fshPlayer"})
return p(n,t.nextElementSibling),n}return n}(t,e),f=function(t,n){return t>n?"fshRed":"fshGreen"}(a,s)
n(` <span class="${f}">[${s}]</span>`,i)}function S(t,n){return n[0]===t}function $(t,n){const s=function(t,n){const s=n.getAttribute("data-name"),e=t.find(i(S,s))
if(e)return e[1]}(t,n),e=n.nextElementSibling.nextElementSibling;(s||e)&&j(n,s,e)}function x(t){return t.split(/ \[|]/)}function B(t){const n=t.target
if("H1"!==n.tagName)return
y(e(n)).then(v)
const s=function(t){return b(e(t.parentNode.lastElementChild)).map(x)}(n)
a("#buff-outer input[name]").forEach(i($,s))}const A=[50,54,55,56,60,61,98,101]
function D(t,n){(function(t,n){return!A.includes(Number(t.htmlFor.slice(6)))&&g(n.children[0])<125})(t,n)&&t.classList.add("fshDim")}function H(t){const n=t.children[0]
!function(t,n){const s=n.dataset.tipped,{cost:e}=t.previousElementSibling.dataset
d(s.replace("</center>",`<br>Stamina Cost: ${e}$&`),n)}(t,n),D(t,n)}function L(){a('#buff-outer label[for^="skill-"]').forEach(H)}function N(t){const n=s("h1",f("players"))[0]
!function(t,n){return!t&&n}(n,t)?n&&c(n):setTimeout(N,100,t-1)}function R(){f("targetPlayers").value&&N(9)}function w(t){return`<span class="fshLime">On</span>&nbsp;<span class="fshBuffOn">(${function(t){const n=Math.floor(t/60),s=t%60
let e=k(n,"m")
return n>0&&s>0&&(e+=" "),e+=k(s,"s"),e}(t)})</span>`}function F(n,s){const e=n[s]||0
return e?w(e):function(n){const s=t(`#buff-outer input[data-name="${n}"]`)
return s?`<span class="quickbuffActivate" data-buffid="${s.value}">Activate</span>`:'<span class="fshRed;">Off</span>'}(s)}function M(t,s,e){n(F(t,s),e)}function C(t,n){return t[n.name]=n.duration,t}function G(t,n){return n.name===t}function P(t,s,e){const a=function(t,n){const s=t.find(i(G,n))
return s&&s.value||0}(t,s)
let f="fshLime"
a<100&&(f="fshRed"),n(`<span class="${f}">${a}%</span>`,e)}function _(t){!function(t){const n=t._enhancements
P(n,"Sustain",f("fshSus")),P(n,"Fury Caster",f("fshFur"))}(t),function(t){const n=t._skills.reduce(C,{})
M(n,"Guild Buffer",f("fshGB")),M(n,"Buff Master",f("fshBM")),M(n,"Extend",f("fshExt")),M(n,"Reinforce",f("fshRI"))}(t)}function O(t){const n=f("skill-"+t)
n&&(n.checked=!0)}function Q(){const t=r("blist")
t&&function(t){t.split(";").forEach(O)}(t)}let I
function J(){I.length?(window.addPlayer(I.shift()),setTimeout(J,200)):R()}function z(){const t=r("players")
t&&(I=b(t),J())}function K(t,s){T(s)&&(t.className="fshLime",n("On",t))}function U(t){const n=t.target
"quickbuffActivate"===n.className&&E([window.self],[n.dataset.buffid]).then(i(K,n))}function V(){l(f("helperQBheader"),U),l(f("players"),B)}function W(){if(u())return
const t=f("quickbuff")
t&&(y(window.self).then(_),h(t.children[0],'<div id="helperQBheader"><table class="quickbuffTable"><thead><tr><th class="quickbuffTableHeader">Sustain</th><th class="quickbuffTableHeader">Fury Caster</th><th class="quickbuffTableHeader">Guild Buffer</th><th class="quickbuffTableHeader">Buff Master</th><th class="quickbuffTableHeader">Extend</th><th class="quickbuffTableHeader">Reinforce</th></tr></thead><tbody><tr><td id="fshSus" class="quickbuffTableDetail">&nbsp;</td><td id="fshFur" class="quickbuffTableDetail">&nbsp;</td><td id="fshGB"  class="quickbuffTableDetail">&nbsp;</td><td id="fshBM"  class="quickbuffTableDetail">&nbsp;</td><td id="fshExt" class="quickbuffTableDetail">&nbsp;</td><td id="fshRI"  class="quickbuffTableDetail">&nbsp;</td></tr></tbody></table></div>'),o([L,Q,z,V,R]))}export default W
//# sourceMappingURL=quickBuff-7926a9db.js.map
