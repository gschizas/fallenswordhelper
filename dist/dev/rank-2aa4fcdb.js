import{aL as n,aS as t,S as e,o as r,v as s,i as a,h as o,U as i,D as c,b8 as u,ad as f,G as d,p,P as l,z as m,q as h,aK as b}from"./calfSystem-fd021443.js"
import"./numberIsNaN-c0f5c8eb.js"
import"./round-1fad39a4.js"
import{r as g}from"./roundToString-945e1a8d.js"
import{t as w}from"./toLowerCase-4cca5593.js"
import{c as j}from"./createInput-309e97c5.js"
import{b as N}from"./batch-111227ce.js"
import{g as k}from"./getMembrList-71a7118e.js"
import{r as v}from"./replaceChild-b0faa408.js"
import{n as x}from"./notLastUpdate-abae1e63.js"
import{b as S}from"./bitwiseAnd-a7692719.js"
function C(e){return n(t({subcmd:"ranks"},e))}const I=[[2,5],[4,4],[64,5],[256,.1],[512,.2],[4096,.5],[32768,.2],[524288,.1],[65536,5],[4194304,4]]
function y(n,t){const e=t.children[0],r=c(e.firstChild),s=n.find(n=>n.name===r)
var a
s&&u(e,`<span class="fshBlue">(${a=s.permissions,g(I.filter(([n])=>S(a,n)).reduce((n,[,t])=>n+t-1,0)+a.toString(2).split("").map(Number).reduce((n,t)=>n+t,0),1)}) Tax:(${s.tax}%)</span> `)}function L(n,t,e){e.s&&(n.forEach(s(y,[e.r[0]].concat(e.r.ranks))),t.classList.remove("fshSpinner"))}function U(n,t){const e=i({className:"fshBlock fshRelative fshSpinner fshSpinner12",style:{height:"15px",width:"136px"}})
v(e,t),C().then(s(L,n,e))}function B(n){const t=e('#pCC a[href*="=ranks&subcmd2=add"]')
t&&function(n,t){const e=j({className:"custombutton",type:"button",value:"Get Rank Weightings"})
r(e,s(U,n,e))
const i=t.parentNode.parentNode
a(i,"&nbsp;"),o(i,e)}(n,t)}function _(n,t){return function(n,t){return C({subcmd2:n,rank_id:t})}(n,t)}let E
function G(n){const t=n.target.parentNode.parentNode.parentNode,e=t.rowIndex+("Up"===n.target.value?-1:2);(function(n,t){return E>=Math.min(n.rowIndex,t)||t<1||t>n.parentNode.rows.length})(t,e)||function(n,t,e){const r=n.target.getAttribute("onclick").match(/rank_id=(\d+)/)
_(w(n.target.value),r[1])
const s=t.parentNode.rows[e]
l(t,s)
const a="Up"===n.target.value?-22:22
window.scrollBy(0,a),n.stopPropagation()}(n,t,e)}function R(n){(function(n){return["Up","Down"].includes(n.target.value)})(n)&&G(n)}function $(n,t){return t[0]===n}function A(n,t){const e=t.children[0],r=function(n,t){return 1===n.rowIndex?"Guild Founder":c(t)}(t,e),o=n.find(s($,r));(function(n){return n&&n[1].length>0})(o)&&(!function(n,t){t&&t[1].includes(f())&&(E=n.rowIndex)}(t,o),a(e,` <span class="fshBlue">- ${o[1].join(", ")}</span>`))}function D(n){const t=function(){const n=p.lastElementChild.previousElementSibling
if(n.rows&&n.rows.length>7)return b(n.rows[7].children[0].children[0].rows)}()
t&&(N([5,3,t,1,s(A,n)]),B(t),E&&d("ajaxifyRankControls")&&r(p,R,!0))}function M(n,t){const e=n.find(s($,t[1].rank_name))
return e?e[1].push(t[0]):n.push([t[1].rank_name,[t[0]]]),n}function P(n){return h(n).filter(x).reduce(M,[])}export default function(){m()||k(!1).then(P).then(D)}
//# sourceMappingURL=rank-2aa4fcdb.js.map
