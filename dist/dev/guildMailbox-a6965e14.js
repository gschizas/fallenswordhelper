import{z as s,o as a,p as e,i as t,S as n,a$ as o,v as r,g as i,Z as l,bv as f,C as c}from"./calfSystem-94018cd0.js"
import"./dialogMsg-22b0e625.js"
import"./closest-5434d1b1.js"
import{c as m}from"./closestTable-8f564755.js"
import{d as p}from"./dialog-9f0f160e.js"
function d(s){const a=f(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&c('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(l)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-a6965e14.js.map
