import{x as t,f as n,s as e,e as o,z as s,A as r,X as a,bN as c,aj as i,k as u,p as f,l as m}from"./calfSystem-5545a3e6.js"
import{n as l}from"./numberIsNaN-0d2994c6.js"
import"./toLowerCase-57ae178d.js"
import{i as p}from"./intValue-02f9213d.js"
import{a as d}from"./alpha-e4543f35.js"
import{c as b}from"./createSpan-2a3ac8a5.js"
import"./closest-b938ab98.js"
import{c as g}from"./closestTable-86204b76.js"
function h(t,n,e){s("",t)
const o=Number(e.value)
l(o)||0===o||function(t,n,e){const o=p(r(n)),a=Math.floor(o/e).toString()
s(`&nbsp;&nbsp;Max: ${a} times`,t)}(t,n,o)}function j(t,n,e){t&&h(t,n,e)}function $(s){!function(t){g(t).removeAttribute("width")}(s),function(t,n,s){const r=e(j,t,n,s)
r(),o(s,"keyup",r)}(function(t){const e=b()
return n(t.parentNode,e),e}(s),t("statbar-gold"),t("gold"))}let v
function N(t,n){const e=n.match(/>([^<]+)</)[1]
return t[e]=(t[e]||0)+1,t}function S(t,n){return d(t[0],n[0])}function x(t){return`<br>${t[1]} ${t[0]}(s), `}function M(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${m(n).sort(S).map(x).join("")}`}function _(){let n=""
const e=t("scavenge_results")
if(e){const t=e.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?"Victories: "+n.length:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?", Defeated: "+n.length:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return M(n)}(t)}return n}function k(t){return function(e,o,r){t(e,o,r),a("lastScavPage",`${c}scavenging&cave_id=${r}&gold=${o}`),s(_(),(v||(v=u(),n(f,v)),s("",v),v))}}export default function(){!function(){const t=sendRequest
i(t)&&(sendRequest=k(t))}(),function(){const n=t("multiplier_count")
n&&$(n)}()}
//# sourceMappingURL=scavenging-fee58f2a.js.map
