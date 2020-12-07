import{x as s,o as e,p as a,i as t,C as n,aB as o,t as r,g as i,Q as l,b8 as c,A as f}from"./calfSystem-54df10e3.js"
import"./dialogMsg-27e2dc98.js"
import"./closest-3bdef2f3.js"
import{c as m}from"./closestTable-15612c09.js"
import{d}from"./dialog-81b3293d.js"
function p(s){const e=c(s)
let a={r:1,m:e}
return"Item was transferred to the guild store!"===e&&(a={r:0,m:""}),a}function g(s,e){0===e.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:e}=s
if("IMG"===e.tagName){s.preventDefault()
const a=e.parentNode.href;(t=a,o(t).then(p).then(d)).then(r(g,e))}var t
"sendLink"===e.className&&i("img",a).forEach(l)}function u(){s()||(e(a,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}export default u
//# sourceMappingURL=guildMailbox-fa27b429.js.map
