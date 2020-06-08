import{x as s,o as a,p as e,i as t,C as n,ax as o,t as r,g as i,Q as c,b2 as f,A as l}from"./calfSystem-03970067.js"
import"./dialogMsg-9c4f0c44.js"
import{d as m}from"./dialog-d5dff1df.js"
import"./closest-2eae4a84.js"
import{c as p}from"./closestTable-0aec5776.js"
function d(s){const a=f(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&l('<span class="fshGreen">Taken</span>',p(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(m)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(c)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-20959b26.js.map
