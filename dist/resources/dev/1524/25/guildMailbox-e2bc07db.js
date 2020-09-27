import{x as s,o as a,p as t,i as e,C as n,aB as o,t as r,g as c,Q as i,b9 as l,A as f}from"./calfSystem-69dd5601.js"
import"./dialogMsg-1f890a82.js"
import"./closest-8d8d60b3.js"
import{c as m}from"./closestTable-332ccc9b.js"
import{d}from"./dialog-294b8a9c.js"
function p(s){const a=l(s)
let t={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(t={r:0,m:""}),t}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const t=a.parentNode.href;(e=t,o(e).then(p).then(d)).then(r(g,a))}var e
"sendLink"===a.className&&c("img",t).forEach(i)}function u(){s()||(a(t,h),e(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}export default u
//# sourceMappingURL=guildMailbox-e2bc07db.js.map
