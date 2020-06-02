import{w as s,o as a,p as e,i as t,M as n,aP as o,s as r,g as i,O as l,b3 as c,z as m}from"./calfSystem-dec5e071.js"
import"./dialogMsg-1ae9be91.js"
import"./closest-d88a3ae2.js"
import{c as f}from"./closestTable-290574cb.js"
import{d as p}from"./dialog-b7388abb.js"
function d(s){const a=c(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&m('<span class="fshGreen">Taken</span>',f(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(l)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-a3af4c12.js.map
