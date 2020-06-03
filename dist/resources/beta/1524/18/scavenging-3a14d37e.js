import{x as t,f as n,s as o,e,z as s,A as r,W as c,bL as a,ag as i,k as u,p as f,l as m}from"./calfSystem-4197cc22.js"
import{n as l}from"./numberIsNaN-1db4e673.js"
import"./toLowerCase-1fa49c12.js"
import{i as p}from"./intValue-202eff7d.js"
import{a as d}from"./alpha-875d8a68.js"
import{c as g}from"./createSpan-537a8929.js"
import"./closest-5218baf6.js"
import{c as b}from"./closestTable-31439620.js"
function h(t,n,o){s("",t)
const e=Number(o.value)
l(e)||0===e||function(t,n,o){const e=p(r(n)),c=Math.floor(e/o).toString()
s(`&nbsp;&nbsp;Max: ${c} times`,t)}(t,n,e)}function j(t,n,o){t&&h(t,n,o)}function $(s){!function(t){b(t).removeAttribute("width")}(s),function(t,n,s){const r=o(j,t,n,s)
r(),e(s,"keyup",r)}(function(t){const o=g()
return n(t.parentNode,o),o}(s),t("statbar-gold"),t("gold"))}let v
function N(t,n){const o=n.match(/>([^<]+)</)[1]
return t[o]=(t[o]||0)+1,t}function S(t,n){return d(t[0],n[0])}function x(t){return`<br>${t[1]} ${t[0]}(s), `}function L(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${m(n).sort(S).map(x).join("")}`}function M(){let n=""
const o=t("scavenge_results")
if(o){const t=o.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?"Victories: "+n.length:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?", Defeated: "+n.length:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return L(n)}(t)}return n}function _(t){return function(o,e,r){t(o,e,r),c("lastScavPage",`${a}scavenging&cave_id=${r}&gold=${e}`),s(M(),(v||(v=u(),n(f,v)),s("",v),v))}}export default function(){!function(){const t=sendRequest
i(t)&&(sendRequest=_(t))}(),function(){const n=t("multiplier_count")
n&&$(n)}()}
//# sourceMappingURL=scavenging-3a14d37e.js.map
