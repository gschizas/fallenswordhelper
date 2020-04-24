import{z as s,o as a,p as e,i as t,R as n,a_ as o,v as r,g as c,Y as i,bq as l,C as f}from"./calfSystem-c91e004c.js"
import"./dialogMsg-b1aec560.js"
import"./closest-fde5373b.js"
import{c as m}from"./closestTable-593e5532.js"
import{d as p}from"./dialog-caf4fb39.js"
function d(s){const a=l(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&c("img",e).forEach(i)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-508011c7.js.map
