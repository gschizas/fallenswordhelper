import{x as s,o as a,p as e,i as t,C as n,ax as o,t as r,g as i,P as l,b1 as c,A as f}from"./calfSystem-57628ebe.js"
import"./dialogMsg-920f7637.js"
import"./closest-14c30e26.js"
import{c as m}from"./closestTable-15071c6a.js"
import{d as p}from"./dialog-1967d894.js"
function d(s){const a=c(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(l)}function u(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}export default u
//# sourceMappingURL=guildMailbox-7c7786c8.js.map
