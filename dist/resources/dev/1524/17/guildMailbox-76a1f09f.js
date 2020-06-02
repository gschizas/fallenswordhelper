import{w as s,o as a,p as e,i as t,N as n,aR as o,s as r,g as c,P as i,ba as l,z as f}from"./calfSystem-1c103624.js"
import"./dialogMsg-d0fce5cd.js"
import"./closest-a4273a71.js"
import{c as m}from"./closestTable-67ab97b7.js"
import{d as p}from"./dialog-5bdfcc8e.js"
function d(s){const a=l(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&c("img",e).forEach(i)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-76a1f09f.js.map
