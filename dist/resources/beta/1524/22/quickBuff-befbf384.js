import{C as t,A as n,b as e,B as s,D as a,t as i,P as f,y as r,Q as c,x as u,o}from"./calfSystem-1b876afa.js"
import{s as l}from"./setTipped-aa3fcf43.js"
import"./insertElementBefore-f07a50c4.js"
import{c as d}from"./createSpan-bd67d773.js"
import"./indexAjaxJson-1a78cb06.js"
import"./cmdExport-f01a6b63.js"
import{c as b}from"./csvSplit-e0564c5b.js"
import{i as m}from"./insertHtmlAfterEnd-dd9b917d.js"
import{i as h}from"./insertElementAfter-15b302d6.js"
import{o as p}from"./outputFormat-e587da15.js"
import"./splitTime-96fb8c67.js"
import{f as k}from"./formatLastActivity-e55eafe6.js"
import{g as q}from"./getProfile-712ac5b2.js"
import{d as v,q as E}from"./quickbuffSuccess-d0450607.js"
function T(s){const a=function(n){let s=t("span.fshLastActivity",n)
if(!s){s=d({className:"fshLastActivity"})
const t=e("h1",n)[0]
h(s,t)}return s}(t(`div.player[data-username="${s.username}"]`))
n(`Last Activity: ${k(s.last_login)}<br>Stamina: ${s.current_stamina} / ${s.stamina} ( ${Math.floor(s.current_stamina/s.stamina*100)}% )`,a)}function j(t){return Number(s(t).replace(/\[|\]/g,""))}function y(t,e,s){if(!e)return void n("",s)
const a=j(t.nextElementSibling.children[0].children[0]),i=function(t,n){if(!n){const n=d({className:"fshPlayer"})
return h(n,t.nextElementSibling),n}return n}(t,s),f=function(t,n){return t>n?"fshRed":"fshGreen"}(a,e)
n(` <span class="${f}">[${e}]</span>`,i)}function S(t,n){return n[0]===t}function g(t,n){const e=function(t,n){const e=n.getAttribute("data-name"),s=t.find(i(S,e))
if(s)return s[1]}(t,n),s=n.nextElementSibling.nextElementSibling;(e||s)&&y(n,e,s)}function $(t){return t.split(/ \[|]/)}function x(t){const n=t.target
if("H1"!==n.tagName)return
q(s(n)).then(T)
const e=function(t){return b(s(t.parentNode.lastElementChild)).map($)}(n)
a("#buff-outer input[name]").forEach(i(g,e))}const B=[50,54,55,56,60,61,98,101]
function A(t,n){(function(t,n){return!B.includes(Number(t.htmlFor.slice(6)))&&j(n.children[0])<125})(t,n)&&t.classList.add("fshDim")}function D(t){const n=t.children[0]
!function(t,n){const e=n.dataset.tipped,{cost:s}=t.previousElementSibling.dataset
l(e.replace("</center>",`<br>Stamina Cost: ${s}$&`),n)}(t,n),A(t,n)}function H(t){const n=r("skill-"+t)
n&&(n.checked=!0)}function L(){const t=f("blist")
t&&function(t){t.split(";").forEach(H)}(t)}let N=0
function R(){const t=e("h1",r("players"))[0]
if(function(t){return!t&&N<9}(t))return N+=1,void setTimeout(R,100)
t&&c(t)}function F(t){return`<span class="fshLime">On</span>&nbsp;<span class="fshBuffOn">(${function(t){const n=Math.floor(t/60),e=t%60
let s=p(n,"m")
return n>0&&e>0&&(s+=" "),s+=p(e,"s"),s}(t)})</span>`}function M(n,e){const s=n[e]||0
return s?F(s):function(n){const e=t(`#buff-outer input[data-name="${n}"]`)
return e?`<span class="quickbuffActivate" data-buffid="${e.value}">Activate</span>`:'<span class="fshRed;">Off</span>'}(e)}function C(t,e,s){n(M(t,e),s)}function G(t,n){return t[n.name]=n.duration,t}function _(t,n){return n.name===t}function w(t,e,s){const a=function(t,n){const e=t.find(i(_,n))
return e&&e.value||0}(t,e)
let f="fshLime"
a<100&&(f="fshRed"),n(`<span class="${f}">${a}%</span>`,s)}function O(t){!function(t){const n=t._enhancements
w(n,"Sustain",r("fshSus")),w(n,"Fury Caster",r("fshFur"))}(t),function(t){const n=t._skills.reduce(G,{})
C(n,"Guild Buffer",r("fshGB")),C(n,"Buff Master",r("fshBM")),C(n,"Extend",r("fshExt")),C(n,"Reinforce",r("fshRI"))}(t)}function P(t,e){E(e)&&(t.className="fshLime",n("On",t))}function Q(t){const n=t.target
"quickbuffActivate"===n.className&&v([window.self],[n.dataset.buffid]).then(i(P,n))}export default function(){if(u())return
const t=r("quickbuff")
t&&(q(window.self).then(O),m(t.children[0],'<div id="helperQBheader"><table class="quickbuffTable"><thead><tr><th class="quickbuffTableHeader">Sustain</th><th class="quickbuffTableHeader">Fury Caster</th><th class="quickbuffTableHeader">Guild Buffer</th><th class="quickbuffTableHeader">Buff Master</th><th class="quickbuffTableHeader">Extend</th><th class="quickbuffTableHeader">Reinforce</th></tr></thead><tbody><tr><td id="fshSus" class="quickbuffTableDetail">&nbsp;</td><td id="fshFur" class="quickbuffTableDetail">&nbsp;</td><td id="fshGB"  class="quickbuffTableDetail">&nbsp;</td><td id="fshBM"  class="quickbuffTableDetail">&nbsp;</td><td id="fshExt" class="quickbuffTableDetail">&nbsp;</td><td id="fshRI"  class="quickbuffTableDetail">&nbsp;</td></tr></tbody></table></div>'),a('#buff-outer label[for^="skill-"]').forEach(D),L(),o(r("helperQBheader"),Q),o(r("players"),x),r("targetPlayers").value&&R())}
//# sourceMappingURL=quickBuff-befbf384.js.map
