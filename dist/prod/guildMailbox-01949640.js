import{z as s,o as a,p as e,i as t,R as n,a_ as o,v as r,g as i,Y as c,bo as l,C as f}from"./calfSystem-4b4fbec4.js"
import"./dialogMsg-c72266dd.js"
import"./closest-c674dae6.js"
import{c as m}from"./closestTable-6a2d8591.js"
import{d}from"./dialog-00707b06.js"
function p(s){const a=l(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(p).then(d)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(c)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-01949640.js.map
