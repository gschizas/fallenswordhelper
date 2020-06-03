import{n,M as t,o as r,s as e,i as s,f as o,A as a,a5 as i,D as c,p as f,w as u,l as d,aD as p}from"./calfSystem-57340987.js"
import"./numberIsNaN-9e712afc.js"
import{a as m}from"./roundToString-b39d3501.js"
import{p as l}from"./playerName-8027bacf.js"
import{t as b}from"./toLowerCase-b755896e.js"
import{c as h}from"./createInput-b52727dd.js"
import{b as g}from"./batch-e5312d78.js"
import"./currentGuildId-fd144a5c.js"
import"./idb-c55e2904.js"
import{i as j}from"./insertElementBefore-69bb0e1f.js"
import{c as w}from"./createSpan-14d38ba8.js"
import"./indexAjaxJson-f0b26dd6.js"
import"./cmdExport-1b96d8bc.js"
import{g as x}from"./guild-0ba7b16f.js"
import{g as N}from"./getMembrList-53881834.js"
import{r as k}from"./replaceChild-fba8ef2f.js"
import{n as v}from"./notLastUpdate-f9051eb8.js"
import{b as S}from"./bitwiseAnd-4459b6ec.js"
function C(t){return x(n({subcmd:"ranks"},t))}const I=[[2,5],[4,4],[64,5],[256,.1],[512,.2],[4096,.5],[32768,.2],[524288,.1],[65536,5],[4194304,4]]
function y(n,t){const r=t.children[0],e=a(r.firstChild),s=n.find(n=>n.name===e)
var o
s&&i(r,`<span class="fshBlue">(${o=s.permissions,m(I.filter(([n])=>S(o,n)).reduce((n,[,t])=>n+t-1,0)+o.toString(2).split("").map(Number).reduce((n,t)=>n+t,0),1)}) Tax:(${s.tax}%)</span> `)}function B(n,t,r){r.s&&(n.forEach(e(y,[r.r[0]].concat(r.r.ranks))),t.classList.remove("fshSpinner"))}function E(n,t){const r=w({className:"fshBlock fshRelative fshSpinner fshSpinner12",style:{height:"15px",width:"136px"}})
k(r,t),C().then(e(B,n,r))}function A(n){const a=t('#pCC a[href*="=ranks&subcmd2=add"]')
a&&function(n,t){const a=h({className:"custombutton",type:"button",value:"Get Rank Weightings"})
r(a,e(E,n,a))
const i=t.parentNode.parentNode
s(i,"&nbsp;"),o(i,a)}(n,a)}function L(n,t){return function(n,t){return C({subcmd2:n,rank_id:t})}(n,t)}let U
function _(n){const t=n.target.parentNode.parentNode.parentNode,r=t.rowIndex+("Up"===n.target.value?-1:2);(function(n,t){return U>=Math.min(n.rowIndex,t)||t<1||t>n.parentNode.rows.length})(t,r)||function(n,t,r){const e=n.target.getAttribute("onclick").match(/rank_id=(\d+)/)
L(b(n.target.value),e[1])
const s=t.parentNode.rows[r]
j(t,s)
const o="Up"===n.target.value?-22:22
window.scrollBy(0,o),n.stopPropagation()}(n,t,r)}function D(n){(function(n){return["Up","Down"].includes(n.target.value)})(n)&&_(n)}function G(n,t){return t[0]===n}function M(n,t){const r=t.children[0],o=function(n,t){return 1===n.rowIndex?"Guild Founder":a(t)}(t,r),i=n.find(e(G,o));(function(n){return n&&n[1].length>0})(i)&&(!function(n,t){t&&t[1].includes(l())&&(U=n.rowIndex)}(t,i),s(r,` <span class="fshBlue">- ${i[1].join(", ")}</span>`))}function R(n){const t=function(){const n=f.lastElementChild.previousElementSibling
if(n.rows&&n.rows.length>7)return p(n.rows[7].children[0].children[0].rows)}()
t&&(g([5,3,t,1,e(M,n)]),A(t),U&&c("ajaxifyRankControls")&&r(f,D,!0))}function $(n,t){const r=n.find(e(G,t[1].rank_name))
return r?r[1].push(t[0]):n.push([t[1].rank_name,[t[0]]]),n}function T(n){return d(n).filter(v).reduce($,[])}export default function(){u()||N(!1).then(T).then(R)}
//# sourceMappingURL=rank-15d4cb04.js.map
