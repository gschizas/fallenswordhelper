import{aI as n,aP as t,R as r,o as s,v as e,i as o,h as a,T as i,D as c,bl as u,ac as f,G as d,p,P as l,z as m,q as h,aH as b}from"./calfSystem-70c0e373.js"
import"./numberIsNaN-a9336482.js"
import{a as g}from"./roundToString-1db23610.js"
import{t as w}from"./toLowerCase-fa13dddd.js"
import{c as j}from"./createInput-0bc2f786.js"
import{b as N}from"./batch-5d2b5520.js"
import{g as k}from"./getMembrList-159f55f9.js"
import{r as v}from"./replaceChild-61eb66d6.js"
import{n as x}from"./notLastUpdate-1148d574.js"
import{b as C}from"./bitwiseAnd-1177b1ca.js"
function I(r){return n(t({subcmd:"ranks"},r))}const S=[[2,5],[4,4],[64,5],[256,.1],[512,.2],[4096,.5],[32768,.2],[524288,.1],[65536,5],[4194304,4]]
function y(n,t){const r=t.children[0],s=c(r.firstChild),e=n.find(n=>n.name===s)
var o
e&&u(r,`<span class="fshBlue">(${o=e.permissions,g(S.filter(([n])=>C(o,n)).reduce((n,[,t])=>n+t-1,0)+o.toString(2).split("").map(Number).reduce((n,t)=>n+t,0),1)}) Tax:(${e.tax}%)</span> `)}function B(n,t,r){r.s&&(n.forEach(e(y,[r.r[0]].concat(r.r.ranks))),t.classList.remove("fshSpinner"))}function L(n,t){const r=i({className:"fshBlock fshRelative fshSpinner fshSpinner12",style:{height:"15px",width:"136px"}})
v(r,t),I().then(e(B,n,r))}function R(n){const t=r('#pCC a[href*="=ranks&subcmd2=add"]')
t&&function(n,t){const r=j({className:"custombutton",type:"button",value:"Get Rank Weightings"})
s(r,e(L,n,r))
const i=t.parentNode.parentNode
o(i,"&nbsp;"),a(i,r)}(n,t)}function U(n,t){return function(n,t){return I({subcmd2:n,rank_id:t})}(n,t)}let _
function E(n){const t=n.target.parentNode.parentNode.parentNode,r=t.rowIndex+("Up"===n.target.value?-1:2);(function(n,t){return _>=Math.min(n.rowIndex,t)||t<1||t>n.parentNode.rows.length})(t,r)||function(n,t,r){const s=n.target.getAttribute("onclick").match(/rank_id=(\d+)/)
U(w(n.target.value),s[1])
const e=t.parentNode.rows[r]
l(t,e)
const o="Up"===n.target.value?-22:22
window.scrollBy(0,o),n.stopPropagation()}(n,t,r)}function G(n){(function(n){return["Up","Down"].includes(n.target.value)})(n)&&E(n)}function P(n,t){return t[0]===n}function T(n,t){const r=t.children[0],s=function(n,t){return 1===n.rowIndex?"Guild Founder":c(t)}(t,r),a=n.find(e(P,s));(function(n){return n&&n[1].length>0})(a)&&(!function(n,t){t&&t[1].includes(f())&&(_=n.rowIndex)}(t,a),o(r,` <span class="fshBlue">- ${a[1].join(", ")}</span>`))}function $(n){const t=function(){const n=p.lastElementChild.previousElementSibling
if(n.rows&&n.rows.length>7)return b(n.rows[7].children[0].children[0].rows)}()
t&&(N([5,3,t,1,e(T,n)]),R(t),_&&d("ajaxifyRankControls")&&s(p,G,!0))}function A(n,t){const r=n.find(e(P,t[1].rank_name))
return r?r[1].push(t[0]):n.push([t[1].rank_name,[t[0]]]),n}function D(n){return h(n).filter(x).reduce(A,[])}export default function(){m()||k(!1).then(D).then($)}
//# sourceMappingURL=rank-38979273.js.map
