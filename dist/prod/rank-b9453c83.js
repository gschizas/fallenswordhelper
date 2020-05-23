import{aI as n,aP as t,R as e,o as r,v as s,i as a,h as o,T as i,D as c,bj as u,ac as f,G as p,p as d,P as l,z as m,q as h,aH as g}from"./calfSystem-4f7c0235.js"
import"./numberIsNaN-c62a2787.js"
import{a as b}from"./roundToString-969a3a01.js"
import{t as w}from"./toLowerCase-5a0aca7f.js"
import{c as j}from"./createInput-6766e17a.js"
import{b as N}from"./batch-970fe719.js"
import{g as k}from"./getMembrList-c30083ce.js"
import{r as v}from"./replaceChild-63b3146f.js"
import{n as x}from"./notLastUpdate-a81809a7.js"
import{b as C}from"./bitwiseAnd-fe3ad2d7.js"
function I(e){return n(t({subcmd:"ranks"},e))}const S=[[2,5],[4,4],[64,5],[256,.1],[512,.2],[4096,.5],[32768,.2],[524288,.1],[65536,5],[4194304,4]]
function y(n,t){const e=t.children[0],r=c(e.firstChild),s=n.find(n=>n.name===r)
var a
s&&u(e,`<span class="fshBlue">(${a=s.permissions,b(S.filter(([n])=>C(a,n)).reduce((n,[,t])=>n+t-1,0)+a.toString(2).split("").map(Number).reduce((n,t)=>n+t,0),1)}) Tax:(${s.tax}%)</span> `)}function B(n,t,e){e.s&&(n.forEach(s(y,[e.r[0]].concat(e.r.ranks))),t.classList.remove("fshSpinner"))}function L(n,t){const e=i({className:"fshBlock fshRelative fshSpinner fshSpinner12",style:{height:"15px",width:"136px"}})
v(e,t),I().then(s(B,n,e))}function R(n){const t=e('#pCC a[href*="=ranks&subcmd2=add"]')
t&&function(n,t){const e=j({className:"custombutton",type:"button",value:"Get Rank Weightings"})
r(e,s(L,n,e))
const i=t.parentNode.parentNode
a(i,"&nbsp;"),o(i,e)}(n,t)}function U(n,t){return function(n,t){return I({subcmd2:n,rank_id:t})}(n,t)}let _
function E(n){const t=n.target.parentNode.parentNode.parentNode,e=t.rowIndex+("Up"===n.target.value?-1:2);(function(n,t){return _>=Math.min(n.rowIndex,t)||t<1||t>n.parentNode.rows.length})(t,e)||function(n,t,e){const r=n.target.getAttribute("onclick").match(/rank_id=(\d+)/)
U(w(n.target.value),r[1])
const s=t.parentNode.rows[e]
l(t,s)
const a="Up"===n.target.value?-22:22
window.scrollBy(0,a),n.stopPropagation()}(n,t,e)}function G(n){(function(n){return["Up","Down"].includes(n.target.value)})(n)&&E(n)}function P(n,t){return t[0]===n}function T(n,t){const e=t.children[0],r=function(n,t){return 1===n.rowIndex?"Guild Founder":c(t)}(t,e),o=n.find(s(P,r));(function(n){return n&&n[1].length>0})(o)&&(!function(n,t){t&&t[1].includes(f())&&(_=n.rowIndex)}(t,o),a(e,` <span class="fshBlue">- ${o[1].join(", ")}</span>`))}function $(n){const t=function(){const n=d.lastElementChild.previousElementSibling
if(n.rows&&n.rows.length>7)return g(n.rows[7].children[0].children[0].rows)}()
t&&(N([5,3,t,1,s(T,n)]),R(t),_&&p("ajaxifyRankControls")&&r(d,G,!0))}function A(n,t){const e=n.find(s(P,t[1].rank_name))
return e?e[1].push(t[0]):n.push([t[1].rank_name,[t[0]]]),n}function D(n){return h(n).filter(x).reduce(A,[])}export default function(){m()||k(!1).then(D).then($)}
//# sourceMappingURL=rank-b9453c83.js.map
