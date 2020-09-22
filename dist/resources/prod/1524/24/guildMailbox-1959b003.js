import{x as s,o as a,p as e,i as t,C as n,ax as o,t as r,g as c,Q as i,b2 as l,A as f}from"./calfSystem-ec854151.js"
import"./dialogMsg-9241492c.js"
import"./closest-d8e60c46.js"
import{c as m}from"./closestTable-c0bca8b3.js"
import{d as p}from"./dialog-ca00f6b8.js"
function d(s){const a=l(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&c("img",e).forEach(i)}function u(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}export default u
//# sourceMappingURL=guildMailbox-1959b003.js.map
