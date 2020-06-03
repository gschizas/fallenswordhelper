import{f as t,i as n,l as e,a2 as s,aD as o,o as r,b4 as a,A as c,w as l,b as i,p as f,d as u,s as d,ao as m,z as h}from"./calfSystem-6fc0cc1b.js"
import"./numberIsNaN-4ae9af58.js"
import{a as p}from"./roundToString-3bd2d569.js"
import"./fshOpen-8d675aa9.js"
import{o as b}from"./openQuickBuffByName-b0838d7a.js"
import{d as T}from"./dataRows-ddfae63d.js"
import{g,s as w}from"./idb-92d6a2b5.js"
import{c as j}from"./createTBody-f954eeed.js"
import{c as C}from"./createTable-380d7c97.js"
import{c as N}from"./createAnchor-255afa0c.js"
import{g as $}from"./getTitle-f60d0475.js"
import{p as S}from"./parseDateAsTimestamp-576c2f4c.js"
import{g as B,a as x}from"./getTitanString-05e26c27.js"
function E(t){return[t[0],t[1].cooldownText,t[1].coolTime,t[1].seen]}function _(t){return t[2]>s}function k(t,n){return t[2]-n[2]}function y(t){return`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${t[1]}</td><td class="fshCenter">${t[3]}</td></tr>`}function v(s){const o=C({className:"fshTTracker"}),r=j({innerHTML:'<tr><td class="header fshCenter">Titan</td><td class="header fshCenter">Cooldown</td><td class="header fshCenter">Visible</td></tr>'})
return t(o,r),n(r,function(t){return e(t).map(E).filter(_).sort(k).map(y).join("")}(s)),o}function A(t){return c(t.cells[0].children[0].children[0])}function R(t){const{target:n}=t
a("[b]",n)&&function(t){t.previousElementSibling&&b(c(t.previousElementSibling))}(n),a("all",n)&&function(t){const n=t.parentNode.parentNode.parentNode.parentNode,e=T(n.rows,3,0).map(A)
b(e.join())}(n)}function D(t){t.target.classList.contains("fshBl")&&R(t)}function I(t){n(t.cells[0],' <button class="fshBl fshXSmall">[b]</button>')}function L(t){T(t.rows,3,0).forEach(I),n(t.rows[0].cells[0],' <button class="fshBl fshXSmall">all</button>')}function O(t,n){return t.rows.length>1&&n>1}function X(t){t.length>2&&function(t){o(t).filter(O).forEach(L),r(t[1],D)}(t)}function z(t){return $(t.cells[0].children[0])}function H(t,n){t[n[0]]||n[1].coolTime<=s||(t[n[0]]={cooldownText:n[1].cooldownText,coolTime:n[1].coolTime,seen:"no"})}function M(t,e){const s=e.split("/")
var o,r,a
n(t.cells[3],(o=Number(c(t.cells[3])),r=Number(s[0]),a=Number(s[1]),`<br><span class="fshBlue"> (${p(B(a-r,o),2)}% Current <br>${p(100*o/a,2)}% Total<br>${x(o,a,r)})`))}function Q(n,e){!function(t){const n=c(t.cells[2]);-1===n.indexOf("-")&&M(t,n)}(e),function(t,n){const e=z(n).replace(" (Titan)","")
if(!t[e]){const s=c(n.nextElementSibling.cells[0])
let o=0
s.includes("until")&&(o=S(s.replace("Cooldown until: ",""))),t[e]={cooldownText:s,coolTime:o,seen:"yes"}}}(n,e),function(n){const e=encodeURIComponent(z(n)),s=n.cells[0].children[0],o=N({href:`${m}creatures&search_name=${e}`,target:"_blank"})
t(o,s),t(n.cells[0],o)
const r=n.cells[1],a=c(r)
h(`<a href="${m}realms&search_name=${a}" target="_blank">${a}</a>`,r)}(e)}function U(n){const s=i(u,f)
X(s)
const o={}
!function(t,n){T(t.rows,4,0).forEach(d(Q,n))}(s[1],o),function(t,n){t&&e(t).forEach(d(H,n))}(n,o),function(n,e){if(n.rows.length>5){const s=v(e),o=n.insertRow(5).insertCell(-1)
o.colSpan=3,t(o,s)}}(s[0],o),w("fsh_titans",o)}export default function(){l()||g("fsh_titans").then(U)}
//# sourceMappingURL=injectScouttower-81f1c88a.js.map
