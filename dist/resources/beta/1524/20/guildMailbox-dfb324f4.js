import{x as s,o as a,p as e,i as t,C as n,ax as o,t as r,g as i,Q as l,b4 as c,A as f}from"./calfSystem-05554bae.js"
import"./dialogMsg-08e9871c.js"
import{d as m}from"./dialog-dbf38e71.js"
import"./closest-a50421eb.js"
import{c as p}from"./closestTable-607ac1a3.js"
function d(s){const a=c(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',p(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(m)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(l)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-dfb324f4.js.map
