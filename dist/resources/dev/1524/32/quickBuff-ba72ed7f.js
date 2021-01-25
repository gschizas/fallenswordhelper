import{c as t}from"./createSpan-58506d04.js"
import{f as e}from"./formatLastActivity-6ce0e0d0.js"
import{C as n,A as s,b as a,B as i,D as f,t as r,y as c,R as u,S as o,x as l,o as d}from"./calfSystem-19a5d332.js"
import{i as m}from"./insertElementAfter-40394910.js"
import{c as b}from"./csvSplit-a4e91aa0.js"
import{g as h}from"./getProfile-d128b80b.js"
import{s as p}from"./setTipped-808b71de.js"
import{e as k}from"./executeAll-f8eab1e4.js"
import{o as q}from"./outputFormat-264fcef1.js"
import{i as y}from"./insertHtmlAfterEnd-6d4e13a3.js"
import{d as E,q as T}from"./quickbuffSuccess-f9e4e932.js"
import"./splitTime-b1d0d296.js"
import"./insertElementBefore-aa28f497.js"
import"./cmdExport-bf03c29e.js"
import"./indexAjaxJson-bdfce70d.js"
function j(i){const f=function(e){let s=n("span.fshLastActivity",e)
if(!s){s=t({className:"fshLastActivity"})
const n=a("h1",e)[0]
m(s,n)}return s}(n(`div.player[data-username="${i.username}"]`))
s(`Last Activity: ${e(i.last_login)}<br>Stamina: ${i.current_stamina} / ${i.stamina} ( ${Math.floor(i.current_stamina/i.stamina*100)}% )`,f)}function v(t){return Number(i(t).replace(/\[|\]/g,""))}function S(e,n,a){if(!n)return void s("",a)
const i=v(e.nextElementSibling.children[0].children[0]),f=function(e,n){if(!n){const n=t({className:"fshPlayer"})
return m(n,e.nextElementSibling),n}return n}(e,a),r=function(t,e){return t>e?"fshRed":"fshGreen"}(i,n)
s(` <span class="${r}">[${n}]</span>`,f)}function g(t,e){return e[0]===t}function $(t,e){const n=function(t,e){const n=e.getAttribute("data-name"),s=t.find(r(g,n))
if(s)return s[1]}(t,e),s=e.nextElementSibling.nextElementSibling;(n||s)&&S(e,n,s)}function x(t){return t.split(/ \[|]/)}function A(t){const e=t.target
if("H1"!==e.tagName)return
h(i(e)).then(j)
const n=function(t){return b(i(t.parentNode.lastElementChild)).map(x)}(e)
f("#buff-outer input[name]").forEach(r($,n))}const B=[50,54,55,56,60,61,98,101]
function D(t,e){(function(t,e){return!B.includes(Number(t.htmlFor.slice(6)))&&v(e.children[0])<125})(t,e)&&t.classList.add("fshDim")}function H(t){const e=t.children[0]
!function(t,e){const n=e.dataset.tipped,{cost:s}=t.previousElementSibling.dataset
p(n.replace("</center>",`<br>Stamina Cost: ${s}$&`),e)}(t,e),D(t,e)}function L(){f('#buff-outer label[for^="skill-"]').forEach(H)}function N(t){const e=a("h1",c("players"))[0]
!function(t,e){return!t&&e}(e,t)?e&&u(e):setTimeout(N,100,t-1)}function R(){c("targetPlayers").value&&N(9)}function w(t){return`<span class="fshLime">On</span>&nbsp;<span class="fshBuffOn">(${function(t){const e=Math.floor(t/60),n=t%60
let s=q(e,"m")
return e>0&&n>0&&(s+=" "),s+=q(n,"s"),s}(t)})</span>`}function F(t,e){const s=t[e]||0
return s?w(s):function(t){const e=n(`#buff-outer input[data-name="${t}"]`)
return e?`<span class="quickbuffActivate" data-buffid="${e.value}">Activate</span>`:'<span class="fshRed;">Off</span>'}(e)}function M(t,e,n){s(F(t,e),n)}function C(t,e){return t[e.name]=e.duration,t}function G(t,e){return e.name===t}function _(t,e,n){const a=function(t,e){const n=t.find(r(G,e))
return n&&n.value||0}(t,e)
let i="fshLime"
a<100&&(i="fshRed"),s(`<span class="${i}">${a}%</span>`,n)}function O(t){!function(t){const e=t._enhancements
_(e,"Sustain",c("fshSus")),_(e,"Fury Caster",c("fshFur"))}(t),function(t){const e=t._skills.reduce(C,{})
M(e,"Guild Buffer",c("fshGB")),M(e,"Buff Master",c("fshBM")),M(e,"Extend",c("fshExt")),M(e,"Reinforce",c("fshRI"))}(t)}function P(t){const e=c(`skill-${t}`)
e&&(e.checked=!0)}function I(){const t=o("blist")
t&&function(t){t.split(";").forEach(P)}(t)}let Q
function J(){Q.length?(window.addPlayer(Q.shift()),setTimeout(J,200)):R()}function z(){const t=o("players")
t&&(Q=b(t),J())}function K(t,e){T(e)&&(t.className="fshLime",s("On",t))}function U(t){const e=t.target
"quickbuffActivate"===e.className&&E([window.self],[e.dataset.buffid]).then(r(K,e))}function V(){d(c("helperQBheader"),U),d(c("players"),A)}function W(){if(l())return
const t=c("quickbuff")
t&&(h(window.self).then(O),y(t.children[0],'<div id="helperQBheader"><table class="quickbuffTable"><thead><tr><th class="quickbuffTableHeader">Sustain</th><th class="quickbuffTableHeader">Fury Caster</th><th class="quickbuffTableHeader">Guild Buffer</th><th class="quickbuffTableHeader">Buff Master</th><th class="quickbuffTableHeader">Extend</th><th class="quickbuffTableHeader">Reinforce</th></tr></thead><tbody><tr><td id="fshSus" class="quickbuffTableDetail">&nbsp;</td><td id="fshFur" class="quickbuffTableDetail">&nbsp;</td><td id="fshGB"  class="quickbuffTableDetail">&nbsp;</td><td id="fshBM"  class="quickbuffTableDetail">&nbsp;</td><td id="fshExt" class="quickbuffTableDetail">&nbsp;</td><td id="fshRI"  class="quickbuffTableDetail">&nbsp;</td></tr></tbody></table></div>'),k([L,I,z,V,R]))}export default W
//# sourceMappingURL=quickBuff-ba72ed7f.js.map
