import{x as s,o as a,p as t,i as e,C as n,ax as o,t as r,g as i,Q as l,ay as c,A as f}from"./calfSystem-26bcf570.js"
import{c as m}from"./closestTable-fd04a72b.js"
import{d as p}from"./dialog-2c5b535b.js"
import"./closest-331833f9.js"
import"./dialogMsg-0a235932.js"
function d(s){const a=c(s)
let t={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(t={r:0,m:""}),t}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const t=a.parentNode.href;(e=t,o(e).then(d).then(p)).then(r(g,a))}var e
"sendLink"===a.className&&i("img",t).forEach(l)}function u(){s()||(a(t,h),e(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}export default u
//# sourceMappingURL=guildMailbox-74609ad7.js.map
