import{q as n,C as t,o as r,t as e,i as s,f as o,B as a,a7 as i,G as c,p as u,x as f,m as d,M as p}from"./calfSystem-03970067.js"
import"./numberIsNaN-b19dc958.js"
import{a as m}from"./roundToString-0800d627.js"
import{p as l}from"./playerName-e0979c8e.js"
import{t as h}from"./toLowerCase-5a7ad345.js"
import{c as b}from"./createInput-7a44ee58.js"
import{b as g}from"./batch-dfc92608.js"
import{i as j}from"./insertElementBefore-c9a36777.js"
import"./currentGuildId-cce6862b.js"
import"./idb-3dad9172.js"
import{c as w}from"./createSpan-3c9a32c0.js"
import"./indexAjaxJson-d04ad897.js"
import"./cmdExport-4773c3fd.js"
import{g as x}from"./guild-7e15ffba.js"
import{g as N}from"./getMembrList-3c92fb67.js"
import{r as k}from"./replaceChild-8aafc48e.js"
import{n as v}from"./notLastUpdate-85b98f9b.js"
import{b as C}from"./bitwiseAnd-07b3e052.js"
function S(t){return x(n({subcmd:"ranks"},t))}const I=[[2,5],[4,4],[64,5],[256,.1],[512,.2],[4096,.5],[32768,.2],[524288,.1],[65536,5],[4194304,4]]
function y(n,t){const r=t.children[0],e=a(r.firstChild),s=n.find(n=>n.name===e)
var o
s&&i(r,`<span class="fshBlue">(${o=s.permissions,m(I.filter(([n])=>C(o,n)).reduce((n,[,t])=>n+t-1,0)+o.toString(2).split("").map(Number).reduce((n,t)=>n+t,0),1)}) Tax:(${s.tax}%)</span> `)}function B(n,t,r){r.s&&(n.forEach(e(y,[r.r[0]].concat(r.r.ranks))),t.classList.remove("fshSpinner"))}function E(n,t){const r=w({className:"fshBlock fshRelative fshSpinner fshSpinner12",style:{height:"15px",width:"136px"}})
k(r,t),S().then(e(B,n,r))}function G(n){const a=t('#pCC a[href*="=ranks&subcmd2=add"]')
a&&function(n,t){const a=b({className:"custombutton",type:"button",value:"Get Rank Weightings"})
r(a,e(E,n,a))
const i=t.parentNode.parentNode
s(i,"&nbsp;"),o(i,a)}(n,a)}function L(n,t){return function(n,t){return S({subcmd2:n,rank_id:t})}(n,t)}let U
function _(n){const t=n.target.parentNode.parentNode.parentNode,r=t.rowIndex+("Up"===n.target.value?-1:2);(function(n,t){return U>=Math.min(n.rowIndex,t)||t<1||t>n.parentNode.rows.length})(t,r)||function(n,t,r){const e=n.target.getAttribute("onclick").match(/rank_id=(\d+)/)
L(h(n.target.value),e[1])
const s=t.parentNode.rows[r]
j(t,s)
const o="Up"===n.target.value?-22:22
window.scrollBy(0,o),n.stopPropagation()}(n,t,r)}function A(n){(function(n){return["Up","Down"].includes(n.target.value)})(n)&&_(n)}function M(n,t){return t[0]===n}function R(n,t){const r=t.children[0],o=function(n,t){return 1===n.rowIndex?"Guild Founder":a(t)}(t,r),i=n.find(e(M,o));(function(n){return n&&n[1].length>0})(i)&&(!function(n,t){t&&t[1].includes(l())&&(U=n.rowIndex)}(t,i),s(r,` <span class="fshBlue">- ${i[1].join(", ")}</span>`))}function $(n){const t=function(){const n=u.lastElementChild.previousElementSibling
if(n.rows&&n.rows.length>7)return p(n.rows[7].children[0].children[0].rows)}()
t&&(g([5,3,t,1,e(R,n)]),G(t),U&&c("ajaxifyRankControls")&&r(u,A,!0))}function T(n,t){const r=n.find(e(M,t[1].rank_name))
return r?r[1].push(t[0]):n.push([t[1].rank_name,[t[0]]]),n}function q(n){return d(n).filter(v).reduce(T,[])}export default function(){f()||N(!1).then(q).then($)}
//# sourceMappingURL=rank-321d1728.js.map
