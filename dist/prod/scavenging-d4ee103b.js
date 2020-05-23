import{A as t,T as n,h as o,v as e,f as s,C as c,I as r,D as a,a4 as i,c5 as u,al as f,l as m,p as l,q as b}from"./calfSystem-d06402b1.js"
import{n as d}from"./numberIsNaN-cb3c2f58.js"
import"./toLowerCase-a009b564.js"
import{a as p}from"./alpha-539ab08d.js"
import"./closest-0e7d337b.js"
import{c as g}from"./closestTable-3bbadb79.js"
function h(t,n,o){c("",t)
const e=Number(o.value)
d(e)||0===e||function(t,n,o){const e=r(a(n)),s=Math.floor(e/o).toString()
c(`&nbsp;&nbsp;Max: ${s} times`,t)}(t,n,e)}function $(t,n,o){t&&h(t,n,o)}function v(c){!function(t){g(t).removeAttribute("width")}(c),function(t,n,o){const c=e($,t,n,o)
c(),s(o,"keyup",c)}(function(t){const e=n()
return o(t.parentNode,e),e}(c),t("statbar-gold"),t("gold"))}let j
function N(t,n){const o=n.match(/>([^<]+)</)[1]
return t[o]=(t[o]||0)+1,t}function q(t,n){return p(t[0],n[0])}function I(t){return`<br>${t[1]} ${t[0]}(s), `}function M(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${b(n).sort(q).map(I).join("")}`}function S(){let n=""
const o=t("scavenge_results")
if(o){const t=o.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?`Victories: ${n.length}`:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?`, Defeated: ${n.length}`:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return M(n)}(t)}return n}function T(t){return function(n,e,s){t(n,e,s),i("lastScavPage",`${u}scavenging&cave_id=${s}&gold=${e}`),c(S(),(j||(j=m(),o(l,j)),c("",j),j))}}export default function(){!function(){const t=sendRequest
f(t)&&(sendRequest=T(t))}(),function(){const n=t("multiplier_count")
n&&v(n)}()}
//# sourceMappingURL=scavenging-d4ee103b.js.map
