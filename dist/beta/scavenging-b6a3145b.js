import{A as t,T as n,h as e,v as o,f as s,C as c,I as a,D as r,a4 as i,ca as u,al as f,l as m,p as l,q as d}from"./calfSystem-70c0e373.js"
import{n as p}from"./numberIsNaN-a9336482.js"
import"./toLowerCase-fa13dddd.js"
import{a as b}from"./alpha-22cde0f7.js"
import"./closest-9d6eeb1b.js"
import{c as g}from"./closestTable-aeb85a89.js"
function h(t,n,e){c("",t)
const o=Number(e.value)
p(o)||0===o||function(t,n,e){const o=a(r(n)),s=Math.floor(o/e).toString()
c(`&nbsp;&nbsp;Max: ${s} times`,t)}(t,n,o)}function $(t,n,e){t&&h(t,n,e)}function v(c){!function(t){g(t).removeAttribute("width")}(c),function(t,n,e){const c=o($,t,n,e)
c(),s(e,"keyup",c)}(function(t){const o=n()
return e(t.parentNode,o),o}(c),t("statbar-gold"),t("gold"))}let j
function N(t,n){const e=n.match(/>([^<]+)</)[1]
return t[e]=(t[e]||0)+1,t}function q(t,n){return b(t[0],n[0])}function I(t){return`<br>${t[1]} ${t[0]}(s), `}function M(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${d(n).sort(q).map(I).join("")}`}function S(){let n=""
const e=t("scavenge_results")
if(e){const t=e.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?`Victories: ${n.length}`:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?`, Defeated: ${n.length}`:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return M(n)}(t)}return n}function T(t){return function(n,o,s){t(n,o,s),i("lastScavPage",`${u}scavenging&cave_id=${s}&gold=${o}`),c(S(),(j||(j=m(),e(l,j)),c("",j),j))}}export default function(){!function(){const t=sendRequest
f(t)&&(sendRequest=T(t))}(),function(){const n=t("multiplier_count")
n&&v(n)}()}
//# sourceMappingURL=scavenging-b6a3145b.js.map
