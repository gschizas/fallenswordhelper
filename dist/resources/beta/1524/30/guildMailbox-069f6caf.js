import{x as s,o as e,p as a,i as t,C as n,ax as o,t as r,g as i,P as l,b3 as f,A as c}from"./calfSystem-ebf4b17d.js"
import"./dialogMsg-27e2dc98.js"
import"./closest-3bdef2f3.js"
import{c as d}from"./closestTable-d46d4650.js"
import{d as m}from"./dialog-81b3293d.js"
function p(s){const e=f(s)
let a={r:1,m:e}
return"Item was transferred to the guild store!"===e&&(a={r:0,m:""}),a}function g(s,e){0===e.r&&c('<span class="fshGreen">Taken</span>',d(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:e}=s
if("IMG"===e.tagName){s.preventDefault()
const a=e.parentNode.href;(t=a,o(t).then(p).then(m)).then(r(g,e))}var t
"sendLink"===e.className&&i("img",a).forEach(l)}function u(){s()||(e(a,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}export default u
//# sourceMappingURL=guildMailbox-069f6caf.js.map
