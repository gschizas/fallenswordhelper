import{x as t,f as n,s as e,e as o,z as s,A as c,W as a,bG as r,ag as i,k as u,p as f,l as m}from"./calfSystem-dec5e071.js"
import{n as l}from"./numberIsNaN-ea515379.js"
import"./toLowerCase-1ea9a651.js"
import{i as d}from"./intValue-8ad0a3ce.js"
import{a as p}from"./alpha-55be3c2d.js"
import{c as g}from"./createSpan-660731dc.js"
import"./closest-d88a3ae2.js"
import{c as b}from"./closestTable-290574cb.js"
function h(t,n,e){s("",t)
const o=Number(e.value)
l(o)||0===o||function(t,n,e){const o=d(c(n)),a=Math.floor(o/e).toString()
s(`&nbsp;&nbsp;Max: ${a} times`,t)}(t,n,o)}function j(t,n,e){t&&h(t,n,e)}function $(s){!function(t){b(t).removeAttribute("width")}(s),function(t,n,s){const c=e(j,t,n,s)
c(),o(s,"keyup",c)}(function(t){const e=g()
return n(t.parentNode,e),e}(s),t("statbar-gold"),t("gold"))}let v
function N(t,n){const e=n.match(/>([^<]+)</)[1]
return t[e]=(t[e]||0)+1,t}function S(t,n){return p(t[0],n[0])}function x(t){return`<br>${t[1]} ${t[0]}(s), `}function M(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${m(n).sort(S).map(x).join("")}`}function _(){let n=""
const e=t("scavenge_results")
if(e){const t=e.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?"Victories: "+n.length:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?", Defeated: "+n.length:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return M(n)}(t)}return n}function k(t){return function(e,o,c){t(e,o,c),a("lastScavPage",`${r}scavenging&cave_id=${c}&gold=${o}`),s(_(),(v||(v=u(),n(f,v)),s("",v),v))}}export default function(){!function(){const t=sendRequest
i(t)&&(sendRequest=k(t))}(),function(){const n=t("multiplier_count")
n&&$(n)}()}
//# sourceMappingURL=scavenging-8e087e44.js.map
