import{x as s,o as a,p as t,i as e,C as n,ax as o,t as r,g as c,Q as i,b4 as l,A as f}from"./calfSystem-019a589c.js"
import"./dialogMsg-9241492c.js"
import"./closest-d8e60c46.js"
import{c as m}from"./closestTable-b1fa1c92.js"
import{d as p}from"./dialog-ca00f6b8.js"
function d(s){const a=l(s)
let t={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(t={r:0,m:""}),t}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const t=a.parentNode.href;(e=t,o(e).then(d).then(p)).then(r(g,a))}var e
"sendLink"===a.className&&c("img",t).forEach(i)}function u(){s()||(a(t,h),e(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}export default u
//# sourceMappingURL=guildMailbox-09f4e034.js.map
