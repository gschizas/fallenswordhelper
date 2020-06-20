import{C as t,A as e,b as n,B as s,D as a,t as i,P as f,y as r,Q as c,x as u,o}from"./calfSystem-89b939c8.js"
import{s as l}from"./setTipped-3dfbd3ed.js"
import"./insertElementBefore-08d48547.js"
import{c as d}from"./createSpan-716fba1d.js"
import"./indexAjaxJson-dab169e3.js"
import"./cmdExport-788e7045.js"
import{c as b}from"./csvSplit-7b854e44.js"
import{i as m}from"./insertHtmlAfterEnd-c6efbdf8.js"
import{i as h}from"./insertElementAfter-4bc604b8.js"
import{o as p}from"./outputFormat-d814f2ee.js"
import"./splitTime-2fd0f1f1.js"
import{f as k}from"./formatLastActivity-5f2d5cfb.js"
import{g as q}from"./getProfile-82a0964d.js"
import{d as v,q as E}from"./quickbuffSuccess-6e88ed26.js"
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
const n=function(t){return b(s(t.parentNode.lastElementChild)).map($)}(e)
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
"quickbuffActivate"===e.className&&v([window.self],[e.dataset.buffid]).then(i(P,e))}export default function(){if(u())return
const t=r("quickbuff")
t&&(q(window.self).then(O),m(t.children[0],'<div id="helperQBheader"><table class="quickbuffTable"><thead><tr><th class="quickbuffTableHeader">Sustain</th><th class="quickbuffTableHeader">Fury Caster</th><th class="quickbuffTableHeader">Guild Buffer</th><th class="quickbuffTableHeader">Buff Master</th><th class="quickbuffTableHeader">Extend</th><th class="quickbuffTableHeader">Reinforce</th></tr></thead><tbody><tr><td id="fshSus" class="quickbuffTableDetail">&nbsp;</td><td id="fshFur" class="quickbuffTableDetail">&nbsp;</td><td id="fshGB"  class="quickbuffTableDetail">&nbsp;</td><td id="fshBM"  class="quickbuffTableDetail">&nbsp;</td><td id="fshExt" class="quickbuffTableDetail">&nbsp;</td><td id="fshRI"  class="quickbuffTableDetail">&nbsp;</td></tr></tbody></table></div>'),a('#buff-outer label[for^="skill-"]').forEach(D),L(),o(r("helperQBheader"),Q),o(r("players"),x),r("targetPlayers").value&&R())}
//# sourceMappingURL=quickBuff-9cee9801.js.map
