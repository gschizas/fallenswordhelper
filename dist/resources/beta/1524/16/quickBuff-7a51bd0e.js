import{M as t,z as n,b as s,A as e,I as a,s as i,N as f,x as c,O as r,w as u,o}from"./calfSystem-9554b525.js"
import{s as l}from"./setTipped-de144ccc.js"
import"./insertElementBefore-5f238f78.js"
import{c as d}from"./createSpan-40c5f348.js"
import"./indexAjaxJson-24e555fb.js"
import{c as b}from"./csvSplit-6b438d23.js"
import{i as m}from"./insertHtmlAfterEnd-b9b58b3d.js"
import"./cmdExport-d8ee0a12.js"
import{i as h}from"./insertElementAfter-6879a7fc.js"
import{o as p}from"./outputFormat-89c8373b.js"
import"./splitTime-64f5436c.js"
import{f as k}from"./formatLastActivity-9882b8ed.js"
import{g as q}from"./getProfile-7babcba2.js"
import{d as v,q as E}from"./quickbuffSuccess-6afc8cc1.js"
function T(e){const a=function(n){let e=t("span.fshLastActivity",n)
if(!e){e=d({className:"fshLastActivity"})
const t=s("h1",n)[0]
h(e,t)}return e}(t(`div.player[data-username="${e.username}"]`))
n(`Last Activity: ${k(e.last_login)}<br>Stamina: ${e.current_stamina} / ${e.stamina} ( ${Math.floor(e.current_stamina/e.stamina*100)}% )`,a)}function j(t){return Number(e(t).replace(/\[|\]/g,""))}function S(t,s,e){if(!s)return void n("",e)
const a=j(t.nextElementSibling.children[0].children[0]),i=function(t,n){if(!n){const n=d({className:"fshPlayer"})
return h(n,t.nextElementSibling),n}return n}(t,e),f=function(t,n){return t>n?"fshRed":"fshGreen"}(a,s)
n(` <span class="${f}">[${s}]</span>`,i)}function g(t,n){return n[0]===t}function y(t,n){const s=function(t,n){const s=n.getAttribute("data-name"),e=t.find(i(g,s))
if(e)return e[1]}(t,n),e=n.nextElementSibling.nextElementSibling;(s||e)&&S(n,s,e)}function $(t){return t.split(/ \[|]/)}function x(t){const n=t.target
if("H1"!==n.tagName)return
q(e(n)).then(T)
const s=function(t){return b(e(t.parentNode.lastElementChild)).map($)}(n)
a("#buff-outer input[name]").forEach(i(y,s))}const A=[50,54,55,56,60,61,98,101]
function B(t,n){(function(t,n){return!A.includes(Number(t.htmlFor.slice(6)))&&j(n.children[0])<125})(t,n)&&t.classList.add("fshDim")}function N(t){const n=t.children[0]
!function(t,n){const s=n.dataset.tipped,{cost:e}=t.previousElementSibling.dataset
l(s.replace("</center>",`<br>Stamina Cost: ${e}$&`),n)}(t,n),B(t,n)}function H(t){const n=c("skill-"+t)
n&&(n.checked=!0)}function L(){const t=f("blist")
t&&function(t){t.split(";").forEach(H)}(t)}let D=0
function M(){const t=s("h1",c("players"))[0]
if(function(t){return!t&&D<9}(t))return D+=1,void setTimeout(M,100)
t&&r(t)}function R(t){return`<span class="fshLime">On</span>&nbsp;<span class="fshBuffOn">(${function(t){const n=Math.floor(t/60),s=t%60
let e=p(n,"m")
return n>0&&s>0&&(e+=" "),e+=p(s,"s"),e}(t)})</span>`}function F(n,s){const e=n[s]||0
return e?R(e):function(n){const s=t(`#buff-outer input[data-name="${n}"]`)
return s?`<span class="quickbuffActivate" data-buffid="${s.value}">Activate</span>`:'<span class="fshRed;">Off</span>'}(s)}function w(t,s,e){n(F(t,s),e)}function G(t,n){return t[n.name]=n.duration,t}function O(t,n){return n.name===t}function _(t,s,e){const a=function(t,n){const s=t.find(i(O,n))
return s&&s.value||0}(t,s)
let f="fshLime"
a<100&&(f="fshRed"),n(`<span class="${f}">${a}%</span>`,e)}function C(t){!function(t){const n=t._enhancements
_(n,"Sustain",c("fshSus")),_(n,"Fury Caster",c("fshFur"))}(t),function(t){const n=t._skills.reduce(G,{})
w(n,"Guild Buffer",c("fshGB")),w(n,"Buff Master",c("fshBM")),w(n,"Extend",c("fshExt")),w(n,"Reinforce",c("fshRI"))}(t)}function I(t,s){E(s)&&(t.className="fshLime",n("On",t))}function P(t){const n=t.target
"quickbuffActivate"===n.className&&v([window.self],[n.dataset.buffid]).then(i(I,n))}export default function(){if(u())return
const t=c("quickbuff")
t&&(q(window.self).then(C),m(t.children[0],'<div id="helperQBheader"><table class="quickbuffTable"><thead><tr><th class="quickbuffTableHeader">Sustain</th><th class="quickbuffTableHeader">Fury Caster</th><th class="quickbuffTableHeader">Guild Buffer</th><th class="quickbuffTableHeader">Buff Master</th><th class="quickbuffTableHeader">Extend</th><th class="quickbuffTableHeader">Reinforce</th></tr></thead><tbody><tr><td id="fshSus" class="quickbuffTableDetail">&nbsp;</td><td id="fshFur" class="quickbuffTableDetail">&nbsp;</td><td id="fshGB"  class="quickbuffTableDetail">&nbsp;</td><td id="fshBM"  class="quickbuffTableDetail">&nbsp;</td><td id="fshExt" class="quickbuffTableDetail">&nbsp;</td><td id="fshRI"  class="quickbuffTableDetail">&nbsp;</td></tr></tbody></table></div>'),a('#buff-outer label[for^="skill-"]').forEach(N),L(),o(c("helperQBheader"),P),o(c("players"),x),c("targetPlayers").value&&M())}
//# sourceMappingURL=quickBuff-7a51bd0e.js.map
