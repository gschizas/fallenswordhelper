import{w as s,o as a,p as e,i as t,N as n,aR as o,s as r,g as i,P as l,ba as c,z as m}from"./calfSystem-5545a3e6.js"
import"./dialogMsg-e3924e5b.js"
import"./closest-b938ab98.js"
import{c as f}from"./closestTable-86204b76.js"
import{d as p}from"./dialog-30daca30.js"
function d(s){const a=c(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&m('<span class="fshGreen">Taken</span>',f(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(l)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-d1eca083.js.map
