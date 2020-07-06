import{x as s,o as e,p as a,i as t,C as n,ax as o,t as r,g as i,Q as c,b4 as l,A as f}from"./calfSystem-34fcd691.js"
import"./dialogMsg-16e7e1c1.js"
import"./closest-5107b89a.js"
import{c as m}from"./closestTable-26bc0e79.js"
import{d as p}from"./dialog-2e17f157.js"
function d(s){const e=l(s)
let a={r:1,m:e}
return"Item was transferred to the guild store!"===e&&(a={r:0,m:""}),a}function g(s,e){0===e.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:e}=s
if("IMG"===e.tagName){s.preventDefault()
const a=e.parentNode.href;(t=a,o(t).then(d).then(p)).then(r(g,e))}var t
"sendLink"===e.className&&i("img",a).forEach(c)}export default function(){s()||(e(a,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-ff060640.js.map
