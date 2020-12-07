import{x as s,o as a,p as e,i as t,C as n,ax as o,t as r,g as c,P as i,b1 as l,A as f}from"./calfSystem-6459f18a.js"
import"./dialogMsg-27e2dc98.js"
import"./closest-3bdef2f3.js"
import{c as m}from"./closestTable-0cc3d3c3.js"
import{d}from"./dialog-81b3293d.js"
function p(s){const a=l(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(p).then(d)).then(r(g,a))}var t
"sendLink"===a.className&&c("img",e).forEach(i)}function u(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}export default u
//# sourceMappingURL=guildMailbox-e2d1afa7.js.map
