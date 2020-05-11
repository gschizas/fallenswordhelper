import{A as t,U as n,h as e,v as o,f as s,C as c,I as r,D as a,a5 as i,ce as u,am as f,l as m,p as l,q as d}from"./calfSystem-8dc0fa4b.js"
import{n as p}from"./numberIsNaN-73f607dc.js"
import"./toLowerCase-26121da0.js"
import{a as g}from"./alpha-e6301006.js"
import"./closest-9cd85ce4.js"
import{c as b}from"./closestTable-432fe19a.js"
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
if(n)return M(n)}(t)}return n}function _(t){return function(n,o,s){t(n,o,s),i("lastScavPage",`${u}scavenging&cave_id=${s}&gold=${o}`),c(S(),(j||(j=m(),e(l,j)),c("",j),j))}}export default function(){!function(){const t=sendRequest
f(t)&&(sendRequest=_(t))}(),function(){const n=t("multiplier_count")
n&&v(n)}()}
//# sourceMappingURL=scavenging-29cb073d.js.map
