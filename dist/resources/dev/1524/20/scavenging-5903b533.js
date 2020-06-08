import{y as t,f as n,t as o,e,A as s,B as a,Z as r,bH as c,aj as i,l as u,p as f,m}from"./calfSystem-a2862afc.js"
import{n as l}from"./numberIsNaN-77d06981.js"
import"./toLowerCase-2574a84c.js"
import{i as d}from"./intValue-8b673ab3.js"
import{a as p}from"./alpha-557396ad.js"
import{c as b}from"./createSpan-b8f0a31d.js"
import"./closest-75b5e3c5.js"
import{c as g}from"./closestTable-89a74d0f.js"
function h(t,n,o){s("",t)
const e=Number(o.value)
l(e)||0===e||function(t,n,o){const e=d(a(n)),r=Math.floor(e/o).toString()
s(`&nbsp;&nbsp;Max: ${r} times`,t)}(t,n,e)}function j(t,n,o){t&&h(t,n,o)}function $(s){!function(t){g(t).removeAttribute("width")}(s),function(t,n,s){const a=o(j,t,n,s)
a(),e(s,"keyup",a)}(function(t){const o=b()
return n(t.parentNode,o),o}(s),t("statbar-gold"),t("gold"))}let v
function N(t,n){const o=n.match(/>([^<]+)</)[1]
return t[o]=(t[o]||0)+1,t}function S(t,n){return p(t[0],n[0])}function y(t){return`<br>${t[1]} ${t[0]}(s), `}function M(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${m(n).sort(S).map(y).join("")}`}function _(){let n=""
const o=t("scavenge_results")
if(o){const t=o.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?"Victories: "+n.length:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?", Defeated: "+n.length:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return M(n)}(t)}return n}function q(t){return function(o,e,a){t(o,e,a),r("lastScavPage",`${c}scavenging&cave_id=${a}&gold=${e}`),s(_(),(v||(v=u(),n(f,v)),s("",v),v))}}export default function(){!function(){const t=sendRequest
i(t)&&(sendRequest=q(t))}(),function(){const n=t("multiplier_count")
n&&$(n)}()}
//# sourceMappingURL=scavenging-5903b533.js.map
