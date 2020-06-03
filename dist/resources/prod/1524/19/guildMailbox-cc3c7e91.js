import{w as s,o as a,p as e,i as t,M as n,aP as o,s as r,g as c,O as f,b3 as i,z as l}from"./calfSystem-6fc0cc1b.js"
import"./dialogMsg-adf09e8d.js"
import"./closest-958712aa.js"
import{c as m}from"./closestTable-4bde3ff0.js"
import{d as p}from"./dialog-2c2225f5.js"
function d(s){const a=i(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&l('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&c("img",e).forEach(f)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-cc3c7e91.js.map
