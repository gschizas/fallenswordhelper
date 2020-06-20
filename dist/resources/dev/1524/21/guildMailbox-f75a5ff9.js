import{x as s,o as e,p as a,i as t,C as n,aB as o,t as r,g as c,R as i,b9 as l,A as m}from"./calfSystem-9c7241dc.js"
import"./dialogMsg-b559bd6b.js"
import"./closest-eb66b280.js"
import{c as f}from"./closestTable-98acc63e.js"
import{d as p}from"./dialog-be45be25.js"
function d(s){const e=l(s)
let a={r:1,m:e}
return"Item was transferred to the guild store!"===e&&(a={r:0,m:""}),a}function b(s,e){0===e.r&&m('<span class="fshGreen">Taken</span>',f(s).nextElementSibling.rows[0].cells[0])}function g(s){const{target:e}=s
if("IMG"===e.tagName){s.preventDefault()
const a=e.parentNode.href;(t=a,o(t).then(d).then(p)).then(r(b,e))}var t
"sendLink"===e.className&&c("img",a).forEach(i)}export default function(){s()||(e(a,g),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-f75a5ff9.js.map
