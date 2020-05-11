import{A as t,T as n,h as o,v as e,f as s,C as c,I as r,D as a,a4 as i,c5 as u,al as f,l as m,p as l,q as d}from"./calfSystem-72fdbe97.js"
import{n as p}from"./numberIsNaN-7d89f7bf.js"
import"./toLowerCase-019d771a.js"
import{a as b}from"./alpha-583924df.js"
import"./closest-495903f5.js"
import{c as g}from"./closestTable-78e4c82b.js"
function h(t,n,o){c("",t)
const e=Number(o.value)
p(e)||0===e||function(t,n,o){const e=r(a(n)),s=Math.floor(e/o).toString()
c(`&nbsp;&nbsp;Max: ${s} times`,t)}(t,n,e)}function $(t,n,o){t&&h(t,n,o)}function v(c){!function(t){g(t).removeAttribute("width")}(c),function(t,n,o){const c=e($,t,n,o)
c(),s(o,"keyup",c)}(function(t){const e=n()
return o(t.parentNode,e),e}(c),t("statbar-gold"),t("gold"))}let j
function N(t,n){const o=n.match(/>([^<]+)</)[1]
return t[o]=(t[o]||0)+1,t}function q(t,n){return b(t[0],n[0])}function I(t){return`<br>${t[1]} ${t[0]}(s), `}function M(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${d(n).sort(q).map(I).join("")}`}function S(){let n=""
const o=t("scavenge_results")
if(o){const t=o.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?`Victories: ${n.length}`:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?`, Defeated: ${n.length}`:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return M(n)}(t)}return n}function T(t){return function(n,e,s){t(n,e,s),i("lastScavPage",`${u}scavenging&cave_id=${s}&gold=${e}`),c(S(),(j||(j=m(),o(l,j)),c("",j),j))}}export default function(){!function(){const t=sendRequest
f(t)&&(sendRequest=T(t))}(),function(){const n=t("multiplier_count")
n&&v(n)}()}
//# sourceMappingURL=scavenging-bc43490f.js.map
