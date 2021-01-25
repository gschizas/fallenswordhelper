import{c as t}from"./createAnchor-6cfb2588.js"
import{d as n}from"./dataRows-22fc1a62.js"
import{c as e}from"./createTBody-d6c4e597.js"
import{c as o}from"./createTable-13078520.js"
import{h as s,i as r,e as a,a6 as c,M as l,o as i,l as f,aG as u,B as m,x as d,b as h,p,d as b,t as T,aH as g,A as j}from"./calfSystem-19a5d332.js"
import{g as w,a as C}from"./getTitanString-b8625f76.js"
import{g as N}from"./getTitle-62ba3c23.js"
import{o as $}from"./openQuickBuffByName-a375d5da.js"
import{p as B}from"./parseDateAsTimestamp-09891562.js"
import{r as S}from"./roundToString-dbdb82cb.js"
import{g as x,s as E}from"./idb-faef0351.js"
import"./fshOpen-56a6fafa.js"
import"./numberIsNaN-fecd7e6d.js"
function _(t){return[t[0],t[1].cooldownText,t[1].coolTime,t[1].seen]}function k(t){return t[2]>c}function y(t,n){return t[2]-n[2]}function v(t){return`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${t[1]}</td><td class="fshCenter">${t[3]}</td></tr>`}function A(t){const n=o({className:"fshTTracker"}),c=e({innerHTML:'<tr><td class="header fshCenter">Titan</td><td class="header fshCenter">Cooldown</td><td class="header fshCenter">Visible</td></tr>'})
return s(n,c),r(c,function(t){return a(t).map(_).filter(k).sort(y).map(v).join("")}(t)),n}function R(t){return m(t.cells[0].children[0].children[0])}function H(t){const{target:e}=t
u("[b]",e)&&function(t){t.previousElementSibling&&$(m(t.previousElementSibling))}(e),u("all",e)&&function(t){const e=t.parentNode.parentNode.parentNode.parentNode,o=n(e.rows,3,0).map(R)
$(o.join())}(e)}function I(t){f("fshBl",t.target)&&H(t)}function M(t){r(t.cells[0],' <button class="fshBl fshXSmall">[b]</button>')}function O(t){n(t.rows,3,0).forEach(M),r(t.rows[0].cells[0],' <button class="fshBl fshXSmall">all</button>')}function X(t,n){return t.rows.length>1&&n>1}function D(t){t.length>2&&function(t){l(t).filter(X).forEach(O),i(t[1],I)}(t)}function G(t){return N(t.cells[0].children[0])}function L(t,n){t[n[0]]||n[1].coolTime<=c||(t[n[0]]={cooldownText:n[1].cooldownText,coolTime:n[1].coolTime,seen:"no"})}function Q(t,n){const e=n.split("/")
var o,s,a
r(t.cells[3],(o=Number(m(t.cells[3])),s=Number(e[0]),a=Number(e[1]),`<br><span class="fshBlue"> (${S(w(a-s,o),2)}% Current <br>${S(100*o/a,2)}% Total<br>${C(o,a,s)})`))}function U(n,e){!function(t){const n=m(t.cells[2]);-1===n.indexOf("-")&&Q(t,n)}(e),function(t,n){const e=G(n).replace(" (Titan)","")
if(!t[e]){const o=m(n.nextElementSibling.cells[0])
let s=0
o.includes("until")&&(s=B(o.replace("Cooldown until: ",""))),t[e]={cooldownText:o,coolTime:s,seen:"yes"}}}(n,e),function(n){const e=encodeURIComponent(G(n)),o=n.cells[0].children[0],r=t({href:`${g}creatures&search_name=${e}`,target:"_blank"})
s(r,o),s(n.cells[0],r)
const a=n.cells[1],c=m(a)
j(`<a href="${g}realms&search_name=${c}" target="_blank">${c}</a>`,a)}(e)}function V(t){const e=h(b,p)
D(e)
const o={}
!function(t,e){n(t.rows,4,0).forEach(T(U,e))}(e[1],o),function(t,n){t&&a(t).forEach(T(L,n))}(t,o),function(t,n){if(t.rows.length>5){const e=A(n),o=t.insertRow(5).insertCell(-1)
o.colSpan=3,s(o,e)}}(e[0],o),E("fsh_titans",o)}function q(){d()||x("fsh_titans").then(V)}export default q
//# sourceMappingURL=injectScouttower-58679a13.js.map
