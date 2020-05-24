import{f as n,i as t,n as e,aK as s,aG as o,o as a,bo as r,aq as c,C as l,y as i,ag as f,b as u,p as d,d as h,ai as m,u as b,bp as p,bj as T,bq as g,at as w,B as C}from"./calfSystem-d587d232.js"
import"./numberIsNaN-054e0c59.js"
import{a as $}from"./roundToString-86a4e935.js"
import{d as j}from"./dataRows-22551573.js"
import{c as N}from"./createTBody-d864b9fe.js"
import{c as S}from"./createTable-5f8e2bd3.js"
import{g as x,a as B}from"./getTitanString-e277f401.js"
function E(n){return[n[0],n[1].cooldownText,n[1].coolTime,n[1].seen]}function _(n){return n[2]>s}function y(n,t){return n[2]-t[2]}function k(n){return`<tr><td class="fshCenter">${n[0]}</td><td class="fshBold fshCenter fshCooldown">${n[1]}</td><td class="fshCenter">${n[3]}</td></tr>`}function v(s){const o=S({className:"fshTTracker"}),a=N({innerHTML:'<tr><td class="header fshCenter">Titan</td><td class="header fshCenter">Cooldown</td><td class="header fshCenter">Visible</td></tr>'})
return n(o,a),t(a,function(n){return e(n).map(E).filter(_).sort(y).map(k).join("")}(s)),o}function R(n){return l(n.cells[0].children[0].children[0])}function q(n){const{target:t}=n
r("[b]",t)&&function(n){n.previousElementSibling&&c(l(n.previousElementSibling))}(t),r("all",t)&&function(n){const t=n.parentNode.parentNode.parentNode.parentNode,e=j(t.rows,3,0).map(R)
c(e.join())}(t)}function I(n){n.target.classList.contains("fshBl")&&q(n)}function L(n){t(n.cells[0],' <button class="fshBl fshXSmall">[b]</button>')}function X(n){j(n.rows,3,0).forEach(L),t(n.rows[0].cells[0],' <button class="fshBl fshXSmall">all</button>')}function G(n,t){return n.rows.length>1&&t>1}function H(n){n.length>2&&function(n){o(n).filter(G).forEach(X),a(n[1],I)}(n)}function K(n){return p(n.cells[0].children[0])}function M(n,t){n[t[0]]||t[1].coolTime<=s||(n[t[0]]={cooldownText:t[1].cooldownText,coolTime:t[1].coolTime,seen:"no"})}function O(n,e){const s=e.split("/")
var o,a,r
t(n.cells[3],(o=Number(l(n.cells[3])),a=Number(s[0]),r=Number(s[1]),`<br><span class="fshBlue"> (${$(x(r-a,o),2)}% Current <br>${$(100*o/r,2)}% Total<br>${B(o,r,a)})`))}function U(t,e){!function(n){const t=l(n.cells[2]);-1===t.indexOf("-")&&O(n,t)}(e),function(n,t){const e=K(t).replace(" (Titan)","")
if(!n[e]){const s=l(t.nextElementSibling.cells[0])
let o=0
s.includes("until")&&(o=T(s.replace("Cooldown until: ",""))),n[e]={cooldownText:s,coolTime:o,seen:"yes"}}}(t,e),function(t){const e=encodeURIComponent(K(t)),s=t.cells[0].children[0],o=g({href:`${w}creatures&search_name=${e}`,target:"_blank"})
n(o,s),n(t.cells[0],o)
const a=t.cells[1],r=l(a)
C(`<a href="${w}realms&search_name=${r}" target="_blank">${r}</a>`,a)}(e)}function V(t){const s=u(h,d)
H(s)
const o={}
!function(n,t){j(n.rows,4,0).forEach(b(U,t))}(s[1],o),function(n,t){n&&e(n).forEach(b(M,t))}(t,o),function(t,e){if(t.rows.length>5){const s=v(e),o=t.insertRow(5).insertCell(-1)
o.colSpan=3,n(o,s)}}(s[0],o),m("fsh_titans",o)}export default function(){i()||f("fsh_titans").then(V)}
//# sourceMappingURL=injectScouttower-934497c8.js.map
