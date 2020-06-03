import{w as s,o as a,p as e,i as t,M as n,aP as o,s as r,g as i,O as c,b5 as l,z as f}from"./calfSystem-57340987.js"
import"./dialogMsg-e1203629.js"
import"./closest-f4291115.js"
import{c as m}from"./closestTable-7d6c0bc6.js"
import{d as p}from"./dialog-bc1710e0.js"
function d(s){const a=l(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(c)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-50031230.js.map
