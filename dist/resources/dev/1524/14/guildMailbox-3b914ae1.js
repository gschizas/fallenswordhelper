import{y as s,o as a,p as e,i as t,R as n,a_ as o,u as r,g as i,Y as c,bu as l,B as f}from"./calfSystem-d96a3efd.js"
import"./dialogMsg-da77a98e.js"
import"./closest-f6c323ce.js"
import{c as m}from"./closestTable-2bbeb9ce.js"
import{d}from"./dialog-62f3abd8.js"
function p(s){const a=l(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function u(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(p).then(d)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(c)}export default function(){s()||(a(e,u),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-3b914ae1.js.map
