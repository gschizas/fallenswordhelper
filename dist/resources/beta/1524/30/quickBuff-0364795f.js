import{C as t,A as e,b as n,B as s,D as a,t as i,y as f,P as c,Q as r,x as u,o}from"./calfSystem-ebf4b17d.js"
import{s as l}from"./setTipped-c3fa7f51.js"
import"./insertElementBefore-1b96a575.js"
import{c as d}from"./createSpan-2a49124f.js"
import{e as m}from"./executeAll-be2ac0ec.js"
import"./indexAjaxJson-91b10960.js"
import"./cmdExport-6e99c1e8.js"
import{c as b}from"./csvSplit-1d6bbc93.js"
import{i as h}from"./insertHtmlAfterEnd-e822003d.js"
import{i as p}from"./insertElementAfter-1e122994.js"
import{o as k}from"./outputFormat-08e5d29d.js"
import"./splitTime-9c9a4e4d.js"
import{f as q}from"./formatLastActivity-ba84748f.js"
import{g as y}from"./getProfile-45b98f95.js"
import{d as E,q as T}from"./quickbuffSuccess-7ee031ea.js"
function j(s){const a=function(e){let s=t("span.fshLastActivity",e)
if(!s){s=d({className:"fshLastActivity"})
const t=n("h1",e)[0]
p(s,t)}return s}(t(`div.player[data-username="${s.username}"]`))
e(`Last Activity: ${q(s.last_login)}<br>Stamina: ${s.current_stamina} / ${s.stamina} ( ${Math.floor(s.current_stamina/s.stamina*100)}% )`,a)}function v(t){return Number(s(t).replace(/\[|\]/g,""))}function g(t,n,s){if(!n)return void e("",s)
const a=v(t.nextElementSibling.children[0].children[0]),i=function(t,e){if(!e){const e=d({className:"fshPlayer"})
return p(e,t.nextElementSibling),e}return e}(t,s),f=function(t,e){return t>e?"fshRed":"fshGreen"}(a,n)
e(` <span class="${f}">[${n}]</span>`,i)}function S(t,e){return e[0]===t}function x(t,e){const n=function(t,e){const n=e.getAttribute("data-name"),s=t.find(i(S,n))
if(s)return s[1]}(t,e),s=e.nextElementSibling.nextElementSibling;(n||s)&&g(e,n,s)}function $(t){return t.split(/ \[|]/)}function A(t){const e=t.target
if("H1"!==e.tagName)return
y(s(e)).then(j)
const n=function(t){return b(s(t.parentNode.lastElementChild)).map($)}(e)
a("#buff-outer input[name]").forEach(i(x,n))}const B=[50,54,55,56,60,61,98,101]
function D(t,e){(function(t,e){return!B.includes(Number(t.htmlFor.slice(6)))&&v(e.children[0])<125})(t,e)&&t.classList.add("fshDim")}function H(t){const e=t.children[0]
!function(t,e){const n=e.dataset.tipped,{cost:s}=t.previousElementSibling.dataset
l(n.replace("</center>",`<br>Stamina Cost: ${s}$&`),e)}(t,e),D(t,e)}function L(){a('#buff-outer label[for^="skill-"]').forEach(H)}function N(t){const e=n("h1",f("players"))[0]
!function(t,e){return!t&&e}(e,t)?e&&c(e):setTimeout(N,100,t-1)}function R(){f("targetPlayers").value&&N(9)}function w(t){return`<span class="fshLime">On</span>&nbsp;<span class="fshBuffOn">(${function(t){const e=Math.floor(t/60),n=t%60
let s=k(e,"m")
return e>0&&n>0&&(s+=" "),s+=k(n,"s"),s}(t)})</span>`}function F(e,n){const s=e[n]||0
return s?w(s):function(e){const n=t(`#buff-outer input[data-name="${e}"]`)
return n?`<span class="quickbuffActivate" data-buffid="${n.value}">Activate</span>`:'<span class="fshRed;">Off</span>'}(n)}function M(t,n,s){e(F(t,n),s)}function C(t,e){return t[e.name]=e.duration,t}function G(t,e){return e.name===t}function P(t,n,s){const a=function(t,e){const n=t.find(i(G,e))
return n&&n.value||0}(t,n)
let f="fshLime"
a<100&&(f="fshRed"),e(`<span class="${f}">${a}%</span>`,s)}function _(t){!function(t){const e=t._enhancements
P(e,"Sustain",f("fshSus")),P(e,"Fury Caster",f("fshFur"))}(t),function(t){const e=t._skills.reduce(C,{})
M(e,"Guild Buffer",f("fshGB")),M(e,"Buff Master",f("fshBM")),M(e,"Extend",f("fshExt")),M(e,"Reinforce",f("fshRI"))}(t)}function O(t){const e=f("skill-"+t)
e&&(e.checked=!0)}function Q(){const t=r("blist")
t&&function(t){t.split(";").forEach(O)}(t)}let I
function J(){I.length?(window.addPlayer(I.shift()),setTimeout(J,200)):R()}function z(){const t=r("players")
t&&(I=b(t),J())}function K(t,n){T(n)&&(t.className="fshLime",e("On",t))}function U(t){const e=t.target
"quickbuffActivate"===e.className&&E([window.self],[e.dataset.buffid]).then(i(K,e))}function V(){o(f("helperQBheader"),U),o(f("players"),A)}function W(){if(u())return
const t=f("quickbuff")
t&&(y(window.self).then(_),h(t.children[0],'<div id="helperQBheader"><table class="quickbuffTable"><thead><tr><th class="quickbuffTableHeader">Sustain</th><th class="quickbuffTableHeader">Fury Caster</th><th class="quickbuffTableHeader">Guild Buffer</th><th class="quickbuffTableHeader">Buff Master</th><th class="quickbuffTableHeader">Extend</th><th class="quickbuffTableHeader">Reinforce</th></tr></thead><tbody><tr><td id="fshSus" class="quickbuffTableDetail">&nbsp;</td><td id="fshFur" class="quickbuffTableDetail">&nbsp;</td><td id="fshGB"  class="quickbuffTableDetail">&nbsp;</td><td id="fshBM"  class="quickbuffTableDetail">&nbsp;</td><td id="fshExt" class="quickbuffTableDetail">&nbsp;</td><td id="fshRI"  class="quickbuffTableDetail">&nbsp;</td></tr></tbody></table></div>'),m([L,Q,z,V,R]))}export default W
//# sourceMappingURL=quickBuff-0364795f.js.map
