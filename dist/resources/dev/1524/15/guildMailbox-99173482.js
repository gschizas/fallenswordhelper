import{w as s,o as a,p as e,i as t,M as n,aK as o,s as r,g as f,O as i,bo as l,z as c}from"./calfSystem-ee582533.js"
import"./dialogMsg-b9afb04d.js"
import"./closest-d675e111.js"
import{c as m}from"./closestTable-ffc1b5cf.js"
import{d as p}from"./dialog-b2af5043.js"
function d(s){const a=l(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&c('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&f("img",e).forEach(i)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-99173482.js.map
