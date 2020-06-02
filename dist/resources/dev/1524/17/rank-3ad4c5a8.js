import{n,N as t,o as r,s as e,i as s,f as o,A as a,a5 as i,D as c,p as f,w as u,l as d,a3 as p}from"./calfSystem-1c103624.js"
import"./numberIsNaN-40c4542d.js"
import"./round-c701b797.js"
import{r as m}from"./roundToString-c17b23bf.js"
import{p as l}from"./playerName-191d9509.js"
import{t as h}from"./toLowerCase-9f60cfa4.js"
import{c as b}from"./createInput-7f1f4562.js"
import{b as j}from"./batch-5d6f84ee.js"
import"./currentGuildId-b6fa52f3.js"
import"./idb-347cc2af.js"
import{i as g}from"./insertElementBefore-0e09c5df.js"
import{c as w}from"./createSpan-475e9683.js"
import"./indexAjaxJson-ed231bc3.js"
import"./cmdExport-15d3dc9a.js"
import{g as N}from"./guild-3ca78693.js"
import{g as x}from"./getMembrList-d1decafe.js"
import{r as k}from"./replaceChild-ab85c6cd.js"
import{n as v}from"./notLastUpdate-1b91283c.js"
import{b as S}from"./bitwiseAnd-94378271.js"
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
//# sourceMappingURL=rank-3ad4c5a8.js.map
