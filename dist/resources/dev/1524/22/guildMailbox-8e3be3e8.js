import{x as s,o as a,p as e,i as t,C as n,aB as o,t as r,g as c,R as i,b9 as l,A as f}from"./calfSystem-4cc738f8.js"
import"./dialogMsg-d224def3.js"
import"./closest-b21303d7.js"
import{c as d}from"./closestTable-6d07ec05.js"
import{d as m}from"./dialog-dabd10c2.js"
function p(s){const a=l(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',d(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(p).then(m)).then(r(g,a))}var t
"sendLink"===a.className&&c("img",e).forEach(i)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-8e3be3e8.js.map
