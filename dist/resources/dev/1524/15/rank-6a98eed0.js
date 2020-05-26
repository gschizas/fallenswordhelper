import{az as n,n as t,M as e,o as r,s,i as o,f as a,A as i,aR as c,D as u,p as f,w as p,l as d,ay as m}from"./calfSystem-ee582533.js"
import"./numberIsNaN-c9f76e43.js"
import"./round-12db58e6.js"
import{r as l}from"./roundToString-cbd573ec.js"
import{p as h}from"./playerName-e40f24e0.js"
import{t as b}from"./toLowerCase-6383ba3b.js"
import{c as j}from"./createInput-2410e798.js"
import{b as g}from"./batch-59d43fba.js"
import"./currentGuildId-0564d9a0.js"
import{i as w}from"./insertElementBefore-7ed837be.js"
import{c as x}from"./createSpan-63b97269.js"
import"./indexAjaxJson-e486d467.js"
import"./cmdExport-23cec039.js"
import{g as N}from"./getMembrList-d7782e14.js"
import{r as k}from"./replaceChild-55236ff2.js"
import{n as v}from"./notLastUpdate-fc646b88.js"
import{b as S}from"./bitwiseAnd-533b5263.js"
function y(e){return n(t({subcmd:"ranks"},e))}const C=[[2,5],[4,4],[64,5],[256,.1],[512,.2],[4096,.5],[32768,.2],[524288,.1],[65536,5],[4194304,4]]
function I(n,t){const e=t.children[0],r=i(e.firstChild),s=n.find(n=>n.name===r)
var o
s&&c(e,`<span class="fshBlue">(${o=s.permissions,l(C.filter(([n])=>S(o,n)).reduce((n,[,t])=>n+t-1,0)+o.toString(2).split("").map(Number).reduce((n,t)=>n+t,0),1)}) Tax:(${s.tax}%)</span> `)}function B(n,t,e){e.s&&(n.forEach(s(I,[e.r[0]].concat(e.r.ranks))),t.classList.remove("fshSpinner"))}function E(n,t){const e=x({className:"fshBlock fshRelative fshSpinner fshSpinner12",style:{height:"15px",width:"136px"}})
k(e,t),y().then(s(B,n,e))}function A(n){const t=e('#pCC a[href*="=ranks&subcmd2=add"]')
t&&function(n,t){const e=j({className:"custombutton",type:"button",value:"Get Rank Weightings"})
r(e,s(E,n,e))
const i=t.parentNode.parentNode
o(i,"&nbsp;"),a(i,e)}(n,t)}function L(n,t){return function(n,t){return y({subcmd2:n,rank_id:t})}(n,t)}let R
function U(n){const t=n.target.parentNode.parentNode.parentNode,e=t.rowIndex+("Up"===n.target.value?-1:2);(function(n,t){return R>=Math.min(n.rowIndex,t)||t<1||t>n.parentNode.rows.length})(t,e)||function(n,t,e){const r=n.target.getAttribute("onclick").match(/rank_id=(\d+)/)
L(b(n.target.value),r[1])
const s=t.parentNode.rows[e]
w(t,s)
const o="Up"===n.target.value?-22:22
window.scrollBy(0,o),n.stopPropagation()}(n,t,e)}function _(n){(function(n){return["Up","Down"].includes(n.target.value)})(n)&&U(n)}function G(n,t){return t[0]===n}function M(n,t){const e=t.children[0],r=function(n,t){return 1===n.rowIndex?"Guild Founder":i(t)}(t,e),a=n.find(s(G,r));(function(n){return n&&n[1].length>0})(a)&&(!function(n,t){t&&t[1].includes(h())&&(R=n.rowIndex)}(t,a),o(e,` <span class="fshBlue">- ${a[1].join(", ")}</span>`))}function $(n){const t=function(){const n=f.lastElementChild.previousElementSibling
if(n.rows&&n.rows.length>7)return m(n.rows[7].children[0].children[0].rows)}()
t&&(g([5,3,t,1,s(M,n)]),A(t),R&&u("ajaxifyRankControls")&&r(f,_,!0))}function D(n,t){const e=n.find(s(G,t[1].rank_name))
return e?e[1].push(t[0]):n.push([t[1].rank_name,[t[0]]]),n}function T(n){return d(n).filter(v).reduce(D,[])}export default function(){p()||N(!1).then(T).then($)}
//# sourceMappingURL=rank-6a98eed0.js.map
