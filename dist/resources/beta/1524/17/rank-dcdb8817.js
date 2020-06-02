import{n,M as t,o as e,s as r,i as s,f as o,A as a,a5 as i,D as c,p as u,w as f,l as d,aD as p}from"./calfSystem-02ae8657.js"
import"./numberIsNaN-0b348b17.js"
import{a as m}from"./roundToString-50224ae1.js"
import{p as l}from"./playerName-9873e3df.js"
import{t as h}from"./toLowerCase-f5058453.js"
import{c as b}from"./createInput-cbb1c2cb.js"
import{b as g}from"./batch-149b9740.js"
import"./currentGuildId-a8ad9d1f.js"
import"./idb-ac1635f3.js"
import{i as j}from"./insertElementBefore-35d3b41e.js"
import{c as w}from"./createSpan-0a306aad.js"
import"./indexAjaxJson-8dbd2034.js"
import"./cmdExport-de6d587e.js"
import{g as x}from"./guild-148115ef.js"
import{g as N}from"./getMembrList-1f91f8c8.js"
import{r as k}from"./replaceChild-6278e4e6.js"
import{n as v}from"./notLastUpdate-62d0464a.js"
import{b as S}from"./bitwiseAnd-76e39e41.js"
function C(t){return x(n({subcmd:"ranks"},t))}const I=[[2,5],[4,4],[64,5],[256,.1],[512,.2],[4096,.5],[32768,.2],[524288,.1],[65536,5],[4194304,4]]
function y(n,t){const e=t.children[0],r=a(e.firstChild),s=n.find(n=>n.name===r)
var o
s&&i(e,`<span class="fshBlue">(${o=s.permissions,m(I.filter(([n])=>S(o,n)).reduce((n,[,t])=>n+t-1,0)+o.toString(2).split("").map(Number).reduce((n,t)=>n+t,0),1)}) Tax:(${s.tax}%)</span> `)}function B(n,t,e){e.s&&(n.forEach(r(y,[e.r[0]].concat(e.r.ranks))),t.classList.remove("fshSpinner"))}function E(n,t){const e=w({className:"fshBlock fshRelative fshSpinner fshSpinner12",style:{height:"15px",width:"136px"}})
k(e,t),C().then(r(B,n,e))}function A(n){const a=t('#pCC a[href*="=ranks&subcmd2=add"]')
a&&function(n,t){const a=b({className:"custombutton",type:"button",value:"Get Rank Weightings"})
e(a,r(E,n,a))
const i=t.parentNode.parentNode
s(i,"&nbsp;"),o(i,a)}(n,a)}function L(n,t){return function(n,t){return C({subcmd2:n,rank_id:t})}(n,t)}let U
function _(n){const t=n.target.parentNode.parentNode.parentNode,e=t.rowIndex+("Up"===n.target.value?-1:2);(function(n,t){return U>=Math.min(n.rowIndex,t)||t<1||t>n.parentNode.rows.length})(t,e)||function(n,t,e){const r=n.target.getAttribute("onclick").match(/rank_id=(\d+)/)
L(h(n.target.value),r[1])
const s=t.parentNode.rows[e]
j(t,s)
const o="Up"===n.target.value?-22:22
window.scrollBy(0,o),n.stopPropagation()}(n,t,e)}function D(n){(function(n){return["Up","Down"].includes(n.target.value)})(n)&&_(n)}function G(n,t){return t[0]===n}function M(n,t){const e=t.children[0],o=function(n,t){return 1===n.rowIndex?"Guild Founder":a(t)}(t,e),i=n.find(r(G,o));(function(n){return n&&n[1].length>0})(i)&&(!function(n,t){t&&t[1].includes(l())&&(U=n.rowIndex)}(t,i),s(e,` <span class="fshBlue">- ${i[1].join(", ")}</span>`))}function R(n){const t=function(){const n=u.lastElementChild.previousElementSibling
if(n.rows&&n.rows.length>7)return p(n.rows[7].children[0].children[0].rows)}()
t&&(g([5,3,t,1,r(M,n)]),A(t),U&&c("ajaxifyRankControls")&&e(u,D,!0))}function $(n,t){const e=n.find(r(G,t[1].rank_name))
return e?e[1].push(t[0]):n.push([t[1].rank_name,[t[0]]]),n}function T(n){return d(n).filter(v).reduce($,[])}export default function(){f()||N(!1).then(T).then(R)}
//# sourceMappingURL=rank-dcdb8817.js.map
