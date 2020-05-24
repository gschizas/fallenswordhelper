import{aK as n,aR as t,R as r,o as e,u as s,i as o,f as a,T as i,C as c,b7 as u,ac as f,F as d,p,O as l,y as m,n as h,aJ as b}from"./calfSystem-d96a3efd.js"
import"./numberIsNaN-5b8bfc11.js"
import"./round-0cc3c134.js"
import{r as g}from"./roundToString-372e64d2.js"
import{t as w}from"./toLowerCase-a0540d2c.js"
import{c as j}from"./createInput-2717f905.js"
import{b as N}from"./batch-cdb16fc8.js"
import{g as k}from"./getMembrList-5baa5a87.js"
import{r as x}from"./replaceChild-fe0814cd.js"
import{n as v}from"./notLastUpdate-3dedc0ea.js"
import{b as C}from"./bitwiseAnd-f116b2bf.js"
function S(r){return n(t({subcmd:"ranks"},r))}const y=[[2,5],[4,4],[64,5],[256,.1],[512,.2],[4096,.5],[32768,.2],[524288,.1],[65536,5],[4194304,4]]
function I(n,t){const r=t.children[0],e=c(r.firstChild),s=n.find(n=>n.name===e)
var o
s&&u(r,`<span class="fshBlue">(${o=s.permissions,g(y.filter(([n])=>C(o,n)).reduce((n,[,t])=>n+t-1,0)+o.toString(2).split("").map(Number).reduce((n,t)=>n+t,0),1)}) Tax:(${s.tax}%)</span> `)}function R(n,t,r){r.s&&(n.forEach(s(I,[r.r[0]].concat(r.r.ranks))),t.classList.remove("fshSpinner"))}function B(n,t){const r=i({className:"fshBlock fshRelative fshSpinner fshSpinner12",style:{height:"15px",width:"136px"}})
x(r,t),S().then(s(R,n,r))}function L(n){const t=r('#pCC a[href*="=ranks&subcmd2=add"]')
t&&function(n,t){const r=j({className:"custombutton",type:"button",value:"Get Rank Weightings"})
e(r,s(B,n,r))
const i=t.parentNode.parentNode
o(i,"&nbsp;"),a(i,r)}(n,t)}function U(n,t){return function(n,t){return S({subcmd2:n,rank_id:t})}(n,t)}let _
function E(n){const t=n.target.parentNode.parentNode.parentNode,r=t.rowIndex+("Up"===n.target.value?-1:2);(function(n,t){return _>=Math.min(n.rowIndex,t)||t<1||t>n.parentNode.rows.length})(t,r)||function(n,t,r){const e=n.target.getAttribute("onclick").match(/rank_id=(\d+)/)
U(w(n.target.value),e[1])
const s=t.parentNode.rows[r]
l(t,s)
const o="Up"===n.target.value?-22:22
window.scrollBy(0,o),n.stopPropagation()}(n,t,r)}function T(n){(function(n){return["Up","Down"].includes(n.target.value)})(n)&&E(n)}function $(n,t){return t[0]===n}function A(n,t){const r=t.children[0],e=function(n,t){return 1===n.rowIndex?"Guild Founder":c(t)}(t,r),a=n.find(s($,e));(function(n){return n&&n[1].length>0})(a)&&(!function(n,t){t&&t[1].includes(f())&&(_=n.rowIndex)}(t,a),o(r,` <span class="fshBlue">- ${a[1].join(", ")}</span>`))}function F(n){const t=function(){const n=p.lastElementChild.previousElementSibling
if(n.rows&&n.rows.length>7)return b(n.rows[7].children[0].children[0].rows)}()
t&&(N([5,3,t,1,s(A,n)]),L(t),_&&d("ajaxifyRankControls")&&e(p,T,!0))}function G(n,t){const r=n.find(s($,t[1].rank_name))
return r?r[1].push(t[0]):n.push([t[1].rank_name,[t[0]]]),n}function M(n){return h(n).filter(v).reduce(G,[])}export default function(){m()||k(!1).then(M).then(F)}
//# sourceMappingURL=rank-c93e4e7c.js.map
