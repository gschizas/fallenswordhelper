import{w as s,o as a,p as e,i as t,N as n,aR as o,s as r,g as i,P as f,ba as l,z as c}from"./calfSystem-f7574730.js"
import"./dialogMsg-655101fe.js"
import"./closest-807af018.js"
import{c as m}from"./closestTable-4db1af82.js"
import{d as p}from"./dialog-a36114b5.js"
function d(s){const a=l(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&c('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(f)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-6d3b71be.js.map
