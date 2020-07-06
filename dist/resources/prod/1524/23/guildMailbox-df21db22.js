import{x as s,o as a,p as e,i as t,C as n,ax as o,t as r,g as i,Q as l,b2 as c,A as f}from"./calfSystem-019de1cf.js"
import"./dialogMsg-16e7e1c1.js"
import"./closest-5107b89a.js"
import{c as m}from"./closestTable-2df6aea6.js"
import{d as p}from"./dialog-2e17f157.js"
function d(s){const a=c(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(l)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-df21db22.js.map
