import{C as t,A as n,b as s,B as e,D as a,t as i,P as f,y as r,Q as c,x as u,o}from"./calfSystem-34fcd691.js"
import{s as l}from"./setTipped-d4d554a0.js"
import"./insertElementBefore-f1fdb06b.js"
import{c as d}from"./createSpan-4ec18ffd.js"
import"./indexAjaxJson-951ebca2.js"
import"./cmdExport-963c885b.js"
import{c as m}from"./csvSplit-4ba7a6af.js"
import{i as b}from"./insertHtmlAfterEnd-d9a9762d.js"
import{i as h}from"./insertElementAfter-f1caaf81.js"
import{o as p}from"./outputFormat-989c4647.js"
import"./splitTime-3bc21465.js"
import{f as k}from"./formatLastActivity-7a763dd4.js"
import{g as q}from"./getProfile-5811c437.js"
import{d as v,q as E}from"./quickbuffSuccess-0864e3ff.js"
function T(e){const a=function(n){let e=t("span.fshLastActivity",n)
if(!e){e=d({className:"fshLastActivity"})
const t=s("h1",n)[0]
h(e,t)}return e}(t(`div.player[data-username="${e.username}"]`))
n(`Last Activity: ${k(e.last_login)}<br>Stamina: ${e.current_stamina} / ${e.stamina} ( ${Math.floor(e.current_stamina/e.stamina*100)}% )`,a)}function j(t){return Number(e(t).replace(/\[|\]/g,""))}function y(t,s,e){if(!s)return void n("",e)
const a=j(t.nextElementSibling.children[0].children[0]),i=function(t,n){if(!n){const n=d({className:"fshPlayer"})
return h(n,t.nextElementSibling),n}return n}(t,e),f=function(t,n){return t>n?"fshRed":"fshGreen"}(a,s)
n(` <span class="${f}">[${s}]</span>`,i)}function S(t,n){return n[0]===t}function g(t,n){const s=function(t,n){const s=n.getAttribute("data-name"),e=t.find(i(S,s))
if(e)return e[1]}(t,n),e=n.nextElementSibling.nextElementSibling;(s||e)&&y(n,s,e)}function $(t){return t.split(/ \[|]/)}function x(t){const n=t.target
if("H1"!==n.tagName)return
q(e(n)).then(T)
const s=function(t){return m(e(t.parentNode.lastElementChild)).map($)}(n)
a("#buff-outer input[name]").forEach(i(g,s))}const B=[50,54,55,56,60,61,98,101]
function A(t,n){(function(t,n){return!B.includes(Number(t.htmlFor.slice(6)))&&j(n.children[0])<125})(t,n)&&t.classList.add("fshDim")}function D(t){const n=t.children[0]
!function(t,n){const s=n.dataset.tipped,{cost:e}=t.previousElementSibling.dataset
l(s.replace("</center>",`<br>Stamina Cost: ${e}$&`),n)}(t,n),A(t,n)}function H(t){const n=r("skill-"+t)
n&&(n.checked=!0)}function L(){const t=f("blist")
t&&function(t){t.split(";").forEach(H)}(t)}let N=0
function R(){const t=s("h1",r("players"))[0]
if(function(t){return!t&&N<9}(t))return N+=1,void setTimeout(R,100)
t&&c(t)}function F(t){return`<span class="fshLime">On</span>&nbsp;<span class="fshBuffOn">(${function(t){const n=Math.floor(t/60),s=t%60
let e=p(n,"m")
return n>0&&s>0&&(e+=" "),e+=p(s,"s"),e}(t)})</span>`}function M(n,s){const e=n[s]||0
return e?F(e):function(n){const s=t(`#buff-outer input[data-name="${n}"]`)
return s?`<span class="quickbuffActivate" data-buffid="${s.value}">Activate</span>`:'<span class="fshRed;">Off</span>'}(s)}function C(t,s,e){n(M(t,s),e)}function G(t,n){return t[n.name]=n.duration,t}function _(t,n){return n.name===t}function w(t,s,e){const a=function(t,n){const s=t.find(i(_,n))
return s&&s.value||0}(t,s)
let f="fshLime"
a<100&&(f="fshRed"),n(`<span class="${f}">${a}%</span>`,e)}function O(t){!function(t){const n=t._enhancements
w(n,"Sustain",r("fshSus")),w(n,"Fury Caster",r("fshFur"))}(t),function(t){const n=t._skills.reduce(G,{})
C(n,"Guild Buffer",r("fshGB")),C(n,"Buff Master",r("fshBM")),C(n,"Extend",r("fshExt")),C(n,"Reinforce",r("fshRI"))}(t)}function P(t,s){E(s)&&(t.className="fshLime",n("On",t))}function Q(t){const n=t.target
"quickbuffActivate"===n.className&&v([window.self],[n.dataset.buffid]).then(i(P,n))}export default function(){if(u())return
const t=r("quickbuff")
t&&(q(window.self).then(O),b(t.children[0],'<div id="helperQBheader"><table class="quickbuffTable"><thead><tr><th class="quickbuffTableHeader">Sustain</th><th class="quickbuffTableHeader">Fury Caster</th><th class="quickbuffTableHeader">Guild Buffer</th><th class="quickbuffTableHeader">Buff Master</th><th class="quickbuffTableHeader">Extend</th><th class="quickbuffTableHeader">Reinforce</th></tr></thead><tbody><tr><td id="fshSus" class="quickbuffTableDetail">&nbsp;</td><td id="fshFur" class="quickbuffTableDetail">&nbsp;</td><td id="fshGB"  class="quickbuffTableDetail">&nbsp;</td><td id="fshBM"  class="quickbuffTableDetail">&nbsp;</td><td id="fshExt" class="quickbuffTableDetail">&nbsp;</td><td id="fshRI"  class="quickbuffTableDetail">&nbsp;</td></tr></tbody></table></div>'),a('#buff-outer label[for^="skill-"]').forEach(D),L(),o(r("helperQBheader"),Q),o(r("players"),x),r("targetPlayers").value&&R())}
//# sourceMappingURL=quickBuff-bdb128a1.js.map
