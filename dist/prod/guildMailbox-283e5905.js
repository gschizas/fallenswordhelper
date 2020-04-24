import{z as s,o as a,p as t,i as e,R as n,a_ as o,v as r,g as c,Y as i,bo as l,C as f}from"./calfSystem-cb871cc0.js"
import"./dialogMsg-2cf7511f.js"
import"./closest-8cd211a4.js"
import{c as m}from"./closestTable-f05bb6bb.js"
import{d as p}from"./dialog-4937b929.js"
function d(s){const a=l(s)
let t={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(t={r:0,m:""}),t}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function b(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const t=a.parentNode.href;(e=t,o(e).then(d).then(p)).then(r(g,a))}var e
"sendLink"===a.className&&c("img",t).forEach(i)}export default function(){s()||(a(t,b),e(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-283e5905.js.map
