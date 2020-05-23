import{z as s,o as a,p as t,i as e,S as n,a$ as o,v as r,g as f,Z as i,bv as c,C as l}from"./calfSystem-fd021443.js"
import"./dialogMsg-280d6f63.js"
import"./closest-23d4903f.js"
import{c as m}from"./closestTable-fd1fc1d7.js"
import{d}from"./dialog-a08a4c3c.js"
function p(s){const a=c(s)
let t={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(t={r:0,m:""}),t}function g(s,a){0===a.r&&l('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const t=a.parentNode.href;(e=t,o(e).then(p).then(d)).then(r(g,a))}var e
"sendLink"===a.className&&f("img",t).forEach(i)}export default function(){s()||(a(t,h),e(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-c668dac4.js.map
