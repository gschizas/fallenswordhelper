import{z as t,S as n,f as e,u as o,e as s,B as c,H as r,C as a,a3 as u,c9 as i,ak as f,k as m,p as l,n as d}from"./calfSystem-371c414c.js"
import{n as p}from"./numberIsNaN-987e3021.js"
import"./toLowerCase-08111a24.js"
import{a as g}from"./alpha-9e71f7c7.js"
import"./closest-d5dda5d9.js"
import{c as b}from"./closestTable-b335e246.js"
function h(t,n,e){c("",t)
const o=Number(e.value)
p(o)||0===o||function(t,n,e){const o=r(a(n)),s=Math.floor(o/e).toString()
c(`&nbsp;&nbsp;Max: ${s} times`,t)}(t,n,o)}function $(t,n,e){t&&h(t,n,e)}function j(c){!function(t){b(t).removeAttribute("width")}(c),function(t,n,e){const c=o($,t,n,e)
c(),s(e,"keyup",c)}(function(t){const o=n()
return e(t.parentNode,o),o}(c),t("statbar-gold"),t("gold"))}let v
function N(t,n){const e=n.match(/>([^<]+)</)[1]
return t[e]=(t[e]||0)+1,t}function S(t,n){return g(t[0],n[0])}function k(t){return`<br>${t[1]} ${t[0]}(s), `}function M(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${d(n).sort(S).map(k).join("")}`}function _(){let n=""
const e=t("scavenge_results")
if(e){const t=e.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?"Victories: "+n.length:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?", Defeated: "+n.length:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return M(n)}(t)}return n}function q(t){return function(n,o,s){t(n,o,s),u("lastScavPage",`${i}scavenging&cave_id=${s}&gold=${o}`),c(_(),(v||(v=m(),e(l,v)),c("",v),v))}}export default function(){!function(){const t=sendRequest
f(t)&&(sendRequest=q(t))}(),function(){const n=t("multiplier_count")
n&&j(n)}()}
//# sourceMappingURL=scavenging-5baea374.js.map
