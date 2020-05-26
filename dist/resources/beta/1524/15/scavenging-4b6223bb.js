import{x as t,f as n,s as e,e as o,z as s,A as c,V as r,bV as a,a7 as i,k as u,p as f,l as m}from"./calfSystem-1262535f.js"
import{n as l}from"./numberIsNaN-e4fe1516.js"
import"./toLowerCase-0c270c29.js"
import{i as p}from"./intValue-c4584407.js"
import{a as d}from"./alpha-cdb4272d.js"
import{c as b}from"./createSpan-aa5e4be8.js"
import"./closest-20389d90.js"
import{c as g}from"./closestTable-fb9486a9.js"
function h(t,n,e){s("",t)
const o=Number(e.value)
l(o)||0===o||function(t,n,e){const o=p(c(n)),r=Math.floor(o/e).toString()
s(`&nbsp;&nbsp;Max: ${r} times`,t)}(t,n,o)}function j(t,n,e){t&&h(t,n,e)}function $(s){!function(t){g(t).removeAttribute("width")}(s),function(t,n,s){const c=e(j,t,n,s)
c(),o(s,"keyup",c)}(function(t){const e=b()
return n(t.parentNode,e),e}(s),t("statbar-gold"),t("gold"))}let v
function N(t,n){const e=n.match(/>([^<]+)</)[1]
return t[e]=(t[e]||0)+1,t}function S(t,n){return d(t[0],n[0])}function V(t){return`<br>${t[1]} ${t[0]}(s), `}function x(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${m(n).sort(S).map(V).join("")}`}function M(){let n=""
const e=t("scavenge_results")
if(e){const t=e.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?"Victories: "+n.length:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?", Defeated: "+n.length:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return x(n)}(t)}return n}function _(t){return function(e,o,c){t(e,o,c),r("lastScavPage",`${a}scavenging&cave_id=${c}&gold=${o}`),s(M(),(v||(v=u(),n(f,v)),s("",v),v))}}export default function(){!function(){const t=sendRequest
i(t)&&(sendRequest=_(t))}(),function(){const n=t("multiplier_count")
n&&$(n)}()}
//# sourceMappingURL=scavenging-4b6223bb.js.map
