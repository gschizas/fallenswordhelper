import{h as n,i as t,q as e,aL as s,aH as o,o as a,br as r,ar as c,D as l,z as i,ah as f,b as u,p as d,c as h,aj as m,v as b,bs as p,bm as T,bt as w,au as g,C}from"./calfSystem-fb94ddf0.js"
import"./numberIsNaN-c4fdd2a1.js"
import{a as $}from"./roundToString-ad22adc0.js"
import{d as j}from"./dataRows-8e1e47a6.js"
import{c as N}from"./createTBody-9339b8b5.js"
import{c as S}from"./createTable-311a8539.js"
import{g as x,a as E}from"./getTitanString-225bc7dc.js"
function B(n){return[n[0],n[1].cooldownText,n[1].coolTime,n[1].seen]}function _(n){return n[2]>s}function v(n,t){return n[2]-t[2]}function k(n){return`<tr><td class="fshCenter">${n[0]}</td><td class="fshBold fshCenter fshCooldown">${n[1]}</td><td class="fshCenter">${n[3]}</td></tr>`}function y(s){const o=S({className:"fshTTracker"}),a=N({innerHTML:'<tr><td class="header fshCenter">Titan</td><td class="header fshCenter">Cooldown</td><td class="header fshCenter">Visible</td></tr>'})
return n(o,a),t(a,function(n){return e(n).map(B).filter(_).sort(v).map(k).join("")}(s)),o}function L(n){return l(n.cells[0].children[0].children[0])}function R(n){const{target:t}=n
r("[b]",t)&&function(n){n.previousElementSibling&&c(l(n.previousElementSibling))}(t),r("all",t)&&function(n){const t=n.parentNode.parentNode.parentNode.parentNode,e=j(t.rows,3,0).map(L)
c(e.join())}(t)}function H(n){n.target.classList.contains("fshBl")&&R(n)}function I(n){t(n.cells[0],' <button class="fshBl fshXSmall">[b]</button>')}function X(n){j(n.rows,3,0).forEach(I),t(n.rows[0].cells[0],' <button class="fshBl fshXSmall">all</button>')}function q(n,t){return n.rows.length>1&&t>1}function z(n){n.length>2&&function(n){o(n).filter(q).forEach(X),a(n[1],H)}(n)}function D(n){return p(n.cells[0].children[0])}function M(n,t){n[t[0]]||t[1].coolTime<=s||(n[t[0]]={cooldownText:t[1].cooldownText,coolTime:t[1].coolTime,seen:"no"})}function O(n,e){const s=e.split("/")
var o,a,r
t(n.cells[3],(o=Number(l(n.cells[3])),a=Number(s[0]),r=Number(s[1]),`<br><span class="fshBlue"> (${$(x(r-a,o),2)}% Current <br>${$(100*o/r,2)}% Total<br>${E(o,r,a)})`))}function U(t,e){!function(n){const t=l(n.cells[2]);-1===t.indexOf("-")&&O(n,t)}(e),function(n,t){const e=D(t).replace(" (Titan)","")
if(!n[e]){const s=l(t.nextElementSibling.cells[0])
let o=0
s.includes("until")&&(o=T(s.replace("Cooldown until: ",""))),n[e]={cooldownText:s,coolTime:o,seen:"yes"}}}(t,e),function(t){const e=encodeURIComponent(D(t)),s=t.cells[0].children[0],o=w({href:`${g}creatures&search_name=${e}`,target:"_blank"})
n(o,s),n(t.cells[0],o)
const a=t.cells[1],r=l(a)
C(`<a href="${g}realms&search_name=${r}" target="_blank">${r}</a>`,a)}(e)}function V(t){const s=u(h,d)
z(s)
const o={}
!function(n,t){j(n.rows,4,0).forEach(b(U,t))}(s[1],o),function(n,t){n&&e(n).forEach(b(M,t))}(t,o),function(t,e){if(t.rows.length>5){const s=y(e),o=t.insertRow(5).insertCell(-1)
o.colSpan=3,n(o,s)}}(s[0],o),m("fsh_titans",o)}export default function(){i()||f("fsh_titans").then(V)}
//# sourceMappingURL=injectScouttower-50ff2f9d.js.map
