import{w as s,o as a,p as t,i as e,M as n,aP as o,s as r,g as c,O as i,b5 as l,z as f}from"./calfSystem-9554b525.js"
import"./dialogMsg-cc663959.js"
import"./closest-687f4f6c.js"
import{c as m}from"./closestTable-7152d2a7.js"
import{d as p}from"./dialog-7b85f47c.js"
function d(s){const a=l(s)
let t={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(t={r:0,m:""}),t}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const t=a.parentNode.href;(e=t,o(e).then(d).then(p)).then(r(g,a))}var e
"sendLink"===a.className&&c("img",t).forEach(i)}export default function(){s()||(a(t,h),e(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-4bb213dc.js.map
