import{y as s,o as a,p as e,i as t,Q as n,aZ as o,u as r,g as i,X as l,bp as c,B as m}from"./calfSystem-371c414c.js"
import"./dialogMsg-33712041.js"
import"./closest-d5dda5d9.js"
import{c as f}from"./closestTable-b335e246.js"
import{d as p}from"./dialog-3e1a0a78.js"
function d(s){const a=c(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&m('<span class="fshGreen">Taken</span>',f(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(l)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-1d4626fe.js.map
