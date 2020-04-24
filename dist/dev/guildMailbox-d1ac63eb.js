import{z as s,o as a,p as e,i as t,S as n,a$ as o,v as r,g as c,Z as i,bv as l,C as f}from"./calfSystem-9b1fa4ca.js"
import"./dialogMsg-91ed6ec0.js"
import"./closest-75cbef2b.js"
import{c as m}from"./closestTable-435cb4b9.js"
import{d as p}from"./dialog-e9780cd9.js"
function d(s){const a=l(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&c("img",e).forEach(i)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-d1ac63eb.js.map
