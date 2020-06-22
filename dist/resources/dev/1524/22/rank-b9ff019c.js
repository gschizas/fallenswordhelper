import{q as n,C as t,o as e,t as r,i as s,h as o,B as a,a5 as i,G as c,p as f,x as u,e as p,M as d}from"./calfSystem-4cc738f8.js"
import"./numberIsNaN-1f5d9185.js"
import"./round-ae063e6e.js"
import{r as m}from"./roundToString-4e873f49.js"
import{p as l}from"./playerName-2fd84b2a.js"
import{t as h}from"./toLowerCase-e8c3179d.js"
import{c as b}from"./createInput-8a96566e.js"
import{b as j}from"./batch-b1efab68.js"
import{i as g}from"./insertElementBefore-dcd1920e.js"
import"./currentGuildId-53b525a7.js"
import"./idb-670c0cca.js"
import{c as w}from"./createSpan-273eaa7e.js"
import"./indexAjaxJson-39fb942e.js"
import"./cmdExport-3370ea6e.js"
import{g as x}from"./guild-152cc6b9.js"
import{g as N}from"./getMembrList-51ef4f9e.js"
import{r as k}from"./replaceChild-62faa79f.js"
import{n as v}from"./notLastUpdate-ce995a50.js"
import{b as C}from"./bitwiseAnd-29fd9ac9.js"
function S(t){return x(n({subcmd:"ranks"},t))}const I=[[2,5],[4,4],[64,5],[256,.1],[512,.2],[4096,.5],[32768,.2],[524288,.1],[65536,5],[4194304,4]]
function y(n,t){const e=t.children[0],r=a(e.firstChild),s=n.find(n=>n.name===r)
var o
s&&i(e,`<span class="fshBlue">(${o=s.permissions,m(I.filter(([n])=>C(o,n)).reduce((n,[,t])=>n+t-1,0)+o.toString(2).split("").map(Number).reduce((n,t)=>n+t,0),1)}) Tax:(${s.tax}%)</span> `)}function B(n,t,e){e.s&&(n.forEach(r(y,[e.r[0]].concat(e.r.ranks))),t.classList.remove("fshSpinner"))}function E(n,t){const e=w({className:"fshBlock fshRelative fshSpinner fshSpinner12",style:{height:"15px",width:"136px"}})
k(e,t),S().then(r(B,n,e))}function G(n){const a=t('#pCC a[href*="=ranks&subcmd2=add"]')
a&&function(n,t){const a=b({className:"custombutton",type:"button",value:"Get Rank Weightings"})
e(a,r(E,n,a))
const i=t.parentNode.parentNode
s(i,"&nbsp;"),o(i,a)}(n,a)}function L(n,t){return function(n,t){return S({subcmd2:n,rank_id:t})}(n,t)}let U
function _(n){const t=n.target.parentNode.parentNode.parentNode,e=t.rowIndex+("Up"===n.target.value?-1:2);(function(n,t){return U>=Math.min(n.rowIndex,t)||t<1||t>n.parentNode.rows.length})(t,e)||function(n,t,e){const r=n.target.getAttribute("onclick").match(/rank_id=(\d+)/)
L(h(n.target.value),r[1])
const s=t.parentNode.rows[e]
g(t,s)
const o="Up"===n.target.value?-22:22
window.scrollBy(0,o),n.stopPropagation()}(n,t,e)}function A(n){(function(n){return["Up","Down"].includes(n.target.value)})(n)&&_(n)}function M(n,t){return t[0]===n}function R(n,t){const e=t.children[0],o=function(n,t){return 1===n.rowIndex?"Guild Founder":a(t)}(t,e),i=n.find(r(M,o));(function(n){return n&&n[1].length>0})(i)&&(!function(n,t){t&&t[1].includes(l())&&(U=n.rowIndex)}(t,i),s(e,` <span class="fshBlue">- ${i[1].join(", ")}</span>`))}function $(n){const t=function(){const n=f.lastElementChild.previousElementSibling
if(n.rows&&n.rows.length>7)return d(n.rows[7].children[0].children[0].rows)}()
t&&(j([5,3,t,1,r(R,n)]),G(t),U&&c("ajaxifyRankControls")&&e(f,A,!0))}function T(n,t){const e=n.find(r(M,t[1].rank_name))
return e?e[1].push(t[0]):n.push([t[1].rank_name,[t[0]]]),n}function q(n){return p(n).filter(v).reduce(T,[])}export default function(){u()||N(!1).then(q).then($)}
//# sourceMappingURL=rank-b9ff019c.js.map
