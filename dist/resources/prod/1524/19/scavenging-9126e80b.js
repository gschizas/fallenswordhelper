import{x as t,f as n,s as e,e as o,z as s,A as r,W as a,bH as c,ag as i,k as u,p as f,l as m}from"./calfSystem-6fc0cc1b.js"
import{n as l}from"./numberIsNaN-4ae9af58.js"
import"./toLowerCase-9e782464.js"
import{i as p}from"./intValue-3f75a919.js"
import{a as b}from"./alpha-f3b92543.js"
import{c as d}from"./createSpan-12ee4f1a.js"
import"./closest-958712aa.js"
import{c as g}from"./closestTable-4bde3ff0.js"
function h(t,n,e){s("",t)
const o=Number(e.value)
l(o)||0===o||function(t,n,e){const o=p(r(n)),a=Math.floor(o/e).toString()
s(`&nbsp;&nbsp;Max: ${a} times`,t)}(t,n,o)}function j(t,n,e){t&&h(t,n,e)}function $(s){!function(t){g(t).removeAttribute("width")}(s),function(t,n,s){const r=e(j,t,n,s)
r(),o(s,"keyup",r)}(function(t){const e=d()
return n(t.parentNode,e),e}(s),t("statbar-gold"),t("gold"))}let v
function N(t,n){const e=n.match(/>([^<]+)</)[1]
return t[e]=(t[e]||0)+1,t}function S(t,n){return b(t[0],n[0])}function x(t){return`<br>${t[1]} ${t[0]}(s), `}function M(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${m(n).sort(S).map(x).join("")}`}function _(){let n=""
const e=t("scavenge_results")
if(e){const t=e.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?"Victories: "+n.length:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?", Defeated: "+n.length:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return M(n)}(t)}return n}function k(t){return function(e,o,r){t(e,o,r),a("lastScavPage",`${c}scavenging&cave_id=${r}&gold=${o}`),s(_(),(v||(v=u(),n(f,v)),s("",v),v))}}export default function(){!function(){const t=sendRequest
i(t)&&(sendRequest=k(t))}(),function(){const n=t("multiplier_count")
n&&$(n)}()}
//# sourceMappingURL=scavenging-9126e80b.js.map
