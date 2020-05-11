import{z as s,o as a,p as e,i as t,R as n,a_ as o,v as r,g as f,Y as i,bq as c,C as l}from"./calfSystem-99da704d.js"
import"./dialogMsg-150fe33a.js"
import"./closest-5dc907d7.js"
import{c as m}from"./closestTable-f11f74cf.js"
import{d}from"./dialog-f09c5ef7.js"
function p(s){const a=c(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&l('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(p).then(d)).then(r(g,a))}var t
"sendLink"===a.className&&f("img",e).forEach(i)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-b9291e59.js.map
