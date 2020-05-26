import{aw as n,n as t,L as e,o as r,s,i as o,f as a,A as i,aQ as c,D as u,p as f,w as d,l as p,av as m}from"./calfSystem-740ec4d2.js"
import"./numberIsNaN-2fbabd4d.js"
import{a as l}from"./roundToString-c7353690.js"
import{p as h}from"./playerName-a172b8d3.js"
import{t as b}from"./toLowerCase-dcd4458e.js"
import{c as g}from"./createInput-e6e1d6b3.js"
import{b as j}from"./batch-b6a89158.js"
import"./currentGuildId-ce4d8404.js"
import{i as w}from"./insertElementBefore-d3961941.js"
import{c as x}from"./createSpan-b29fd959.js"
import"./indexAjaxJson-1e1af708.js"
import"./cmdExport-7c541a4f.js"
import{g as N}from"./getMembrList-cd652176.js"
import{r as k}from"./replaceChild-2d27eba2.js"
import{n as v}from"./notLastUpdate-0d0831cc.js"
import{b as S}from"./bitwiseAnd-0359f88e.js"
function C(e){return n(t({subcmd:"ranks"},e))}const I=[[2,5],[4,4],[64,5],[256,.1],[512,.2],[4096,.5],[32768,.2],[524288,.1],[65536,5],[4194304,4]]
function y(n,t){const e=t.children[0],r=i(e.firstChild),s=n.find(n=>n.name===r)
var o
s&&c(e,`<span class="fshBlue">(${o=s.permissions,l(I.filter(([n])=>S(o,n)).reduce((n,[,t])=>n+t-1,0)+o.toString(2).split("").map(Number).reduce((n,t)=>n+t,0),1)}) Tax:(${s.tax}%)</span> `)}function B(n,t,e){e.s&&(n.forEach(s(y,[e.r[0]].concat(e.r.ranks))),t.classList.remove("fshSpinner"))}function E(n,t){const e=x({className:"fshBlock fshRelative fshSpinner fshSpinner12",style:{height:"15px",width:"136px"}})
k(e,t),C().then(s(B,n,e))}function L(n){const t=e('#pCC a[href*="=ranks&subcmd2=add"]')
t&&function(n,t){const e=g({className:"custombutton",type:"button",value:"Get Rank Weightings"})
r(e,s(E,n,e))
const i=t.parentNode.parentNode
o(i,"&nbsp;"),a(i,e)}(n,t)}function A(n,t){return function(n,t){return C({subcmd2:n,rank_id:t})}(n,t)}let U
function _(n){const t=n.target.parentNode.parentNode.parentNode,e=t.rowIndex+("Up"===n.target.value?-1:2);(function(n,t){return U>=Math.min(n.rowIndex,t)||t<1||t>n.parentNode.rows.length})(t,e)||function(n,t,e){const r=n.target.getAttribute("onclick").match(/rank_id=(\d+)/)
A(b(n.target.value),r[1])
const s=t.parentNode.rows[e]
w(t,s)
const o="Up"===n.target.value?-22:22
window.scrollBy(0,o),n.stopPropagation()}(n,t,e)}function G(n){(function(n){return["Up","Down"].includes(n.target.value)})(n)&&_(n)}function R(n,t){return t[0]===n}function $(n,t){const e=t.children[0],r=function(n,t){return 1===n.rowIndex?"Guild Founder":i(t)}(t,e),a=n.find(s(R,r));(function(n){return n&&n[1].length>0})(a)&&(!function(n,t){t&&t[1].includes(h())&&(U=n.rowIndex)}(t,a),o(e,` <span class="fshBlue">- ${a[1].join(", ")}</span>`))}function D(n){const t=function(){const n=f.lastElementChild.previousElementSibling
if(n.rows&&n.rows.length>7)return m(n.rows[7].children[0].children[0].rows)}()
t&&(j([5,3,t,1,s($,n)]),L(t),U&&u("ajaxifyRankControls")&&r(f,G,!0))}function M(n,t){const e=n.find(s(R,t[1].rank_name))
return e?e[1].push(t[0]):n.push([t[1].rank_name,[t[0]]]),n}function T(n){return p(n).filter(v).reduce(M,[])}export default function(){d()||N(!1).then(T).then(D)}
//# sourceMappingURL=rank-f2d2502e.js.map
