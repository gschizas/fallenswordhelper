import{x as t,f as n,s as o,e,z as s,A as a,W as r,bH as c,ag as i,k as u,p as f,l as m}from"./calfSystem-8b6534a5.js"
import{n as l}from"./numberIsNaN-0a4ef3fd.js"
import"./toLowerCase-91b39a88.js"
import{i as p}from"./intValue-bb1f2246.js"
import{a as b}from"./alpha-a97dc6ad.js"
import{c as d}from"./createSpan-a256b285.js"
import"./closest-92f48152.js"
import{c as g}from"./closestTable-af41867c.js"
function h(t,n,o){s("",t)
const e=Number(o.value)
l(e)||0===e||function(t,n,o){const e=p(a(n)),r=Math.floor(e/o).toString()
s(`&nbsp;&nbsp;Max: ${r} times`,t)}(t,n,e)}function j(t,n,o){t&&h(t,n,o)}function $(s){!function(t){g(t).removeAttribute("width")}(s),function(t,n,s){const a=o(j,t,n,s)
a(),e(s,"keyup",a)}(function(t){const o=d()
return n(t.parentNode,o),o}(s),t("statbar-gold"),t("gold"))}let v
function N(t,n){const o=n.match(/>([^<]+)</)[1]
return t[o]=(t[o]||0)+1,t}function S(t,n){return b(t[0],n[0])}function x(t){return`<br>${t[1]} ${t[0]}(s), `}function M(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${m(n).sort(S).map(x).join("")}`}function _(){let n=""
const o=t("scavenge_results")
if(o){const t=o.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?"Victories: "+n.length:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?", Defeated: "+n.length:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return M(n)}(t)}return n}function k(t){return function(o,e,a){t(o,e,a),r("lastScavPage",`${c}scavenging&cave_id=${a}&gold=${e}`),s(_(),(v||(v=u(),n(f,v)),s("",v),v))}}export default function(){!function(){const t=sendRequest
i(t)&&(sendRequest=k(t))}(),function(){const n=t("multiplier_count")
n&&$(n)}()}
//# sourceMappingURL=scavenging-cc3732dd.js.map
