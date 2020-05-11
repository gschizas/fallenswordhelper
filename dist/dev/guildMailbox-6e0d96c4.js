import{z as s,o as a,p as e,i as t,S as n,a$ as o,v as r,g as c,Z as i,bv as f,C as l}from"./calfSystem-8dc0fa4b.js"
import"./dialogMsg-7427fbc4.js"
import"./closest-9cd85ce4.js"
import{c as m}from"./closestTable-432fe19a.js"
import{d as p}from"./dialog-f4d2194e.js"
function d(s){const a=f(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&l('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&c("img",e).forEach(i)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-6e0d96c4.js.map
