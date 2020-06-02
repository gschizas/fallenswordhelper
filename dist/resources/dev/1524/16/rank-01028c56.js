import{n,N as t,o as r,s as e,i as s,f as o,A as a,a5 as i,D as c,p as f,w as u,l as d,a3 as p}from"./calfSystem-d49dbbd3.js"
import"./numberIsNaN-1742f258.js"
import"./round-99c4f204.js"
import{r as m}from"./roundToString-263aa927.js"
import{p as l}from"./playerName-7c21a13e.js"
import{t as h}from"./toLowerCase-e686322a.js"
import{c as b}from"./createInput-1699d448.js"
import{b as j}from"./batch-3c533826.js"
import"./currentGuildId-fb556ea3.js"
import"./idb-a6d1a1ba.js"
import{i as g}from"./insertElementBefore-5eb6d41d.js"
import{c as w}from"./createSpan-d12a564e.js"
import"./indexAjaxJson-6ef1f9f4.js"
import"./cmdExport-1b537f9c.js"
import{g as N}from"./guild-5830ca1d.js"
import{g as x}from"./getMembrList-819169ef.js"
import{r as k}from"./replaceChild-a52f9a97.js"
import{n as v}from"./notLastUpdate-91671e5e.js"
import{b as S}from"./bitwiseAnd-8f029ba0.js"
function C(t){return N(n({subcmd:"ranks"},t))}const I=[[2,5],[4,4],[64,5],[256,.1],[512,.2],[4096,.5],[32768,.2],[524288,.1],[65536,5],[4194304,4]]
function y(n,t){const r=t.children[0],e=a(r.firstChild),s=n.find(n=>n.name===e)
var o
s&&i(r,`<span class="fshBlue">(${o=s.permissions,m(I.filter(([n])=>S(o,n)).reduce((n,[,t])=>n+t-1,0)+o.toString(2).split("").map(Number).reduce((n,t)=>n+t,0),1)}) Tax:(${s.tax}%)</span> `)}function B(n,t,r){r.s&&(n.forEach(e(y,[r.r[0]].concat(r.r.ranks))),t.classList.remove("fshSpinner"))}function E(n,t){const r=w({className:"fshBlock fshRelative fshSpinner fshSpinner12",style:{height:"15px",width:"136px"}})
k(r,t),C().then(e(B,n,r))}function A(n){const a=t('#pCC a[href*="=ranks&subcmd2=add"]')
a&&function(n,t){const a=b({className:"custombutton",type:"button",value:"Get Rank Weightings"})
r(a,e(E,n,a))
const i=t.parentNode.parentNode
s(i,"&nbsp;"),o(i,a)}(n,a)}function L(n,t){return function(n,t){return C({subcmd2:n,rank_id:t})}(n,t)}let U
function _(n){const t=n.target.parentNode.parentNode.parentNode,r=t.rowIndex+("Up"===n.target.value?-1:2);(function(n,t){return U>=Math.min(n.rowIndex,t)||t<1||t>n.parentNode.rows.length})(t,r)||function(n,t,r){const e=n.target.getAttribute("onclick").match(/rank_id=(\d+)/)
L(h(n.target.value),e[1])
const s=t.parentNode.rows[r]
g(t,s)
const o="Up"===n.target.value?-22:22
window.scrollBy(0,o),n.stopPropagation()}(n,t,r)}function G(n){(function(n){return["Up","Down"].includes(n.target.value)})(n)&&_(n)}function R(n,t){return t[0]===n}function $(n,t){const r=t.children[0],o=function(n,t){return 1===n.rowIndex?"Guild Founder":a(t)}(t,r),i=n.find(e(R,o));(function(n){return n&&n[1].length>0})(i)&&(!function(n,t){t&&t[1].includes(l())&&(U=n.rowIndex)}(t,i),s(r,` <span class="fshBlue">- ${i[1].join(", ")}</span>`))}function D(n){const t=function(){const n=f.lastElementChild.previousElementSibling
if(n.rows&&n.rows.length>7)return p(n.rows[7].children[0].children[0].rows)}()
t&&(j([5,3,t,1,e($,n)]),A(t),U&&c("ajaxifyRankControls")&&r(f,G,!0))}function M(n,t){const r=n.find(e(R,t[1].rank_name))
return r?r[1].push(t[0]):n.push([t[1].rank_name,[t[0]]]),n}function T(n){return d(n).filter(v).reduce(M,[])}export default function(){u()||x(!1).then(T).then(D)}
//# sourceMappingURL=rank-01028c56.js.map
