import{M as t,z as n,b as e,A as s,I as a,s as i,N as f,x as r,O as c,w as u,o}from"./calfSystem-dec5e071.js"
import{s as l}from"./setTipped-80e36195.js"
import"./insertElementBefore-1d764477.js"
import{c as d}from"./createSpan-660731dc.js"
import"./indexAjaxJson-ecf8d1f5.js"
import{c as m}from"./csvSplit-655e7fa5.js"
import{i as b}from"./insertHtmlAfterEnd-52e450d3.js"
import"./cmdExport-965d881b.js"
import{i as h}from"./insertElementAfter-5bd77494.js"
import{o as p}from"./outputFormat-e7a445b0.js"
import{f as k}from"./formatLastActivity-199986c2.js"
import{g as q}from"./getProfile-f1e3acc1.js"
import{d as v,q as E}from"./quickbuffSuccess-5534fd74.js"
function S(s){const a=function(n){let s=t("span.fshLastActivity",n)
if(!s){s=d({className:"fshLastActivity"})
const t=e("h1",n)[0]
h(s,t)}return s}(t(`div.player[data-username="${s.username}"]`))
n(`Last Activity: ${k(s.last_login)}<br>Stamina: ${s.current_stamina} / ${s.stamina} ( ${Math.floor(s.current_stamina/s.stamina*100)}% )`,a)}function T(t){return Number(s(t).replace(/\[|\]/g,""))}function g(t,e,s){if(!e)return void n("",s)
const a=T(t.nextElementSibling.children[0].children[0]),i=function(t,n){if(!n){const n=d({className:"fshPlayer"})
return h(n,t.nextElementSibling),n}return n}(t,s),f=function(t,n){return t>n?"fshRed":"fshGreen"}(a,e)
n(` <span class="${f}">[${e}]</span>`,i)}function j(t,n){return n[0]===t}function y(t,n){const e=function(t,n){const e=n.getAttribute("data-name"),s=t.find(i(j,e))
if(s)return s[1]}(t,n),s=n.nextElementSibling.nextElementSibling;(e||s)&&g(n,e,s)}function $(t){return t.split(/ \[|]/)}function x(t){const n=t.target
if("H1"!==n.tagName)return
q(s(n)).then(S)
const e=function(t){return m(s(t.parentNode.lastElementChild)).map($)}(n)
a("#buff-outer input[name]").forEach(i(y,e))}const A=[50,54,55,56,60,61,98,101]
function B(t,n){(function(t,n){return!A.includes(Number(t.htmlFor.slice(6)))&&T(n.children[0])<125})(t,n)&&t.classList.add("fshDim")}function N(t){const n=t.children[0]
!function(t,n){const e=n.dataset.tipped,{cost:s}=t.previousElementSibling.dataset
l(e.replace("</center>",`<br>Stamina Cost: ${s}$&`),n)}(t,n),B(t,n)}function H(t){const n=r("skill-"+t)
n&&(n.checked=!0)}function L(){const t=f("blist")
t&&function(t){t.split(";").forEach(H)}(t)}let D=0
function M(){const t=e("h1",r("players"))[0]
if(function(t){return!t&&D<9}(t))return D+=1,void setTimeout(M,100)
t&&c(t)}function R(t){return`<span class="fshLime">On</span>&nbsp;<span class="fshBuffOn">(${function(t){const n=Math.floor(t/60),e=t%60
let s=p(n,"m")
return n>0&&e>0&&(s+=" "),s+=p(e,"s"),s}(t)})</span>`}function F(n,e){const s=n[e]||0
return s?R(s):function(n){const e=t(`#buff-outer input[data-name="${n}"]`)
return e?`<span class="quickbuffActivate" data-buffid="${e.value}">Activate</span>`:'<span class="fshRed;">Off</span>'}(e)}function w(t,e,s){n(F(t,e),s)}function G(t,n){return t[n.name]=n.duration,t}function O(t,n){return n.name===t}function _(t,e,s){const a=function(t,n){const e=t.find(i(O,n))
return e&&e.value||0}(t,e)
let f="fshLime"
a<100&&(f="fshRed"),n(`<span class="${f}">${a}%</span>`,s)}function C(t){!function(t){const n=t._enhancements
_(n,"Sustain",r("fshSus")),_(n,"Fury Caster",r("fshFur"))}(t),function(t){const n=t._skills.reduce(G,{})
w(n,"Guild Buffer",r("fshGB")),w(n,"Buff Master",r("fshBM")),w(n,"Extend",r("fshExt")),w(n,"Reinforce",r("fshRI"))}(t)}function I(t,e){E(e)&&(t.className="fshLime",n("On",t))}function P(t){const n=t.target
"quickbuffActivate"===n.className&&v([window.self],[n.dataset.buffid]).then(i(I,n))}export default function(){if(u())return
const t=r("quickbuff")
t&&(q(window.self).then(C),b(t.children[0],'<div id="helperQBheader"><table class="quickbuffTable"><thead><tr><th class="quickbuffTableHeader">Sustain</th><th class="quickbuffTableHeader">Fury Caster</th><th class="quickbuffTableHeader">Guild Buffer</th><th class="quickbuffTableHeader">Buff Master</th><th class="quickbuffTableHeader">Extend</th><th class="quickbuffTableHeader">Reinforce</th></tr></thead><tbody><tr><td id="fshSus" class="quickbuffTableDetail">&nbsp;</td><td id="fshFur" class="quickbuffTableDetail">&nbsp;</td><td id="fshGB"  class="quickbuffTableDetail">&nbsp;</td><td id="fshBM"  class="quickbuffTableDetail">&nbsp;</td><td id="fshExt" class="quickbuffTableDetail">&nbsp;</td><td id="fshRI"  class="quickbuffTableDetail">&nbsp;</td></tr></tbody></table></div>'),a('#buff-outer label[for^="skill-"]').forEach(N),L(),o(r("helperQBheader"),P),o(r("players"),x),r("targetPlayers").value&&M())}
//# sourceMappingURL=quickBuff-feb3bd3a.js.map
