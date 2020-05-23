import{z as s,o as e,p as a,i as t,S as n,a$ as o,v as r,g as i,Z as l,bv as f,C as c}from"./calfSystem-70b0df7f.js"
import"./dialogMsg-0ef0d146.js"
import"./closest-e3995be7.js"
import{c as m}from"./closestTable-64ed8d8b.js"
import{d}from"./dialog-e74653d6.js"
function p(s){const e=f(s)
let a={r:1,m:e}
return"Item was transferred to the guild store!"===e&&(a={r:0,m:""}),a}function g(s,e){0===e.r&&c('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:e}=s
if("IMG"===e.tagName){s.preventDefault()
const a=e.parentNode.href;(t=a,o(t).then(p).then(d)).then(r(g,e))}var t
"sendLink"===e.className&&i("img",a).forEach(l)}export default function(){s()||(e(a,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-b013a716.js.map
