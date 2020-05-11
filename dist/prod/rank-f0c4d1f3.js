import{aI as n,aP as t,R as e,o as r,v as s,i as o,h as a,T as i,D as c,bj as u,ac as f,G as d,p,P as l,z as m,q as h,aH as b}from"./calfSystem-72fdbe97.js"
import"./numberIsNaN-7d89f7bf.js"
import{a as g}from"./roundToString-a4684890.js"
import{t as w}from"./toLowerCase-019d771a.js"
import{c as j}from"./createInput-00d19dd2.js"
import{b as N}from"./batch-b03d6988.js"
import{g as k}from"./getMembrList-4c65de64.js"
import{r as v}from"./replaceChild-96d4f16d.js"
import{n as x}from"./notLastUpdate-4600c4ed.js"
import{b as C}from"./bitwiseAnd-b8e47b40.js"
function I(e){return n(t({subcmd:"ranks"},e))}const S=[[2,5],[4,4],[64,5],[256,.1],[512,.2],[4096,.5],[32768,.2],[524288,.1],[65536,5],[4194304,4]]
function y(n,t){const e=t.children[0],r=c(e.firstChild),s=n.find(n=>n.name===r)
var o
s&&u(e,`<span class="fshBlue">(${o=s.permissions,g(S.filter(([n])=>C(o,n)).reduce((n,[,t])=>n+t-1,0)+o.toString(2).split("").map(Number).reduce((n,t)=>n+t,0),1)}) Tax:(${s.tax}%)</span> `)}function B(n,t,e){e.s&&(n.forEach(s(y,[e.r[0]].concat(e.r.ranks))),t.classList.remove("fshSpinner"))}function L(n,t){const e=i({className:"fshBlock fshRelative fshSpinner fshSpinner12",style:{height:"15px",width:"136px"}})
v(e,t),I().then(s(B,n,e))}function R(n){const t=e('#pCC a[href*="=ranks&subcmd2=add"]')
t&&function(n,t){const e=j({className:"custombutton",type:"button",value:"Get Rank Weightings"})
r(e,s(L,n,e))
const i=t.parentNode.parentNode
o(i,"&nbsp;"),a(i,e)}(n,t)}function U(n,t){return function(n,t){return I({subcmd2:n,rank_id:t})}(n,t)}let _
function E(n){const t=n.target.parentNode.parentNode.parentNode,e=t.rowIndex+("Up"===n.target.value?-1:2);(function(n,t){return _>=Math.min(n.rowIndex,t)||t<1||t>n.parentNode.rows.length})(t,e)||function(n,t,e){const r=n.target.getAttribute("onclick").match(/rank_id=(\d+)/)
U(w(n.target.value),r[1])
const s=t.parentNode.rows[e]
l(t,s)
const o="Up"===n.target.value?-22:22
window.scrollBy(0,o),n.stopPropagation()}(n,t,e)}function G(n){(function(n){return["Up","Down"].includes(n.target.value)})(n)&&E(n)}function P(n,t){return t[0]===n}function T(n,t){const e=t.children[0],r=function(n,t){return 1===n.rowIndex?"Guild Founder":c(t)}(t,e),a=n.find(s(P,r));(function(n){return n&&n[1].length>0})(a)&&(!function(n,t){t&&t[1].includes(f())&&(_=n.rowIndex)}(t,a),o(e,` <span class="fshBlue">- ${a[1].join(", ")}</span>`))}function $(n){const t=function(){const n=p.lastElementChild.previousElementSibling
if(n.rows&&n.rows.length>7)return b(n.rows[7].children[0].children[0].rows)}()
t&&(N([5,3,t,1,s(T,n)]),R(t),_&&d("ajaxifyRankControls")&&r(p,G,!0))}function A(n,t){const e=n.find(s(P,t[1].rank_name))
return e?e[1].push(t[0]):n.push([t[1].rank_name,[t[0]]]),n}function D(n){return h(n).filter(x).reduce(A,[])}export default function(){m()||k(!1).then(D).then($)}
//# sourceMappingURL=rank-f0c4d1f3.js.map
