import{q as n,C as t,o as e,t as r,i as s,h as o,B as a,a8 as i,H as c,p as u,x as d,e as f,M as p}from"./calfSystem-45544049.js"
import{b as m}from"./batch-62de3d3c.js"
import{g as l}from"./getMembrList-dc370f1b.js"
import{n as h}from"./notLastUpdate-4884fa95.js"
import{b}from"./bitwiseAnd-29d0b75e.js"
import{c as g}from"./createInput-8791792e.js"
import{c as j}from"./createSpan-4c34b034.js"
import{g as w}from"./guild-df4d675e.js"
import{r as x}from"./replaceChild-8d8a2a65.js"
import{r as N}from"./roundToString-dbdb82cb.js"
import{i as k}from"./insertElementBefore-aa28f497.js"
import{p as v}from"./playerName-c1bcaeb9.js"
import{t as C}from"./toLowerCase-ace931b6.js"
import"./currentGuildId-2687cdb7.js"
import"./cmdExport-4fdfd8a3.js"
import"./indexAjaxJson-e79ad7ee.js"
import"./idb-ca3578bc.js"
import"./numberIsNaN-fecd7e6d.js"
function S(t){return w(n({subcmd:"ranks"},t))}const I=[[2,5],[4,4],[64,5],[256,.1],[512,.2],[4096,.5],[32768,.2],[524288,.1],[65536,5],[4194304,4]]
function y(n,t){const e=t.children[0],r=a(e.firstChild),s=n.find((n=>n.name===r))
var o
s&&i(e,`<span class="fshBlue">(${o=s.permissions,N(I.filter((([n])=>b(o,n))).reduce(((n,[,t])=>n+t-1),0)+o.toString(2).split("").map(Number).reduce(((n,t)=>n+t),0),1)}) Tax:(${s.tax}%)</span> `)}function B(n,t,e){e.s&&(n.forEach(r(y,[e.r[0]].concat(e.r.ranks))),t.classList.remove("fshSpinner"))}function E(n,t){const e=j({className:"fshBlock fshRelative fshSpinner fshSpinner12",style:{height:"15px",width:"136px"}})
x(e,t),S().then(r(B,n,e))}function L(n){const a=t('#pCC a[href*="=ranks&subcmd2=add"]')
a&&function(n,t){const a=g({className:"custombutton",type:"button",value:"Get Rank Weightings"})
e(a,r(E,n,a))
const i=t.parentNode.parentNode
s(i,"&nbsp;"),o(i,a)}(n,a)}function U(n,t){return function(n,t){return S({subcmd2:n,rank_id:t})}(n,t)}let _
function A(n){const t=n.target.parentNode.parentNode.parentNode,e=t.rowIndex+("Up"===n.target.value?-1:2);(function(n,t){return _>=Math.min(n.rowIndex,t)||t<1||t>n.parentNode.rows.length})(t,e)||function(n,t,e){const r=n.target.getAttribute("onclick").match(/rank_id=(\d+)/)
U(C(n.target.value),r[1])
const s=t.parentNode.rows[e]
k(t,s)
const o="Up"===n.target.value?-22:22
window.scrollBy(0,o),n.stopPropagation()}(n,t,e)}function G(n){(function(n){return["Up","Down"].includes(n.target.value)})(n)&&A(n)}function M(n,t){return t[0]===n}function R(n,t){const e=t.children[0],o=function(n,t){return 1===n.rowIndex?"Guild Founder":a(t)}(t,e),i=n.find(r(M,o));(function(n){return n&&n[1].length>0})(i)&&(!function(n,t){t&&t[1].includes(v())&&(_=n.rowIndex)}(t,i),s(e,` <span class="fshBlue">- ${i[1].join(", ")}</span>`))}function $(n){const t=function(){const n=u.lastElementChild.previousElementSibling
if(n.rows&&n.rows.length>7)return p(n.rows[7].children[0].children[0].rows)}()
t&&(m([5,3,t,1,r(R,n)]),L(t),_&&c("ajaxifyRankControls")&&e(u,G,!0))}function T(n,t){const e=n.find(r(M,t[1].rank_name))
return e?e[1].push(t[0]):n.push([t[1].rank_name,[t[0]]]),n}function q(n){return f(n).filter(h).reduce(T,[])}function D(){d()||l(!1).then(q).then($)}export default D
//# sourceMappingURL=rank-d5a131d0.js.map
