import{y as t,h as n,f as o,t as e,A as s,B as r,Y as a,bB as c,ah as i,m as u,p as f,e as m}from"./calfSystem-2741d97b.js"
import{n as l}from"./numberIsNaN-ed994c04.js"
import"./toLowerCase-a2d79d4b.js"
import{i as d}from"./intValue-1a593541.js"
import{a as p}from"./alpha-a3cc277e.js"
import{c as b}from"./createSpan-b0f81047.js"
import"./closest-5ba11a5a.js"
import{c as g}from"./closestTable-4420f163.js"
function h(t,n,o){s("",t)
const e=Number(o.value)
l(e)||0===e||function(t,n,o){const e=d(r(n)),a=Math.floor(e/o).toString()
s(`&nbsp;&nbsp;Max: ${a} times`,t)}(t,n,e)}function j(t,n,o){t&&h(t,n,o)}function $(s){!function(t){g(t).removeAttribute("width")}(s),function(t,n,s){const r=e(j,t,n,s)
r(),o(s,"keyup",r)}(function(t){const o=b()
return n(t.parentNode,o),o}(s),t("statbar-gold"),t("gold"))}let v
function N(t,n){const o=n.match(/>([^<]+)</)[1]
return t[o]=(t[o]||0)+1,t}function S(t,n){return p(t[0],n[0])}function y(t){return`<br>${t[1]} ${t[0]}(s), `}function M(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${m(n).sort(S).map(y).join("")}`}function _(){let n=""
const o=t("scavenge_results")
if(o){const t=o.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?"Victories: "+n.length:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?", Defeated: "+n.length:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return M(n)}(t)}return n}function q(t){return function(o,e,r){t(o,e,r),a("lastScavPage",`${c}scavenging&cave_id=${r}&gold=${e}`),s(_(),(v||(v=u(),n(f,v)),s("",v),v))}}export default function(){!function(){const t=sendRequest
i(t)&&(sendRequest=q(t))}(),function(){const n=t("multiplier_count")
n&&$(n)}()}
//# sourceMappingURL=scavenging-5d6a14af.js.map
