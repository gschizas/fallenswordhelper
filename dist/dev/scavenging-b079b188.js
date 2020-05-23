import{A as t,U as n,h as e,v as o,f as s,C as a,I as c,D as r,a5 as i,ce as u,am as f,l as m,p as l,q as d}from"./calfSystem-0e5d6faf.js"
import{n as p}from"./numberIsNaN-a4c8282b.js"
import"./toLowerCase-adcc7aa6.js"
import{a as g}from"./alpha-3a7052f5.js"
import"./closest-8e8851e4.js"
import{c as b}from"./closestTable-0a822526.js"
function h(t,n,e){a("",t)
const o=Number(e.value)
p(o)||0===o||function(t,n,e){const o=c(r(n)),s=Math.floor(o/e).toString()
a(`&nbsp;&nbsp;Max: ${s} times`,t)}(t,n,o)}function $(t,n,e){t&&h(t,n,e)}function v(a){!function(t){b(t).removeAttribute("width")}(a),function(t,n,e){const a=o($,t,n,e)
a(),s(e,"keyup",a)}(function(t){const o=n()
return e(t.parentNode,o),o}(a),t("statbar-gold"),t("gold"))}let j
function N(t,n){const e=n.match(/>([^<]+)</)[1]
return t[e]=(t[e]||0)+1,t}function q(t,n){return g(t[0],n[0])}function I(t){return`<br>${t[1]} ${t[0]}(s), `}function M(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${d(n).sort(q).map(I).join("")}`}function S(){let n=""
const e=t("scavenge_results")
if(e){const t=e.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?`Victories: ${n.length}`:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?`, Defeated: ${n.length}`:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return M(n)}(t)}return n}function _(t){return function(n,o,s){t(n,o,s),i("lastScavPage",`${u}scavenging&cave_id=${s}&gold=${o}`),a(S(),(j||(j=m(),e(l,j)),a("",j),j))}}export default function(){!function(){const t=sendRequest
f(t)&&(sendRequest=_(t))}(),function(){const n=t("multiplier_count")
n&&v(n)}()}
//# sourceMappingURL=scavenging-b079b188.js.map
