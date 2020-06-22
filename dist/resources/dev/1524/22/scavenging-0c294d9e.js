import{y as t,h as n,f as e,t as o,A as s,B as c,Z as r,bI as a,aj as i,m as u,p as f,e as m}from"./calfSystem-4cc738f8.js"
import{n as l}from"./numberIsNaN-1f5d9185.js"
import"./toLowerCase-e8c3179d.js"
import{i as d}from"./intValue-209ea1ab.js"
import{a as p}from"./alpha-ded7f564.js"
import{c as b}from"./createSpan-273eaa7e.js"
import"./closest-b21303d7.js"
import{c as g}from"./closestTable-6d07ec05.js"
function h(t,n,e){s("",t)
const o=Number(e.value)
l(o)||0===o||function(t,n,e){const o=d(c(n)),r=Math.floor(o/e).toString()
s(`&nbsp;&nbsp;Max: ${r} times`,t)}(t,n,o)}function j(t,n,e){t&&h(t,n,e)}function $(s){!function(t){g(t).removeAttribute("width")}(s),function(t,n,s){const c=o(j,t,n,s)
c(),e(s,"keyup",c)}(function(t){const e=b()
return n(t.parentNode,e),e}(s),t("statbar-gold"),t("gold"))}let v
function N(t,n){const e=n.match(/>([^<]+)</)[1]
return t[e]=(t[e]||0)+1,t}function S(t,n){return p(t[0],n[0])}function y(t){return`<br>${t[1]} ${t[0]}(s), `}function I(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${m(n).sort(S).map(y).join("")}`}function M(){let n=""
const e=t("scavenge_results")
if(e){const t=e.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?"Victories: "+n.length:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?", Defeated: "+n.length:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return I(n)}(t)}return n}function _(t){return function(e,o,c){t(e,o,c),r("lastScavPage",`${a}scavenging&cave_id=${c}&gold=${o}`),s(M(),(v||(v=u(),n(f,v)),s("",v),v))}}export default function(){!function(){const t=sendRequest
i(t)&&(sendRequest=_(t))}(),function(){const n=t("multiplier_count")
n&&$(n)}()}
//# sourceMappingURL=scavenging-0c294d9e.js.map
