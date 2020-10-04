import{h as t,i as n,e,a5 as o,M as s,o as r,l as a,b3 as c,B as l,x as i,b as f,p as u,d as m,t as d,aq as h,A as p}from"./calfSystem-3bdf319e.js"
import"./numberIsNaN-871eca26.js"
import{a as b}from"./roundToString-5fa05af1.js"
import"./fshOpen-da9a149e.js"
import{o as T}from"./openQuickBuffByName-223a30ec.js"
import{d as g}from"./dataRows-2d50b364.js"
import{g as j,s as w}from"./idb-31fb041e.js"
import{c as C}from"./createTBody-e1fd2ed4.js"
import{c as N}from"./createTable-bf1faf4f.js"
import{c as $}from"./createAnchor-2f31a00c.js"
import{g as B}from"./getTitle-c1f063e1.js"
import{p as S}from"./parseDateAsTimestamp-3b93125b.js"
import{g as x,a as E}from"./getTitanString-8283c907.js"
function _(t){return[t[0],t[1].cooldownText,t[1].coolTime,t[1].seen]}function k(t){return t[2]>o}function y(t,n){return t[2]-n[2]}function v(t){return`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${t[1]}</td><td class="fshCenter">${t[3]}</td></tr>`}function A(o){const s=N({className:"fshTTracker"}),r=C({innerHTML:'<tr><td class="header fshCenter">Titan</td><td class="header fshCenter">Cooldown</td><td class="header fshCenter">Visible</td></tr>'})
return t(s,r),n(r,function(t){return e(t).map(_).filter(k).sort(y).map(v).join("")}(o)),s}function R(t){return l(t.cells[0].children[0].children[0])}function I(t){const{target:n}=t
c("[b]",n)&&function(t){t.previousElementSibling&&T(l(t.previousElementSibling))}(n),c("all",n)&&function(t){const n=t.parentNode.parentNode.parentNode.parentNode,e=g(n.rows,3,0).map(R)
T(e.join())}(n)}function M(t){a("fshBl",t.target)&&I(t)}function O(t){n(t.cells[0],' <button class="fshBl fshXSmall">[b]</button>')}function X(t){g(t.rows,3,0).forEach(O),n(t.rows[0].cells[0],' <button class="fshBl fshXSmall">all</button>')}function q(t,n){return t.rows.length>1&&n>1}function D(t){t.length>2&&function(t){s(t).filter(q).forEach(X),r(t[1],M)}(t)}function H(t){return B(t.cells[0].children[0])}function L(t,n){t[n[0]]||n[1].coolTime<=o||(t[n[0]]={cooldownText:n[1].cooldownText,coolTime:n[1].coolTime,seen:"no"})}function Q(t,e){const o=e.split("/")
var s,r,a
n(t.cells[3],(s=Number(l(t.cells[3])),r=Number(o[0]),a=Number(o[1]),`<br><span class="fshBlue"> (${b(x(a-r,s),2)}% Current <br>${b(100*s/a,2)}% Total<br>${E(s,a,r)})`))}function U(n,e){!function(t){const n=l(t.cells[2]);-1===n.indexOf("-")&&Q(t,n)}(e),function(t,n){const e=H(n).replace(" (Titan)","")
if(!t[e]){const o=l(n.nextElementSibling.cells[0])
let s=0
o.includes("until")&&(s=S(o.replace("Cooldown until: ",""))),t[e]={cooldownText:o,coolTime:s,seen:"yes"}}}(n,e),function(n){const e=encodeURIComponent(H(n)),o=n.cells[0].children[0],s=$({href:`${h}creatures&search_name=${e}`,target:"_blank"})
t(s,o),t(n.cells[0],s)
const r=n.cells[1],a=l(r)
p(`<a href="${h}realms&search_name=${a}" target="_blank">${a}</a>`,r)}(e)}function V(n){const o=f(m,u)
D(o)
const s={}
!function(t,n){g(t.rows,4,0).forEach(d(U,n))}(o[1],s),function(t,n){t&&e(t).forEach(d(L,n))}(n,s),function(n,e){if(n.rows.length>5){const o=A(e),s=n.insertRow(5).insertCell(-1)
s.colSpan=3,t(s,o)}}(o[0],s),w("fsh_titans",s)}function z(){i()||j("fsh_titans").then(V)}export default z
//# sourceMappingURL=injectScouttower-88d125ea.js.map
