import{z as t,T as n,f as e,u as o,e as s,B as c,H as r,C as a,a4 as u,cd as i,al as f,k as m,p as l,n as d}from"./calfSystem-d96a3efd.js"
import{n as b}from"./numberIsNaN-5b8bfc11.js"
import"./toLowerCase-a0540d2c.js"
import{a as p}from"./alpha-2978f86d.js"
import"./closest-f6c323ce.js"
import{c as g}from"./closestTable-2bbeb9ce.js"
function h(t,n,e){c("",t)
const o=Number(e.value)
b(o)||0===o||function(t,n,e){const o=r(a(n)),s=Math.floor(o/e).toString()
c(`&nbsp;&nbsp;Max: ${s} times`,t)}(t,n,o)}function $(t,n,e){t&&h(t,n,e)}function j(c){!function(t){g(t).removeAttribute("width")}(c),function(t,n,e){const c=o($,t,n,e)
c(),s(e,"keyup",c)}(function(t){const o=n()
return e(t.parentNode,o),o}(c),t("statbar-gold"),t("gold"))}let v
function N(t,n){const e=n.match(/>([^<]+)</)[1]
return t[e]=(t[e]||0)+1,t}function M(t,n){return p(t[0],n[0])}function S(t){return`<br>${t[1]} ${t[0]}(s), `}function T(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${d(n).sort(M).map(S).join("")}`}function _(){let n=""
const e=t("scavenge_results")
if(e){const t=e.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?"Victories: "+n.length:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?", Defeated: "+n.length:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return T(n)}(t)}return n}function k(t){return function(n,o,s){t(n,o,s),u("lastScavPage",`${i}scavenging&cave_id=${s}&gold=${o}`),c(_(),(v||(v=m(),e(l,v)),c("",v),v))}}export default function(){!function(){const t=sendRequest
f(t)&&(sendRequest=k(t))}(),function(){const n=t("multiplier_count")
n&&j(n)}()}
//# sourceMappingURL=scavenging-d07da546.js.map
