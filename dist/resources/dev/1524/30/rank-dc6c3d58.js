import{q as n,C as t,o as r,t as e,i as s,h as o,B as a,a5 as i,H as c,p as f,x as u,e as p,M as d}from"./calfSystem-54df10e3.js"
import"./numberIsNaN-fa7d637d.js"
import"./round-6850c0fc.js"
import{r as m}from"./roundToString-16988956.js"
import{p as l}from"./playerName-8f1e4e48.js"
import{t as h}from"./toLowerCase-5e186769.js"
import{c as b}from"./createInput-0ba53f77.js"
import{b as j}from"./batch-08f429bb.js"
import{i as g}from"./insertElementBefore-1b96a575.js"
import"./currentGuildId-7eae4191.js"
import"./idb-7f0d2b39.js"
import{c as w}from"./createSpan-f01d3abc.js"
import"./indexAjaxJson-9f23f983.js"
import"./cmdExport-064541e3.js"
import{g as x}from"./guild-bcc0307e.js"
import{g as N}from"./getMembrList-c71eddc1.js"
import{r as k}from"./replaceChild-1b71706a.js"
import{n as v}from"./notLastUpdate-808bc69b.js"
import{b as C}from"./bitwiseAnd-af4dee83.js"
function S(t){return x(n({subcmd:"ranks"},t))}const I=[[2,5],[4,4],[64,5],[256,.1],[512,.2],[4096,.5],[32768,.2],[524288,.1],[65536,5],[4194304,4]]
function y(n,t){const r=t.children[0],e=a(r.firstChild),s=n.find(n=>n.name===e)
var o
s&&i(r,`<span class="fshBlue">(${o=s.permissions,m(I.filter(([n])=>C(o,n)).reduce((n,[,t])=>n+t-1,0)+o.toString(2).split("").map(Number).reduce((n,t)=>n+t,0),1)}) Tax:(${s.tax}%)</span> `)}function B(n,t,r){r.s&&(n.forEach(e(y,[r.r[0]].concat(r.r.ranks))),t.classList.remove("fshSpinner"))}function E(n,t){const r=w({className:"fshBlock fshRelative fshSpinner fshSpinner12",style:{height:"15px",width:"136px"}})
k(r,t),S().then(e(B,n,r))}function L(n){const a=t('#pCC a[href*="=ranks&subcmd2=add"]')
a&&function(n,t){const a=b({className:"custombutton",type:"button",value:"Get Rank Weightings"})
r(a,e(E,n,a))
const i=t.parentNode.parentNode
s(i,"&nbsp;"),o(i,a)}(n,a)}function U(n,t){return function(n,t){return S({subcmd2:n,rank_id:t})}(n,t)}let _
function A(n){const t=n.target.parentNode.parentNode.parentNode,r=t.rowIndex+("Up"===n.target.value?-1:2);(function(n,t){return _>=Math.min(n.rowIndex,t)||t<1||t>n.parentNode.rows.length})(t,r)||function(n,t,r){const e=n.target.getAttribute("onclick").match(/rank_id=(\d+)/)
U(h(n.target.value),e[1])
const s=t.parentNode.rows[r]
g(t,s)
const o="Up"===n.target.value?-22:22
window.scrollBy(0,o),n.stopPropagation()}(n,t,r)}function G(n){(function(n){return["Up","Down"].includes(n.target.value)})(n)&&A(n)}function M(n,t){return t[0]===n}function R(n,t){const r=t.children[0],o=function(n,t){return 1===n.rowIndex?"Guild Founder":a(t)}(t,r),i=n.find(e(M,o));(function(n){return n&&n[1].length>0})(i)&&(!function(n,t){t&&t[1].includes(l())&&(_=n.rowIndex)}(t,i),s(r,` <span class="fshBlue">- ${i[1].join(", ")}</span>`))}function $(n){const t=function(){const n=f.lastElementChild.previousElementSibling
if(n.rows&&n.rows.length>7)return d(n.rows[7].children[0].children[0].rows)}()
t&&(j([5,3,t,1,e(R,n)]),L(t),_&&c("ajaxifyRankControls")&&r(f,G,!0))}function T(n,t){const r=n.find(e(M,t[1].rank_name))
return r?r[1].push(t[0]):n.push([t[1].rank_name,[t[0]]]),n}function q(n){return p(n).filter(v).reduce(T,[])}function D(){u()||N(!1).then(q).then($)}export default D
//# sourceMappingURL=rank-dc6c3d58.js.map
