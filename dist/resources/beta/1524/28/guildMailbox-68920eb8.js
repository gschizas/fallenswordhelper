import{x as s,o as a,p as e,i as t,C as n,ax as o,t as r,g as f,P as i,b3 as l,A as c}from"./calfSystem-964f4fc9.js"
import"./dialogMsg-8ea305bd.js"
import"./closest-9ef1a6fc.js"
import{c as m}from"./closestTable-8e45507b.js"
import{d as p}from"./dialog-a12ad7bf.js"
function d(s){const a=l(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&c('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&f("img",e).forEach(i)}function u(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}export default u
//# sourceMappingURL=guildMailbox-68920eb8.js.map
