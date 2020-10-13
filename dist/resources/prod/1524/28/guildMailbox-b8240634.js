import{x as s,o as a,p as e,i as t,C as n,ax as o,t as r,g as i,P as l,b1 as f,A as c}from"./calfSystem-a5da5210.js"
import"./dialogMsg-8ea305bd.js"
import"./closest-9ef1a6fc.js"
import{c as m}from"./closestTable-5b922600.js"
import{d as p}from"./dialog-a12ad7bf.js"
function d(s){const a=f(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&c('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(l)}function u(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}export default u
//# sourceMappingURL=guildMailbox-b8240634.js.map
