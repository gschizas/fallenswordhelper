import{A as t,T as n,h as o,v as s,f as e,C as c,I as a,D as r,a4 as i,c5 as u,al as f,l as m,p as l,q as d}from"./calfSystem-4f7c0235.js"
import{n as p}from"./numberIsNaN-c62a2787.js"
import"./toLowerCase-5a0aca7f.js"
import{a as g}from"./alpha-42a79582.js"
import"./closest-c4802fbd.js"
import{c as b}from"./closestTable-3222a25a.js"
function h(t,n,o){c("",t)
const s=Number(o.value)
p(s)||0===s||function(t,n,o){const s=a(r(n)),e=Math.floor(s/o).toString()
c(`&nbsp;&nbsp;Max: ${e} times`,t)}(t,n,s)}function $(t,n,o){t&&h(t,n,o)}function v(c){!function(t){b(t).removeAttribute("width")}(c),function(t,n,o){const c=s($,t,n,o)
c(),e(o,"keyup",c)}(function(t){const s=n()
return o(t.parentNode,s),s}(c),t("statbar-gold"),t("gold"))}let j
function N(t,n){const o=n.match(/>([^<]+)</)[1]
return t[o]=(t[o]||0)+1,t}function q(t,n){return g(t[0],n[0])}function I(t){return`<br>${t[1]} ${t[0]}(s), `}function M(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${d(n).sort(q).map(I).join("")}`}function S(){let n=""
const o=t("scavenge_results")
if(o){const t=o.innerHTML
n+=function(t){const n=t.match(/victorious/g)
return n?`Victories: ${n.length}`:""}(t),n+=function(t){const n=t.match(/defeated/g)
return n?`, Defeated: ${n.length}`:""}(t),n+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return M(n)}(t)}return n}function T(t){return function(n,s,e){t(n,s,e),i("lastScavPage",`${u}scavenging&cave_id=${e}&gold=${s}`),c(S(),(j||(j=m(),o(l,j)),c("",j),j))}}export default function(){!function(){const t=sendRequest
f(t)&&(sendRequest=T(t))}(),function(){const n=t("multiplier_count")
n&&v(n)}()}
//# sourceMappingURL=scavenging-134a70a5.js.map
