import{y as t,h as n,f as e,t as o,A as s,B as c,Y as r,bB as a,ah as i,m as u,p as f,e as m}from"./calfSystem-019de1cf.js"
import{n as l}from"./numberIsNaN-cb2409eb.js"
import"./toLowerCase-dda30e6b.js"
import{i as d}from"./intValue-0e84cdad.js"
import{a as p}from"./alpha-ec0cb412.js"
import{c as b}from"./createSpan-c11958c4.js"
import"./closest-5107b89a.js"
import{c as g}from"./closestTable-2df6aea6.js"
function h(t,n,e){s("",t)
const o=Number(e.value)
l(o)||0===o||function(t,n,e){const o=d(c(n)),r=Math.floor(o/e).toString()
s(`&nbsp;&nbsp;Max: ${r} times`,t)}(t,n,o)}function j(t,n,e){t&&h(t,n,e)}function $(s){!function(t){g(t).removeAttribute("width")}(s),function(t,n,s){const c=o(j,t,n,s)
c(),e(s,"keyup",c)}(function(t){const e=b()
return n(t.parentNode,e),e}(s),t("statbar-gold"),t("gold"))}let v
function N(t,n){const e=n.match(/>([^<]+)</)[1]
return t[e]=(t[e]||0)+1,t}function S(t,n){return p(t[0],n[0])}function y(t){return`<br>${t[1]} ${t[0]}(s), `}function M(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${m(n).sort(S).map(y).join("")}`}function _(){let n=""
const e=t("scavenge_results")
if(e){const t=e.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?"Victories: "+n.length:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?", Defeated: "+n.length:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return M(n)}(t)}return n}function q(t){return function(e,o,c){t(e,o,c),r("lastScavPage",`${a}scavenging&cave_id=${c}&gold=${o}`),s(_(),(v||(v=u(),n(f,v)),s("",v),v))}}export default function(){!function(){const t=sendRequest
i(t)&&(sendRequest=q(t))}(),function(){const n=t("multiplier_count")
n&&$(n)}()}
//# sourceMappingURL=scavenging-48c05e49.js.map
