import{f as t,i as n,l as s,a7 as e,a3 as o,o as r,bb as c,A as a,w as l,b as i,p as f,d as u,s as m,at as d,z as h}from"./calfSystem-1c103624.js"
import"./numberIsNaN-40c4542d.js"
import"./round-c701b797.js"
import{r as p}from"./roundToString-c17b23bf.js"
import"./fshOpen-19720760.js"
import{o as b}from"./openQuickBuffByName-f6a38ccb.js"
import{d as T}from"./dataRows-ce6adc95.js"
import{g,s as j}from"./idb-347cc2af.js"
import{c as w}from"./createTBody-063a5f27.js"
import{c as C}from"./createTable-930c2471.js"
import{c as N}from"./createAnchor-70f397fb.js"
import{g as $}from"./getTitle-888127c9.js"
import{p as S}from"./parseDateAsTimestamp-dbc8fb82.js"
import{g as B,a as x}from"./getTitanString-1e766608.js"
function E(t){return[t[0],t[1].cooldownText,t[1].coolTime,t[1].seen]}function _(t){return t[2]>e}function k(t,n){return t[2]-n[2]}function y(t){return`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${t[1]}</td><td class="fshCenter">${t[3]}</td></tr>`}function v(e){const o=C({className:"fshTTracker"}),r=w({innerHTML:'<tr><td class="header fshCenter">Titan</td><td class="header fshCenter">Cooldown</td><td class="header fshCenter">Visible</td></tr>'})
return t(o,r),n(r,function(t){return s(t).map(E).filter(_).sort(k).map(y).join("")}(e)),o}function A(t){return a(t.cells[0].children[0].children[0])}function R(t){const{target:n}=t
c("[b]",n)&&function(t){t.previousElementSibling&&b(a(t.previousElementSibling))}(n),c("all",n)&&function(t){const n=t.parentNode.parentNode.parentNode.parentNode,s=T(n.rows,3,0).map(A)
b(s.join())}(n)}function I(t){t.target.classList.contains("fshBl")&&R(t)}function L(t){n(t.cells[0],' <button class="fshBl fshXSmall">[b]</button>')}function O(t){T(t.rows,3,0).forEach(L),n(t.rows[0].cells[0],' <button class="fshBl fshXSmall">all</button>')}function X(t,n){return t.rows.length>1&&n>1}function z(t){t.length>2&&function(t){o(t).filter(X).forEach(O),r(t[1],I)}(t)}function D(t){return $(t.cells[0].children[0])}function H(t,n){t[n[0]]||n[1].coolTime<=e||(t[n[0]]={cooldownText:n[1].cooldownText,coolTime:n[1].coolTime,seen:"no"})}function M(t,s){const e=s.split("/")
var o,r,c
n(t.cells[3],(o=Number(a(t.cells[3])),r=Number(e[0]),c=Number(e[1]),`<br><span class="fshBlue"> (${p(B(c-r,o),2)}% Current <br>${p(100*o/c,2)}% Total<br>${x(o,c,r)})`))}function Q(n,s){!function(t){const n=a(t.cells[2]);-1===n.indexOf("-")&&M(t,n)}(s),function(t,n){const s=D(n).replace(" (Titan)","")
if(!t[s]){const e=a(n.nextElementSibling.cells[0])
let o=0
e.includes("until")&&(o=S(e.replace("Cooldown until: ",""))),t[s]={cooldownText:e,coolTime:o,seen:"yes"}}}(n,s),function(n){const s=encodeURIComponent(D(n)),e=n.cells[0].children[0],o=N({href:`${d}creatures&search_name=${s}`,target:"_blank"})
t(o,e),t(n.cells[0],o)
const r=n.cells[1],c=a(r)
h(`<a href="${d}realms&search_name=${c}" target="_blank">${c}</a>`,r)}(s)}function U(n){const e=i(u,f)
z(e)
const o={}
!function(t,n){T(t.rows,4,0).forEach(m(Q,n))}(e[1],o),function(t,n){t&&s(t).forEach(m(H,n))}(n,o),function(n,s){if(n.rows.length>5){const e=v(s),o=n.insertRow(5).insertCell(-1)
o.colSpan=3,t(o,e)}}(e[0],o),j("fsh_titans",o)}export default function(){l()||g("fsh_titans").then(U)}
//# sourceMappingURL=injectScouttower-11b52a07.js.map
