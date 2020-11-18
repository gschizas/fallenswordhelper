import{y as t,h as n,f as e,t as o,A as s,B as r,Y as c,bC as a,ah as i,m as u,p as f,e as m}from"./calfSystem-f9a27018.js"
import{n as l}from"./numberIsNaN-d1ebf732.js"
import"./toLowerCase-0a22477f.js"
import{i as d}from"./intValue-f94761c7.js"
import{a as p}from"./alpha-90aef395.js"
import{c as b}from"./createSpan-7dc30d50.js"
import"./closest-14c30e26.js"
import{c as g}from"./closestTable-d6abf02e.js"
function h(t,n,e){s("",t)
const o=Number(e.value)
l(o)||0===o||function(t,n,e){const o=d(r(n)),c=Math.floor(o/e).toString()
s(`&nbsp;&nbsp;Max: ${c} times`,t)}(t,n,o)}function j(t,n,e){t&&h(t,n,e)}function $(s){!function(t){g(t).removeAttribute("width")}(s),function(t,n,s){const r=o(j,t,n,s)
r(),e(s,"keyup",r)}(function(t){const e=b()
return n(t.parentNode,e),e}(s),t("statbar-gold"),t("gold"))}let v
function N(t,n){const e=n.match(/>([^<]+)</)[1]
return t[e]=(t[e]||0)+1,t}function S(t,n){return p(t[0],n[0])}function y(t){return`<br>${t[1]} ${t[0]}(s), `}function M(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${m(n).sort(S).map(y).join("")}`}function _(){let n=""
const e=t("scavenge_results")
if(e){const t=e.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?"Victories: "+n.length:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?", Defeated: "+n.length:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return M(n)}(t)}return n}function q(t){return function(e,o,r){t(e,o,r),c("lastScavPage",`${a}scavenging&cave_id=${r}&gold=${o}`),s(_(),(v||(v=u(),n(f,v)),s("",v),v))}}function w(){!function(){const t=sendRequest
i(t)&&(sendRequest=q(t))}(),function(){const n=t("multiplier_count")
n&&$(n)}()}export default w
//# sourceMappingURL=scavenging-240cb112.js.map
