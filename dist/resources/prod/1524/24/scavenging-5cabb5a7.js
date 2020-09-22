import{y as t,h as n,f as e,t as o,A as s,B as c,Y as r,bB as a,ah as i,m as u,p as f,e as m}from"./calfSystem-ec854151.js"
import{n as l}from"./numberIsNaN-00e0daaf.js"
import"./toLowerCase-2f55d839.js"
import{i as p}from"./intValue-44683b42.js"
import{a as d}from"./alpha-fc758c41.js"
import{c as b}from"./createSpan-3f02730c.js"
import"./closest-d8e60c46.js"
import{c as g}from"./closestTable-c0bca8b3.js"
function h(t,n,e){s("",t)
const o=Number(e.value)
l(o)||0===o||function(t,n,e){const o=p(c(n)),r=Math.floor(o/e).toString()
s(`&nbsp;&nbsp;Max: ${r} times`,t)}(t,n,o)}function j(t,n,e){t&&h(t,n,e)}function $(s){!function(t){g(t).removeAttribute("width")}(s),function(t,n,s){const c=o(j,t,n,s)
c(),e(s,"keyup",c)}(function(t){const e=b()
return n(t.parentNode,e),e}(s),t("statbar-gold"),t("gold"))}let v
function N(t,n){const e=n.match(/>([^<]+)</)[1]
return t[e]=(t[e]||0)+1,t}function S(t,n){return d(t[0],n[0])}function y(t){return`<br>${t[1]} ${t[0]}(s), `}function M(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${m(n).sort(S).map(y).join("")}`}function _(){let n=""
const e=t("scavenge_results")
if(e){const t=e.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?"Victories: "+n.length:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?", Defeated: "+n.length:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return M(n)}(t)}return n}function q(t){return function(e,o,c){t(e,o,c),r("lastScavPage",`${a}scavenging&cave_id=${c}&gold=${o}`),s(_(),(v||(v=u(),n(f,v)),s("",v),v))}}function w(){!function(){const t=sendRequest
i(t)&&(sendRequest=q(t))}(),function(){const n=t("multiplier_count")
n&&$(n)}()}export default w
//# sourceMappingURL=scavenging-5cabb5a7.js.map
