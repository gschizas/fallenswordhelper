import{x as s,o as e,p as a,i as t,C as n,au as o,t as r,g as i,P as l,av as c,A as f}from"./calfSystem-7aee5245.js"
import{c as m}from"./closestTable-08c8eaf4.js"
import{d as p}from"./dialog-d161529e.js"
import"./closest-77701dcf.js"
import"./dialogMsg-844edf4e.js"
function d(s){const e=c(s)
let a={r:1,m:e}
return"Item was transferred to the guild store!"===e&&(a={r:0,m:""}),a}function g(s,e){0===e.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:e}=s
if("IMG"===e.tagName){s.preventDefault()
const a=e.parentNode.href;(t=a,o(t).then(d).then(p)).then(r(g,e))}var t
"sendLink"===e.className&&i("img",a).forEach(l)}function u(){s()||(e(a,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}export default u
//# sourceMappingURL=guildMailbox-56f725c2.js.map
