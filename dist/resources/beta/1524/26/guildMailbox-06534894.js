import{x as s,o as a,p as t,i as e,C as n,ax as o,t as r,g as i,P as f,b4 as l,A as c}from"./calfSystem-cf4d22a7.js"
import"./dialogMsg-b49f78a4.js"
import"./closest-c2515a48.js"
import{c as m}from"./closestTable-935da259.js"
import{d as p}from"./dialog-e2d24ff9.js"
function d(s){const a=l(s)
let t={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(t={r:0,m:""}),t}function g(s,a){0===a.r&&c('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const t=a.parentNode.href;(e=t,o(e).then(d).then(p)).then(r(g,a))}var e
"sendLink"===a.className&&i("img",t).forEach(f)}function u(){s()||(a(t,h),e(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}export default u
//# sourceMappingURL=guildMailbox-06534894.js.map
