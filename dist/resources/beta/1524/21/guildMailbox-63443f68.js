import{x as s,o as e,p as a,i as t,C as n,ax as o,t as r,g as i,Q as l,b4 as c,A as m}from"./calfSystem-89b939c8.js"
import"./dialogMsg-d061ece2.js"
import"./closest-e1837d80.js"
import{c as f}from"./closestTable-7eb87359.js"
import{d as p}from"./dialog-7eea8a00.js"
function d(s){const e=c(s)
let a={r:1,m:e}
return"Item was transferred to the guild store!"===e&&(a={r:0,m:""}),a}function g(s,e){0===e.r&&m('<span class="fshGreen">Taken</span>',f(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:e}=s
if("IMG"===e.tagName){s.preventDefault()
const a=e.parentNode.href;(t=a,o(t).then(d).then(p)).then(r(g,e))}var t
"sendLink"===e.className&&i("img",a).forEach(l)}export default function(){s()||(e(a,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-63443f68.js.map
