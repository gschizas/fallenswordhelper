import{z as s,o as a,p as t,i as e,R as n,a_ as o,v as r,g as i,Y as f,bo as l,C as c}from"./calfSystem-4f7c0235.js"
import"./dialogMsg-2a7f845f.js"
import"./closest-c4802fbd.js"
import{c as m}from"./closestTable-3222a25a.js"
import{d as p}from"./dialog-202b3453.js"
function d(s){const a=l(s)
let t={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(t={r:0,m:""}),t}function g(s,a){0===a.r&&c('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const t=a.parentNode.href;(e=t,o(e).then(d).then(p)).then(r(g,a))}var e
"sendLink"===a.className&&i("img",t).forEach(f)}export default function(){s()||(a(t,h),e(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-6352416f.js.map
