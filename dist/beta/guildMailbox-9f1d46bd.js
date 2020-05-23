import{z as s,o as a,p as e,i as t,R as n,a_ as o,v as r,g as c,Y as i,bq as l,C as f}from"./calfSystem-2fb02284.js"
import"./dialogMsg-48629eea.js"
import"./closest-435e5cd2.js"
import{c as m}from"./closestTable-bc50301f.js"
import{d as p}from"./dialog-bdcd2acc.js"
function d(s){const a=l(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&c("img",e).forEach(i)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-9f1d46bd.js.map
