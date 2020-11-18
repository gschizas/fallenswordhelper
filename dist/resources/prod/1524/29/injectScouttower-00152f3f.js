import{h as t,i as e,e as n,a4 as o,M as s,o as r,l as a,b2 as c,B as l,x as i,b as f,p as u,d as m,t as d,ap as h,A as p}from"./calfSystem-57628ebe.js"
import"./numberIsNaN-d1ebf732.js"
import{a as b}from"./roundToString-24fb9b54.js"
import"./fshOpen-71b2b356.js"
import{o as T}from"./openQuickBuffByName-4b21bd39.js"
import{d as g}from"./dataRows-2520efc0.js"
import{g as j,s as w}from"./idb-5c863a6f.js"
import{c as C}from"./createTBody-09e25351.js"
import{c as N}from"./createTable-5644b00e.js"
import{c as $}from"./createAnchor-e1a9e7aa.js"
import{g as B}from"./getTitle-3fefd696.js"
import{p as S}from"./parseDateAsTimestamp-a0fe37ba.js"
import{g as x,a as E}from"./getTitanString-4e01dae6.js"
function _(t){return[t[0],t[1].cooldownText,t[1].coolTime,t[1].seen]}function k(t){return t[2]>o}function y(t,e){return t[2]-e[2]}function v(t){return`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${t[1]}</td><td class="fshCenter">${t[3]}</td></tr>`}function A(o){const s=N({className:"fshTTracker"}),r=C({innerHTML:'<tr><td class="header fshCenter">Titan</td><td class="header fshCenter">Cooldown</td><td class="header fshCenter">Visible</td></tr>'})
return t(s,r),e(r,function(t){return n(t).map(_).filter(k).sort(y).map(v).join("")}(o)),s}function R(t){return l(t.cells[0].children[0].children[0])}function I(t){const{target:e}=t
c("[b]",e)&&function(t){t.previousElementSibling&&T(l(t.previousElementSibling))}(e),c("all",e)&&function(t){const e=t.parentNode.parentNode.parentNode.parentNode,n=g(e.rows,3,0).map(R)
T(n.join())}(e)}function M(t){a("fshBl",t.target)&&I(t)}function O(t){e(t.cells[0],' <button class="fshBl fshXSmall">[b]</button>')}function X(t){g(t.rows,3,0).forEach(O),e(t.rows[0].cells[0],' <button class="fshBl fshXSmall">all</button>')}function D(t,e){return t.rows.length>1&&e>1}function H(t){t.length>2&&function(t){s(t).filter(D).forEach(X),r(t[1],M)}(t)}function L(t){return B(t.cells[0].children[0])}function Q(t,e){t[e[0]]||e[1].coolTime<=o||(t[e[0]]={cooldownText:e[1].cooldownText,coolTime:e[1].coolTime,seen:"no"})}function U(t,n){const o=n.split("/")
var s,r,a
e(t.cells[3],(s=Number(l(t.cells[3])),r=Number(o[0]),a=Number(o[1]),`<br><span class="fshBlue"> (${b(x(a-r,s),2)}% Current <br>${b(100*s/a,2)}% Total<br>${E(s,a,r)})`))}function V(e,n){!function(t){const e=l(t.cells[2]);-1===e.indexOf("-")&&U(t,e)}(n),function(t,e){const n=L(e).replace(" (Titan)","")
if(!t[n]){const o=l(e.nextElementSibling.cells[0])
let s=0
o.includes("until")&&(s=S(o.replace("Cooldown until: ",""))),t[n]={cooldownText:o,coolTime:s,seen:"yes"}}}(e,n),function(e){const n=encodeURIComponent(L(e)),o=e.cells[0].children[0],s=$({href:`${h}creatures&search_name=${n}`,target:"_blank"})
t(s,o),t(e.cells[0],s)
const r=e.cells[1],a=l(r)
p(`<a href="${h}realms&search_name=${a}" target="_blank">${a}</a>`,r)}(n)}function q(e){const o=f(m,u)
H(o)
const s={}
!function(t,e){g(t.rows,4,0).forEach(d(V,e))}(o[1],s),function(t,e){t&&n(t).forEach(d(Q,e))}(e,s),function(e,n){if(e.rows.length>5){const o=A(n),s=e.insertRow(5).insertCell(-1)
s.colSpan=3,t(s,o)}}(o[0],s),w("fsh_titans",s)}function z(){i()||j("fsh_titans").then(q)}export default z
//# sourceMappingURL=injectScouttower-00152f3f.js.map
