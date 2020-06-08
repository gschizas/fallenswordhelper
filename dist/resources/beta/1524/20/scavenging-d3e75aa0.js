import{y as t,f as n,t as e,e as o,A as s,B as a,Y as r,bF as c,ah as i,l as u,p as f,m}from"./calfSystem-05554bae.js"
import{n as l}from"./numberIsNaN-d04aa9f7.js"
import"./toLowerCase-4d1a2136.js"
import{i as p}from"./intValue-f723fc88.js"
import{a as d}from"./alpha-48a506ea.js"
import{c as b}from"./createSpan-472d43ae.js"
import"./closest-a50421eb.js"
import{c as g}from"./closestTable-607ac1a3.js"
function h(t,n,e){s("",t)
const o=Number(e.value)
l(o)||0===o||function(t,n,e){const o=p(a(n)),r=Math.floor(o/e).toString()
s(`&nbsp;&nbsp;Max: ${r} times`,t)}(t,n,o)}function j(t,n,e){t&&h(t,n,e)}function $(s){!function(t){g(t).removeAttribute("width")}(s),function(t,n,s){const a=e(j,t,n,s)
a(),o(s,"keyup",a)}(function(t){const e=b()
return n(t.parentNode,e),e}(s),t("statbar-gold"),t("gold"))}let v
function N(t,n){const e=n.match(/>([^<]+)</)[1]
return t[e]=(t[e]||0)+1,t}function S(t,n){return d(t[0],n[0])}function y(t){return`<br>${t[1]} ${t[0]}(s), `}function M(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${m(n).sort(S).map(y).join("")}`}function _(){let n=""
const e=t("scavenge_results")
if(e){const t=e.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?"Victories: "+n.length:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?", Defeated: "+n.length:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return M(n)}(t)}return n}function q(t){return function(e,o,a){t(e,o,a),r("lastScavPage",`${c}scavenging&cave_id=${a}&gold=${o}`),s(_(),(v||(v=u(),n(f,v)),s("",v),v))}}export default function(){!function(){const t=sendRequest
i(t)&&(sendRequest=q(t))}(),function(){const n=t("multiplier_count")
n&&$(n)}()}
//# sourceMappingURL=scavenging-d3e75aa0.js.map
