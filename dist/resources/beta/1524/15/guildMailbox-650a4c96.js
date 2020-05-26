import{w as s,o as a,p as e,i as t,L as n,aJ as o,s as r,g as i,N as l,bi as f,z as c}from"./calfSystem-1262535f.js"
import"./dialogMsg-06808fe1.js"
import"./closest-20389d90.js"
import{c as m}from"./closestTable-fb9486a9.js"
import{d as p}from"./dialog-c7021814.js"
function d(s){const a=f(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&c('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(l)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-650a4c96.js.map
