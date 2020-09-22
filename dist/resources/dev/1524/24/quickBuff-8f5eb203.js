import{C as t,A as e,b as n,B as s,D as a,t as i,Q as f,y as r,R as c,x as u,o}from"./calfSystem-38898f3e.js"
import{s as l}from"./setTipped-5c176332.js"
import"./insertElementBefore-2ad05963.js"
import{c as d}from"./createSpan-f1b09788.js"
import"./indexAjaxJson-2402e0e9.js"
import"./cmdExport-2f232ad1.js"
import{c as m}from"./csvSplit-dcc6dfc9.js"
import{i as b}from"./insertHtmlAfterEnd-8b82fe39.js"
import{i as h}from"./insertElementAfter-94e95b63.js"
import{o as p}from"./outputFormat-e549127b.js"
import"./splitTime-95f1d273.js"
import{f as k}from"./formatLastActivity-255c2462.js"
import{g as q}from"./getProfile-26340e43.js"
import{d as v,q as E}from"./quickbuffSuccess-ce0e43c3.js"
function T(s){const a=function(e){let s=t("span.fshLastActivity",e)
if(!s){s=d({className:"fshLastActivity"})
const t=n("h1",e)[0]
h(s,t)}return s}(t(`div.player[data-username="${s.username}"]`))
e(`Last Activity: ${k(s.last_login)}<br>Stamina: ${s.current_stamina} / ${s.stamina} ( ${Math.floor(s.current_stamina/s.stamina*100)}% )`,a)}function j(t){return Number(s(t).replace(/\[|\]/g,""))}function y(t,n,s){if(!n)return void e("",s)
const a=j(t.nextElementSibling.children[0].children[0]),i=function(t,e){if(!e){const e=d({className:"fshPlayer"})
return h(e,t.nextElementSibling),e}return e}(t,s),f=function(t,e){return t>e?"fshRed":"fshGreen"}(a,n)
e(` <span class="${f}">[${n}]</span>`,i)}function S(t,e){return e[0]===t}function g(t,e){const n=function(t,e){const n=e.getAttribute("data-name"),s=t.find(i(S,n))
if(s)return s[1]}(t,e),s=e.nextElementSibling.nextElementSibling;(n||s)&&y(e,n,s)}function $(t){return t.split(/ \[|]/)}function x(t){const e=t.target
if("H1"!==e.tagName)return
q(s(e)).then(T)
const n=function(t){return m(s(t.parentNode.lastElementChild)).map($)}(e)
a("#buff-outer input[name]").forEach(i(g,n))}const B=[50,54,55,56,60,61,98,101]
function A(t,e){(function(t,e){return!B.includes(Number(t.htmlFor.slice(6)))&&j(e.children[0])<125})(t,e)&&t.classList.add("fshDim")}function D(t){const e=t.children[0]
!function(t,e){const n=e.dataset.tipped,{cost:s}=t.previousElementSibling.dataset
l(n.replace("</center>",`<br>Stamina Cost: ${s}$&`),e)}(t,e),A(t,e)}function H(t){const e=r("skill-"+t)
e&&(e.checked=!0)}function L(){const t=f("blist")
t&&function(t){t.split(";").forEach(H)}(t)}let N=0
function R(){const t=n("h1",r("players"))[0]
if(function(t){return!t&&N<9}(t))return N+=1,void setTimeout(R,100)
t&&c(t)}function F(t){return`<span class="fshLime">On</span>&nbsp;<span class="fshBuffOn">(${function(t){const e=Math.floor(t/60),n=t%60
let s=p(e,"m")
return e>0&&n>0&&(s+=" "),s+=p(n,"s"),s}(t)})</span>`}function M(e,n){const s=e[n]||0
return s?F(s):function(e){const n=t(`#buff-outer input[data-name="${e}"]`)
return n?`<span class="quickbuffActivate" data-buffid="${n.value}">Activate</span>`:'<span class="fshRed;">Off</span>'}(n)}function C(t,n,s){e(M(t,n),s)}function G(t,e){return t[e.name]=e.duration,t}function _(t,e){return e.name===t}function w(t,n,s){const a=function(t,e){const n=t.find(i(_,e))
return n&&n.value||0}(t,n)
let f="fshLime"
a<100&&(f="fshRed"),e(`<span class="${f}">${a}%</span>`,s)}function O(t){!function(t){const e=t._enhancements
w(e,"Sustain",r("fshSus")),w(e,"Fury Caster",r("fshFur"))}(t),function(t){const e=t._skills.reduce(G,{})
C(e,"Guild Buffer",r("fshGB")),C(e,"Buff Master",r("fshBM")),C(e,"Extend",r("fshExt")),C(e,"Reinforce",r("fshRI"))}(t)}function P(t,n){E(n)&&(t.className="fshLime",e("On",t))}function Q(t){const e=t.target
"quickbuffActivate"===e.className&&v([window.self],[e.dataset.buffid]).then(i(P,e))}function I(){if(u())return
const t=r("quickbuff")
t&&(q(window.self).then(O),b(t.children[0],'<div id="helperQBheader"><table class="quickbuffTable"><thead><tr><th class="quickbuffTableHeader">Sustain</th><th class="quickbuffTableHeader">Fury Caster</th><th class="quickbuffTableHeader">Guild Buffer</th><th class="quickbuffTableHeader">Buff Master</th><th class="quickbuffTableHeader">Extend</th><th class="quickbuffTableHeader">Reinforce</th></tr></thead><tbody><tr><td id="fshSus" class="quickbuffTableDetail">&nbsp;</td><td id="fshFur" class="quickbuffTableDetail">&nbsp;</td><td id="fshGB"  class="quickbuffTableDetail">&nbsp;</td><td id="fshBM"  class="quickbuffTableDetail">&nbsp;</td><td id="fshExt" class="quickbuffTableDetail">&nbsp;</td><td id="fshRI"  class="quickbuffTableDetail">&nbsp;</td></tr></tbody></table></div>'),a('#buff-outer label[for^="skill-"]').forEach(D),L(),o(r("helperQBheader"),Q),o(r("players"),x),r("targetPlayers").value&&R())}export default I
//# sourceMappingURL=quickBuff-8f5eb203.js.map
