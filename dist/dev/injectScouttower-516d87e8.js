import{h as n,i as t,q as s,aO as e,aK as o,o as r,bw as a,au as c,D as l,z as i,ai as f,b as u,p as d,c as h,ak as m,v as b,bx as p,bs as T,by as w,ax as g,C}from"./calfSystem-8dc0fa4b.js"
import"./numberIsNaN-73f607dc.js"
import"./round-98f16be7.js"
import{r as $}from"./roundToString-f0f1b4b6.js"
import{d as j}from"./dataRows-1b7df704.js"
import{c as N}from"./createTBody-1d0f01f5.js"
import{c as x}from"./createTable-5d1d98c3.js"
import{g as S,a as E}from"./getTitanString-c79af332.js"
function B(n){return[n[0],n[1].cooldownText,n[1].coolTime,n[1].seen]}function _(n){return n[2]>e}function k(n,t){return n[2]-t[2]}function v(n){return`<tr><td class="fshCenter">${n[0]}</td><td class="fshBold fshCenter fshCooldown">${n[1]}</td><td class="fshCenter">${n[3]}</td></tr>`}function y(e){const o=x({className:"fshTTracker"}),r=N({innerHTML:'<tr><td class="header fshCenter">Titan</td><td class="header fshCenter">Cooldown</td><td class="header fshCenter">Visible</td></tr>'})
return n(o,r),t(r,function(n){return s(n).map(B).filter(_).sort(k).map(v).join("")}(e)),o}function R(n){return l(n.cells[0].children[0].children[0])}function I(n){const{target:t}=n
a("[b]",t)&&function(n){n.previousElementSibling&&c(l(n.previousElementSibling))}(t),a("all",t)&&function(n){const t=n.parentNode.parentNode.parentNode.parentNode,s=j(t.rows,3,0).map(R)
c(s.join())}(t)}function L(n){n.target.classList.contains("fshBl")&&I(n)}function O(n){t(n.cells[0],' <button class="fshBl fshXSmall">[b]</button>')}function X(n){j(n.rows,3,0).forEach(O),t(n.rows[0].cells[0],' <button class="fshBl fshXSmall">all</button>')}function q(n,t){return n.rows.length>1&&t>1}function z(n){n.length>2&&function(n){o(n).filter(q).forEach(X),r(n[1],L)}(n)}function D(n){return p(n.cells[0].children[0])}function H(n,t){n[t[0]]||t[1].coolTime<=e||(n[t[0]]={cooldownText:t[1].cooldownText,coolTime:t[1].coolTime,seen:"no"})}function K(n,s){const e=s.split("/")
var o,r,a
t(n.cells[3],(o=Number(l(n.cells[3])),r=Number(e[0]),a=Number(e[1]),`<br><span class="fshBlue"> (${$(S(a-r,o),2)}% Current <br>${$(100*o/a,2)}% Total<br>${E(o,a,r)})`))}function M(t,s){!function(n){const t=l(n.cells[2]);-1===t.indexOf("-")&&K(n,t)}(s),function(n,t){const s=D(t).replace(" (Titan)","")
if(!n[s]){const e=l(t.nextElementSibling.cells[0])
let o=0
e.includes("until")&&(o=T(e.replace("Cooldown until: ",""))),n[s]={cooldownText:e,coolTime:o,seen:"yes"}}}(t,s),function(t){const s=encodeURIComponent(D(t)),e=t.cells[0].children[0],o=w({href:`${g}creatures&search_name=${s}`,target:"_blank"})
n(o,e),n(t.cells[0],o)
const r=t.cells[1],a=l(r)
C(`<a href="${g}realms&search_name=${a}" target="_blank">${a}</a>`,r)}(s)}function U(t){const e=u(h,d)
z(e)
const o={}
!function(n,t){j(n.rows,4,0).forEach(b(M,t))}(e[1],o),function(n,t){n&&s(n).forEach(b(H,t))}(t,o),function(t,s){if(t.rows.length>5){const e=y(s),o=t.insertRow(5).insertCell(-1)
o.colSpan=3,n(o,e)}}(e[0],o),m("fsh_titans",o)}export default function(){i()||f("fsh_titans").then(U)}
//# sourceMappingURL=injectScouttower-516d87e8.js.map
