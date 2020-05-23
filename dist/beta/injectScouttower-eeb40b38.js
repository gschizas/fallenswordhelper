import{h as n,i as t,q as e,aL as s,aH as o,o as r,br as a,ar as c,D as l,z as i,ah as f,b as u,p as d,c as h,aj as m,v as b,bs as p,bm as T,bt as w,au as g,C}from"./calfSystem-70c0e373.js"
import"./numberIsNaN-a9336482.js"
import{a as $}from"./roundToString-1db23610.js"
import{d as j}from"./dataRows-64b2efcb.js"
import{c as N}from"./createTBody-81f63b95.js"
import{c as S}from"./createTable-9ce47553.js"
import{g as x,a as E}from"./getTitanString-ec16fdf8.js"
function B(n){return[n[0],n[1].cooldownText,n[1].coolTime,n[1].seen]}function _(n){return n[2]>s}function v(n,t){return n[2]-t[2]}function k(n){return`<tr><td class="fshCenter">${n[0]}</td><td class="fshBold fshCenter fshCooldown">${n[1]}</td><td class="fshCenter">${n[3]}</td></tr>`}function y(s){const o=S({className:"fshTTracker"}),r=N({innerHTML:'<tr><td class="header fshCenter">Titan</td><td class="header fshCenter">Cooldown</td><td class="header fshCenter">Visible</td></tr>'})
return n(o,r),t(r,function(n){return e(n).map(B).filter(_).sort(v).map(k).join("")}(s)),o}function L(n){return l(n.cells[0].children[0].children[0])}function R(n){const{target:t}=n
a("[b]",t)&&function(n){n.previousElementSibling&&c(l(n.previousElementSibling))}(t),a("all",t)&&function(n){const t=n.parentNode.parentNode.parentNode.parentNode,e=j(t.rows,3,0).map(L)
c(e.join())}(t)}function H(n){n.target.classList.contains("fshBl")&&R(n)}function I(n){t(n.cells[0],' <button class="fshBl fshXSmall">[b]</button>')}function X(n){j(n.rows,3,0).forEach(I),t(n.rows[0].cells[0],' <button class="fshBl fshXSmall">all</button>')}function q(n,t){return n.rows.length>1&&t>1}function z(n){n.length>2&&function(n){o(n).filter(q).forEach(X),r(n[1],H)}(n)}function D(n){return p(n.cells[0].children[0])}function M(n,t){n[t[0]]||t[1].coolTime<=s||(n[t[0]]={cooldownText:t[1].cooldownText,coolTime:t[1].coolTime,seen:"no"})}function O(n,e){const s=e.split("/")
var o,r,a
t(n.cells[3],(o=Number(l(n.cells[3])),r=Number(s[0]),a=Number(s[1]),`<br><span class="fshBlue"> (${$(x(a-r,o),2)}% Current <br>${$(100*o/a,2)}% Total<br>${E(o,a,r)})`))}function U(t,e){!function(n){const t=l(n.cells[2]);-1===t.indexOf("-")&&O(n,t)}(e),function(n,t){const e=D(t).replace(" (Titan)","")
if(!n[e]){const s=l(t.nextElementSibling.cells[0])
let o=0
s.includes("until")&&(o=T(s.replace("Cooldown until: ",""))),n[e]={cooldownText:s,coolTime:o,seen:"yes"}}}(t,e),function(t){const e=encodeURIComponent(D(t)),s=t.cells[0].children[0],o=w({href:`${g}creatures&search_name=${e}`,target:"_blank"})
n(o,s),n(t.cells[0],o)
const r=t.cells[1],a=l(r)
C(`<a href="${g}realms&search_name=${a}" target="_blank">${a}</a>`,r)}(e)}function V(t){const s=u(h,d)
z(s)
const o={}
!function(n,t){j(n.rows,4,0).forEach(b(U,t))}(s[1],o),function(n,t){n&&e(n).forEach(b(M,t))}(t,o),function(t,e){if(t.rows.length>5){const s=y(e),o=t.insertRow(5).insertCell(-1)
o.colSpan=3,n(o,s)}}(s[0],o),m("fsh_titans",o)}export default function(){i()||f("fsh_titans").then(V)}
//# sourceMappingURL=injectScouttower-eeb40b38.js.map
