import{n,M as t,o as r,s as e,i as s,f as o,A as a,a5 as i,D as c,p as u,w as f,l as p,aD as d}from"./calfSystem-6fc0cc1b.js"
import"./numberIsNaN-4ae9af58.js"
import{a as m}from"./roundToString-3bd2d569.js"
import{p as l}from"./playerName-958718a3.js"
import{t as h}from"./toLowerCase-9e782464.js"
import{c as b}from"./createInput-75e5aa25.js"
import{b as g}from"./batch-b39f76d0.js"
import"./currentGuildId-33ea4168.js"
import"./idb-92d6a2b5.js"
import{i as j}from"./insertElementBefore-6f4b88f2.js"
import{c as w}from"./createSpan-12ee4f1a.js"
import"./indexAjaxJson-608117f0.js"
import"./cmdExport-ce8b0402.js"
import{g as x}from"./guild-6c498bb2.js"
import{g as N}from"./getMembrList-24c64c1b.js"
import{r as k}from"./replaceChild-ec811329.js"
import{n as v}from"./notLastUpdate-b092d336.js"
import{b as S}from"./bitwiseAnd-8db834ad.js"
function C(t){return x(n({subcmd:"ranks"},t))}const I=[[2,5],[4,4],[64,5],[256,.1],[512,.2],[4096,.5],[32768,.2],[524288,.1],[65536,5],[4194304,4]]
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
j(t,s)
const o="Up"===n.target.value?-22:22
window.scrollBy(0,o),n.stopPropagation()}(n,t,r)}function D(n){(function(n){return["Up","Down"].includes(n.target.value)})(n)&&_(n)}function G(n,t){return t[0]===n}function M(n,t){const r=t.children[0],o=function(n,t){return 1===n.rowIndex?"Guild Founder":a(t)}(t,r),i=n.find(e(G,o));(function(n){return n&&n[1].length>0})(i)&&(!function(n,t){t&&t[1].includes(l())&&(U=n.rowIndex)}(t,i),s(r,` <span class="fshBlue">- ${i[1].join(", ")}</span>`))}function R(n){const t=function(){const n=u.lastElementChild.previousElementSibling
if(n.rows&&n.rows.length>7)return d(n.rows[7].children[0].children[0].rows)}()
t&&(g([5,3,t,1,e(M,n)]),A(t),U&&c("ajaxifyRankControls")&&r(u,D,!0))}function $(n,t){const r=n.find(e(G,t[1].rank_name))
return r?r[1].push(t[0]):n.push([t[1].rank_name,[t[0]]]),n}function T(n){return p(n).filter(v).reduce($,[])}export default function(){f()||N(!1).then(T).then(R)}
//# sourceMappingURL=rank-5d3f3da4.js.map
