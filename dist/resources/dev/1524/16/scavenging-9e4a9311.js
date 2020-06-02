import{x as t,f as n,s as e,e as o,z as s,A as c,X as r,bN as a,aj as i,k as u,p as f,l as m}from"./calfSystem-d49dbbd3.js"
import{n as l}from"./numberIsNaN-1742f258.js"
import"./toLowerCase-e686322a.js"
import{i as d}from"./intValue-2ed328c8.js"
import{a as p}from"./alpha-66ff978e.js"
import{c as b}from"./createSpan-d12a564e.js"
import"./closest-c1f1e24c.js"
import{c as g}from"./closestTable-dc4f2fff.js"
function h(t,n,e){s("",t)
const o=Number(e.value)
l(o)||0===o||function(t,n,e){const o=d(c(n)),r=Math.floor(o/e).toString()
s(`&nbsp;&nbsp;Max: ${r} times`,t)}(t,n,o)}function j(t,n,e){t&&h(t,n,e)}function $(s){!function(t){g(t).removeAttribute("width")}(s),function(t,n,s){const c=e(j,t,n,s)
c(),o(s,"keyup",c)}(function(t){const e=b()
return n(t.parentNode,e),e}(s),t("statbar-gold"),t("gold"))}let v
function N(t,n){const e=n.match(/>([^<]+)</)[1]
return t[e]=(t[e]||0)+1,t}function S(t,n){return p(t[0],n[0])}function x(t){return`<br>${t[1]} ${t[0]}(s), `}function M(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${m(n).sort(S).map(x).join("")}`}function _(){let n=""
const e=t("scavenge_results")
if(e){const t=e.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?"Victories: "+n.length:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?", Defeated: "+n.length:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return M(n)}(t)}return n}function k(t){return function(e,o,c){t(e,o,c),r("lastScavPage",`${a}scavenging&cave_id=${c}&gold=${o}`),s(_(),(v||(v=u(),n(f,v)),s("",v),v))}}export default function(){!function(){const t=sendRequest
i(t)&&(sendRequest=k(t))}(),function(){const n=t("multiplier_count")
n&&$(n)}()}
//# sourceMappingURL=scavenging-9e4a9311.js.map
