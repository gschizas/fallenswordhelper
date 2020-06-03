import{w as s,o as a,p as e,i as t,M as n,aP as o,s as r,g as i,O as l,b3 as c,z as f}from"./calfSystem-8b6534a5.js"
import"./dialogMsg-311d8a0e.js"
import"./closest-92f48152.js"
import{c as m}from"./closestTable-af41867c.js"
import{d as p}from"./dialog-3c03bbb1.js"
function d(s){const a=c(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(l)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-a62b3290.js.map
