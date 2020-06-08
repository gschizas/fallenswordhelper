import{y as t,f as n,t as e,e as o,A as s,B as c,Y as a,bA as r,ah as i,l as u,p as f,m}from"./calfSystem-03970067.js"
import{n as l}from"./numberIsNaN-b19dc958.js"
import"./toLowerCase-5a7ad345.js"
import{i as p}from"./intValue-0d844fc4.js"
import{a as d}from"./alpha-bba33c85.js"
import{c as b}from"./createSpan-3c9a32c0.js"
import"./closest-2eae4a84.js"
import{c as g}from"./closestTable-0aec5776.js"
function h(t,n,e){s("",t)
const o=Number(e.value)
l(o)||0===o||function(t,n,e){const o=p(c(n)),a=Math.floor(o/e).toString()
s(`&nbsp;&nbsp;Max: ${a} times`,t)}(t,n,o)}function j(t,n,e){t&&h(t,n,e)}function $(s){!function(t){g(t).removeAttribute("width")}(s),function(t,n,s){const c=e(j,t,n,s)
c(),o(s,"keyup",c)}(function(t){const e=b()
return n(t.parentNode,e),e}(s),t("statbar-gold"),t("gold"))}let v
function N(t,n){const e=n.match(/>([^<]+)</)[1]
return t[e]=(t[e]||0)+1,t}function S(t,n){return d(t[0],n[0])}function y(t){return`<br>${t[1]} ${t[0]}(s), `}function A(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${m(n).sort(S).map(y).join("")}`}function M(){let n=""
const e=t("scavenge_results")
if(e){const t=e.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?"Victories: "+n.length:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?", Defeated: "+n.length:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return A(n)}(t)}return n}function _(t){return function(e,o,c){t(e,o,c),a("lastScavPage",`${r}scavenging&cave_id=${c}&gold=${o}`),s(M(),(v||(v=u(),n(f,v)),s("",v),v))}}export default function(){!function(){const t=sendRequest
i(t)&&(sendRequest=_(t))}(),function(){const n=t("multiplier_count")
n&&$(n)}()}
//# sourceMappingURL=scavenging-58049b17.js.map
