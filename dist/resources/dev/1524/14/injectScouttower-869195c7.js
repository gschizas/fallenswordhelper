import{f as n,i as t,n as e,aN as s,aJ as o,o as r,bv as c,at as a,C as l,y as i,ah as f,b as u,p as d,d as h,aj as m,u as b,bw as p,br as T,bx as w,aw as g,B as C}from"./calfSystem-d96a3efd.js"
import"./numberIsNaN-5b8bfc11.js"
import"./round-0cc3c134.js"
import{r as j}from"./roundToString-372e64d2.js"
import{d as N}from"./dataRows-f436d5a8.js"
import{c as $}from"./createTBody-f70881cb.js"
import{c as S}from"./createTable-13920811.js"
import{g as x,a as B}from"./getTitanString-f3cb3cc6.js"
function E(n){return[n[0],n[1].cooldownText,n[1].coolTime,n[1].seen]}function _(n){return n[2]>s}function v(n,t){return n[2]-t[2]}function y(n){return`<tr><td class="fshCenter">${n[0]}</td><td class="fshBold fshCenter fshCooldown">${n[1]}</td><td class="fshCenter">${n[3]}</td></tr>`}function k(s){const o=S({className:"fshTTracker"}),r=$({innerHTML:'<tr><td class="header fshCenter">Titan</td><td class="header fshCenter">Cooldown</td><td class="header fshCenter">Visible</td></tr>'})
return n(o,r),t(r,function(n){return e(n).map(E).filter(_).sort(v).map(y).join("")}(s)),o}function R(n){return l(n.cells[0].children[0].children[0])}function I(n){const{target:t}=n
c("[b]",t)&&function(n){n.previousElementSibling&&a(l(n.previousElementSibling))}(t),c("all",t)&&function(n){const t=n.parentNode.parentNode.parentNode.parentNode,e=N(t.rows,3,0).map(R)
a(e.join())}(t)}function L(n){n.target.classList.contains("fshBl")&&I(n)}function X(n){t(n.cells[0],' <button class="fshBl fshXSmall">[b]</button>')}function H(n){N(n.rows,3,0).forEach(X),t(n.rows[0].cells[0],' <button class="fshBl fshXSmall">all</button>')}function J(n,t){return n.rows.length>1&&t>1}function M(n){n.length>2&&function(n){o(n).filter(J).forEach(H),r(n[1],L)}(n)}function O(n){return p(n.cells[0].children[0])}function U(n,t){n[t[0]]||t[1].coolTime<=s||(n[t[0]]={cooldownText:t[1].cooldownText,coolTime:t[1].coolTime,seen:"no"})}function V(n,e){const s=e.split("/")
var o,r,c
t(n.cells[3],(o=Number(l(n.cells[3])),r=Number(s[0]),c=Number(s[1]),`<br><span class="fshBlue"> (${j(x(c-r,o),2)}% Current <br>${j(100*o/c,2)}% Total<br>${B(o,c,r)})`))}function q(t,e){!function(n){const t=l(n.cells[2]);-1===t.indexOf("-")&&V(n,t)}(e),function(n,t){const e=O(t).replace(" (Titan)","")
if(!n[e]){const s=l(t.nextElementSibling.cells[0])
let o=0
s.includes("until")&&(o=T(s.replace("Cooldown until: ",""))),n[e]={cooldownText:s,coolTime:o,seen:"yes"}}}(t,e),function(t){const e=encodeURIComponent(O(t)),s=t.cells[0].children[0],o=w({href:`${g}creatures&search_name=${e}`,target:"_blank"})
n(o,s),n(t.cells[0],o)
const r=t.cells[1],c=l(r)
C(`<a href="${g}realms&search_name=${c}" target="_blank">${c}</a>`,r)}(e)}function z(t){const s=u(h,d)
M(s)
const o={}
!function(n,t){N(n.rows,4,0).forEach(b(q,t))}(s[1],o),function(n,t){n&&e(n).forEach(b(U,t))}(t,o),function(t,e){if(t.rows.length>5){const s=k(e),o=t.insertRow(5).insertCell(-1)
o.colSpan=3,n(o,s)}}(s[0],o),m("fsh_titans",o)}export default function(){i()||f("fsh_titans").then(z)}
//# sourceMappingURL=injectScouttower-869195c7.js.map
