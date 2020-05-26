import{f as n,i as t,l as e,ay as s,av as o,o as r,bj as a,A as c,w as l,a4 as i,b as f,p as u,d,a6 as m,s as h,af as p,z as b}from"./calfSystem-1262535f.js"
import"./numberIsNaN-e4fe1516.js"
import{a as T}from"./roundToString-a7da9cfa.js"
import"./fshOpen-6d67ed12.js"
import{o as g}from"./openQuickBuffByName-05521d4e.js"
import{d as w}from"./dataRows-f0bd58da.js"
import{c as j}from"./createTBody-5668a27d.js"
import{c as C}from"./createTable-34bb0f34.js"
import{c as N}from"./createAnchor-89104765.js"
import{g as $}from"./getTitle-c55a3ff0.js"
import{p as S}from"./parseDateAsTimestamp-53cf8e3f.js"
import{g as B,a as x}from"./getTitanString-23fc03d0.js"
function E(n){return[n[0],n[1].cooldownText,n[1].coolTime,n[1].seen]}function _(n){return n[2]>s}function y(n,t){return n[2]-t[2]}function k(n){return`<tr><td class="fshCenter">${n[0]}</td><td class="fshBold fshCenter fshCooldown">${n[1]}</td><td class="fshCenter">${n[3]}</td></tr>`}function v(s){const o=C({className:"fshTTracker"}),r=j({innerHTML:'<tr><td class="header fshCenter">Titan</td><td class="header fshCenter">Cooldown</td><td class="header fshCenter">Visible</td></tr>'})
return n(o,r),t(r,function(n){return e(n).map(E).filter(_).sort(y).map(k).join("")}(s)),o}function A(n){return c(n.cells[0].children[0].children[0])}function R(n){const{target:t}=n
a("[b]",t)&&function(n){n.previousElementSibling&&g(c(n.previousElementSibling))}(t),a("all",t)&&function(n){const t=n.parentNode.parentNode.parentNode.parentNode,e=w(t.rows,3,0).map(A)
g(e.join())}(t)}function I(n){n.target.classList.contains("fshBl")&&R(n)}function L(n){t(n.cells[0],' <button class="fshBl fshXSmall">[b]</button>')}function O(n){w(n.rows,3,0).forEach(L),t(n.rows[0].cells[0],' <button class="fshBl fshXSmall">all</button>')}function X(n,t){return n.rows.length>1&&t>1}function z(n){n.length>2&&function(n){o(n).filter(X).forEach(O),r(n[1],I)}(n)}function D(n){return $(n.cells[0].children[0])}function H(n,t){n[t[0]]||t[1].coolTime<=s||(n[t[0]]={cooldownText:t[1].cooldownText,coolTime:t[1].coolTime,seen:"no"})}function M(n,e){const s=e.split("/")
var o,r,a
t(n.cells[3],(o=Number(c(n.cells[3])),r=Number(s[0]),a=Number(s[1]),`<br><span class="fshBlue"> (${T(B(a-r,o),2)}% Current <br>${T(100*o/a,2)}% Total<br>${x(o,a,r)})`))}function Q(t,e){!function(n){const t=c(n.cells[2]);-1===t.indexOf("-")&&M(n,t)}(e),function(n,t){const e=D(t).replace(" (Titan)","")
if(!n[e]){const s=c(t.nextElementSibling.cells[0])
let o=0
s.includes("until")&&(o=S(s.replace("Cooldown until: ",""))),n[e]={cooldownText:s,coolTime:o,seen:"yes"}}}(t,e),function(t){const e=encodeURIComponent(D(t)),s=t.cells[0].children[0],o=N({href:`${p}creatures&search_name=${e}`,target:"_blank"})
n(o,s),n(t.cells[0],o)
const r=t.cells[1],a=c(r)
b(`<a href="${p}realms&search_name=${a}" target="_blank">${a}</a>`,r)}(e)}function U(t){const s=f(d,u)
z(s)
const o={}
!function(n,t){w(n.rows,4,0).forEach(h(Q,t))}(s[1],o),function(n,t){n&&e(n).forEach(h(H,t))}(t,o),function(t,e){if(t.rows.length>5){const s=v(e),o=t.insertRow(5).insertCell(-1)
o.colSpan=3,n(o,s)}}(s[0],o),m("fsh_titans",o)}export default function(){l()||i("fsh_titans").then(U)}
//# sourceMappingURL=injectScouttower-848e9ea5.js.map
