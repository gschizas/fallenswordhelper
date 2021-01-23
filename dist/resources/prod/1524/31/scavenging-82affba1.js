import{c as t}from"./closestTable-08c8eaf4.js"
import{c as n}from"./createSpan-08d79c06.js"
import{y as e,h as o,f as s,t as r,A as c,B as a,Y as i,bp as u,aw as f,m,p as l,e as p}from"./calfSystem-7aee5245.js"
import{i as d}from"./intValue-e7ef611d.js"
import{n as g}from"./numberIsNaN-53300e34.js"
import{a as b}from"./alpha-80a926ba.js"
import"./closest-77701dcf.js"
import"./toLowerCase-51740687.js"
function h(t,n,e){c("",t)
const o=Number(e.value)
g(o)||0===o||function(t,n,e){const o=d(a(n)),s=Math.floor(o/e).toString()
c(`&nbsp;&nbsp;Max: ${s} times`,t)}(t,n,o)}function $(t,n,e){t&&h(t,n,e)}function j(c){!function(n){t(n).removeAttribute("width")}(c),function(t,n,e){const o=r($,t,n,e)
o(),s(e,"keyup",o)}(function(t){const e=n()
return o(t.parentNode,e),e}(c),e("statbar-gold"),e("gold"))}let v
function N(t,n){const e=n.match(/>([^<]+)</)[1]
return t[e]=(t[e]||0)+1,t}function S(t,n){return b(t[0],n[0])}function w(t){return`<br>${t[1]} ${t[0]}(s), `}function y(t){const n=function(t){return t.reduce(N,{})}(t)
return`<br>${t.length} item(s):${p(n).sort(S).map(w).join("")}`}function M(){let t=""
const n=e("scavenge_results")
if(n){const e=n.innerHTML
t+=function(t){const n=t.match(/victorious/g)
return n?`Victories: ${n.length}`:""}(e),t+=function(t){const n=t.match(/defeated/g)
return n?`, Defeated: ${n.length}`:""}(e),t+=function(t){const n=t.match(/Item Gained: <b>[^<]+<\/b>/g)
if(n)return y(n)}(e)}return t}function _(t){return function(n,e,s){t(n,e,s),i("lastScavPage",`${u}scavenging&cave_id=${s}&gold=${e}`),c(M(),(v||(v=m(),o(l,v)),c("",v),v))}}function q(){!function(){const t=sendRequest
f(t)&&(sendRequest=_(t))}(),function(){const t=e("multiplier_count")
t&&j(t)}()}export default q
//# sourceMappingURL=scavenging-82affba1.js.map
