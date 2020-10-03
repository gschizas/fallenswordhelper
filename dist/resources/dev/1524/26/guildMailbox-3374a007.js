import{x as s,o as a,p as e,i as t,C as n,aB as o,t as r,g as f,Q as i,b9 as l,A as c}from"./calfSystem-4991bf5b.js"
import"./dialogMsg-b49f78a4.js"
import"./closest-c2515a48.js"
import{c as m}from"./closestTable-f07eb75c.js"
import{d as p}from"./dialog-e2d24ff9.js"
function d(s){const a=l(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&c('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&f("img",e).forEach(i)}function u(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}export default u
//# sourceMappingURL=guildMailbox-3374a007.js.map
