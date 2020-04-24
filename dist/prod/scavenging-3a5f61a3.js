import{A as t,T as n,h as e,v as o,f as s,C as c,I as r,D as a,a4 as i,c5 as u,al as f,l as m,p as l,q as d}from"./calfSystem-3956a623.js"
import{n as p}from"./numberIsNaN-c09ad043.js"
import"./toLowerCase-cc930098.js"
import{a as g}from"./alpha-308d451e.js"
import"./closest-2eae17cf.js"
import{c as b}from"./closestTable-65ce02cc.js"
function h(t,n,e){c("",t)
const o=Number(e.value)
p(o)||0===o||function(t,n,e){const o=r(a(n)),s=Math.floor(o/e).toString()
c(`&nbsp;&nbsp;Max: ${s} times`,t)}(t,n,o)}function $(t,n,e){t&&h(t,n,e)}function v(c){!function(t){b(t).removeAttribute("width")}(c),function(t,n,e){const c=o($,t,n,e)
c(),s(e,"keyup",c)}(function(t){const o=n()
return e(t.parentNode,o),o}(c),t("statbar-gold"),t("gold"))}let j
function N(t,n){const e=n.match(/>([^<]+)</)[1]
return t[e]=(t[e]||0)+1,t}function q(t,n){return g(t[0],n[0])}function I(t){return`<br>${t[1]} ${t[0]}(s), `}function M(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${d(n).sort(q).map(I).join("")}`}function S(){let n=""
const e=t("scavenge_results")
if(e){const t=e.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?`Victories: ${n.length}`:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?`, Defeated: ${n.length}`:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return M(n)}(t)}return n}function T(t){return function(n,o,s){t(n,o,s),i("lastScavPage",`${u}scavenging&cave_id=${s}&gold=${o}`),c(S(),(j||(j=m(),e(l,j)),c("",j),j))}}export default function(){!function(){const t=sendRequest
f(t)&&(sendRequest=T(t))}(),function(){const n=t("multiplier_count")
n&&v(n)}()}
//# sourceMappingURL=scavenging-3a5f61a3.js.map
