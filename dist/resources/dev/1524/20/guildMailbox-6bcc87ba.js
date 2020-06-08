import{x as s,o as a,p as e,i as t,C as n,aB as o,t as r,g as i,R as l,b9 as c,A as f}from"./calfSystem-a2862afc.js"
import"./dialogMsg-98e801f7.js"
import{d as m}from"./dialog-65e58e09.js"
import"./closest-75b5e3c5.js"
import{c as p}from"./closestTable-89a74d0f.js"
function d(s){const a=c(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',p(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(m)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(l)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-6bcc87ba.js.map
