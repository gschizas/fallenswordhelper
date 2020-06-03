import{w as s,o as a,p as t,i as e,M as n,aP as o,s as r,g as i,O as l,b5 as c,z as f}from"./calfSystem-4197cc22.js"
import"./dialogMsg-bddf61a2.js"
import"./closest-5218baf6.js"
import{c as m}from"./closestTable-31439620.js"
import{d}from"./dialog-25ddd658.js"
function p(s){const a=c(s)
let t={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(t={r:0,m:""}),t}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const t=a.parentNode.href;(e=t,o(e).then(p).then(d)).then(r(g,a))}var e
"sendLink"===a.className&&i("img",t).forEach(l)}export default function(){s()||(a(t,h),e(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-69a88daa.js.map
