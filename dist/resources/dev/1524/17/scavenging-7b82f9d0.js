import{x as t,f as n,s as e,e as o,z as s,A as r,X as c,bM as a,aj as i,k as u,p as f,l as m}from"./calfSystem-1c103624.js"
import{n as l}from"./numberIsNaN-40c4542d.js"
import"./toLowerCase-9f60cfa4.js"
import{i as p}from"./intValue-f5e62e5b.js"
import{a as b}from"./alpha-71a6f0bf.js"
import{c as d}from"./createSpan-475e9683.js"
import"./closest-a4273a71.js"
import{c as g}from"./closestTable-67ab97b7.js"
function h(t,n,e){s("",t)
const o=Number(e.value)
l(o)||0===o||function(t,n,e){const o=p(r(n)),c=Math.floor(o/e).toString()
s(`&nbsp;&nbsp;Max: ${c} times`,t)}(t,n,o)}function j(t,n,e){t&&h(t,n,e)}function $(s){!function(t){g(t).removeAttribute("width")}(s),function(t,n,s){const r=e(j,t,n,s)
r(),o(s,"keyup",r)}(function(t){const e=d()
return n(t.parentNode,e),e}(s),t("statbar-gold"),t("gold"))}let v
function M(t,n){const e=n.match(/>([^<]+)</)[1]
return t[e]=(t[e]||0)+1,t}function N(t,n){return b(t[0],n[0])}function S(t){return`<br>${t[1]} ${t[0]}(s), `}function x(t){const n=function(t){return t.reduce(M,{})}(t)
return`<br>${t.length} item(s):${m(n).sort(N).map(S).join("")}`}function _(){let n=""
const e=t("scavenge_results")
if(e){const t=e.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?"Victories: "+n.length:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?", Defeated: "+n.length:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return x(n)}(t)}return n}function k(t){return function(e,o,r){t(e,o,r),c("lastScavPage",`${a}scavenging&cave_id=${r}&gold=${o}`),s(_(),(v||(v=u(),n(f,v)),s("",v),v))}}export default function(){!function(){const t=sendRequest
i(t)&&(sendRequest=k(t))}(),function(){const n=t("multiplier_count")
n&&$(n)}()}
//# sourceMappingURL=scavenging-7b82f9d0.js.map
