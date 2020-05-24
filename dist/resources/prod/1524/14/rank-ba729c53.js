import{aH as n,aO as t,Q as e,o as r,u as s,i as o,f as a,S as i,C as c,bi as u,ab as f,F as d,p,O as l,y as m,n as h,aG as b}from"./calfSystem-d587d232.js"
import"./numberIsNaN-054e0c59.js"
import{a as g}from"./roundToString-86a4e935.js"
import{t as w}from"./toLowerCase-f57cc259.js"
import{c as j}from"./createInput-f5f615ed.js"
import{b as N}from"./batch-a68928f8.js"
import{g as k}from"./getMembrList-bff94964.js"
import{r as x}from"./replaceChild-c380221c.js"
import{n as v}from"./notLastUpdate-cd405864.js"
import{b as C}from"./bitwiseAnd-5f7ce03b.js"
function S(e){return n(t({subcmd:"ranks"},e))}const y=[[2,5],[4,4],[64,5],[256,.1],[512,.2],[4096,.5],[32768,.2],[524288,.1],[65536,5],[4194304,4]]
function I(n,t){const e=t.children[0],r=c(e.firstChild),s=n.find(n=>n.name===r)
var o
s&&u(e,`<span class="fshBlue">(${o=s.permissions,g(y.filter(([n])=>C(o,n)).reduce((n,[,t])=>n+t-1,0)+o.toString(2).split("").map(Number).reduce((n,t)=>n+t,0),1)}) Tax:(${s.tax}%)</span> `)}function B(n,t,e){e.s&&(n.forEach(s(I,[e.r[0]].concat(e.r.ranks))),t.classList.remove("fshSpinner"))}function L(n,t){const e=i({className:"fshBlock fshRelative fshSpinner fshSpinner12",style:{height:"15px",width:"136px"}})
x(e,t),S().then(s(B,n,e))}function U(n){const t=e('#pCC a[href*="=ranks&subcmd2=add"]')
t&&function(n,t){const e=j({className:"custombutton",type:"button",value:"Get Rank Weightings"})
r(e,s(L,n,e))
const i=t.parentNode.parentNode
o(i,"&nbsp;"),a(i,e)}(n,t)}function _(n,t){return function(n,t){return S({subcmd2:n,rank_id:t})}(n,t)}let E
function G(n){const t=n.target.parentNode.parentNode.parentNode,e=t.rowIndex+("Up"===n.target.value?-1:2);(function(n,t){return E>=Math.min(n.rowIndex,t)||t<1||t>n.parentNode.rows.length})(t,e)||function(n,t,e){const r=n.target.getAttribute("onclick").match(/rank_id=(\d+)/)
_(w(n.target.value),r[1])
const s=t.parentNode.rows[e]
l(t,s)
const o="Up"===n.target.value?-22:22
window.scrollBy(0,o),n.stopPropagation()}(n,t,e)}function R(n){(function(n){return["Up","Down"].includes(n.target.value)})(n)&&G(n)}function $(n,t){return t[0]===n}function A(n,t){const e=t.children[0],r=function(n,t){return 1===n.rowIndex?"Guild Founder":c(t)}(t,e),a=n.find(s($,r));(function(n){return n&&n[1].length>0})(a)&&(!function(n,t){t&&t[1].includes(f())&&(E=n.rowIndex)}(t,a),o(e,` <span class="fshBlue">- ${a[1].join(", ")}</span>`))}function F(n){const t=function(){const n=p.lastElementChild.previousElementSibling
if(n.rows&&n.rows.length>7)return b(n.rows[7].children[0].children[0].rows)}()
t&&(N([5,3,t,1,s(A,n)]),U(t),E&&d("ajaxifyRankControls")&&r(p,R,!0))}function M(n,t){const e=n.find(s($,t[1].rank_name))
return e?e[1].push(t[0]):n.push([t[1].rank_name,[t[0]]]),n}function O(n){return h(n).filter(v).reduce(M,[])}export default function(){m()||k(!1).then(O).then(F)}
//# sourceMappingURL=rank-ba729c53.js.map
