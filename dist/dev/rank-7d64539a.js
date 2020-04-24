import{aL as n,aS as t,S as r,o as e,v as s,i as o,h as a,U as i,D as c,b8 as u,ad as f,G as d,p,P as l,z as m,q as h,aK as b}from"./calfSystem-94018cd0.js"
import"./numberIsNaN-b4c6efab.js"
import"./round-f3bae54c.js"
import{r as g}from"./roundToString-3630f5f8.js"
import{t as w}from"./toLowerCase-5662df04.js"
import{c as j}from"./createInput-cfb8faf0.js"
import{b as N}from"./batch-952c7796.js"
import{g as k}from"./getMembrList-fc5e54d6.js"
import{r as v}from"./replaceChild-09b38220.js"
import{n as x}from"./notLastUpdate-3f4ef3bf.js"
import{b as S}from"./bitwiseAnd-88b7ba23.js"
function C(r){return n(t({subcmd:"ranks"},r))}const I=[[2,5],[4,4],[64,5],[256,.1],[512,.2],[4096,.5],[32768,.2],[524288,.1],[65536,5],[4194304,4]]
function y(n,t){const r=t.children[0],e=c(r.firstChild),s=n.find(n=>n.name===e)
var o
s&&u(r,`<span class="fshBlue">(${o=s.permissions,g(I.filter(([n])=>S(o,n)).reduce((n,[,t])=>n+t-1,0)+o.toString(2).split("").map(Number).reduce((n,t)=>n+t,0),1)}) Tax:(${s.tax}%)</span> `)}function L(n,t,r){r.s&&(n.forEach(s(y,[r.r[0]].concat(r.r.ranks))),t.classList.remove("fshSpinner"))}function U(n,t){const r=i({className:"fshBlock fshRelative fshSpinner fshSpinner12",style:{height:"15px",width:"136px"}})
v(r,t),C().then(s(L,n,r))}function B(n){const t=r('#pCC a[href*="=ranks&subcmd2=add"]')
t&&function(n,t){const r=j({className:"custombutton",type:"button",value:"Get Rank Weightings"})
e(r,s(U,n,r))
const i=t.parentNode.parentNode
o(i,"&nbsp;"),a(i,r)}(n,t)}function _(n,t){return function(n,t){return C({subcmd2:n,rank_id:t})}(n,t)}let E
function G(n){const t=n.target.parentNode.parentNode.parentNode,r=t.rowIndex+("Up"===n.target.value?-1:2);(function(n,t){return E>=Math.min(n.rowIndex,t)||t<1||t>n.parentNode.rows.length})(t,r)||function(n,t,r){const e=n.target.getAttribute("onclick").match(/rank_id=(\d+)/)
_(w(n.target.value),e[1])
const s=t.parentNode.rows[r]
l(t,s)
const o="Up"===n.target.value?-22:22
window.scrollBy(0,o),n.stopPropagation()}(n,t,r)}function R(n){(function(n){return["Up","Down"].includes(n.target.value)})(n)&&G(n)}function $(n,t){return t[0]===n}function A(n,t){const r=t.children[0],e=function(n,t){return 1===n.rowIndex?"Guild Founder":c(t)}(t,r),a=n.find(s($,e));(function(n){return n&&n[1].length>0})(a)&&(!function(n,t){t&&t[1].includes(f())&&(E=n.rowIndex)}(t,a),o(r,` <span class="fshBlue">- ${a[1].join(", ")}</span>`))}function D(n){const t=function(){const n=p.lastElementChild.previousElementSibling
if(n.rows&&n.rows.length>7)return b(n.rows[7].children[0].children[0].rows)}()
t&&(N([5,3,t,1,s(A,n)]),B(t),E&&d("ajaxifyRankControls")&&e(p,R,!0))}function M(n,t){const r=n.find(s($,t[1].rank_name))
return r?r[1].push(t[0]):n.push([t[1].rank_name,[t[0]]]),n}function P(n){return h(n).filter(x).reduce(M,[])}export default function(){m()||k(!1).then(P).then(D)}
//# sourceMappingURL=rank-7d64539a.js.map
