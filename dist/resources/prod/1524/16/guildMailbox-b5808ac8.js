import{w as s,o as e,p as a,i as t,M as n,aP as o,s as r,g as i,O as c,b3 as l,z as f}from"./calfSystem-be09bdff.js"
import"./dialogMsg-8889cf76.js"
import"./closest-81c3e392.js"
import{c as m}from"./closestTable-dde6bdc8.js"
import{d}from"./dialog-2ae45961.js"
function p(s){const e=l(s)
let a={r:1,m:e}
return"Item was transferred to the guild store!"===e&&(a={r:0,m:""}),a}function g(s,e){0===e.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:e}=s
if("IMG"===e.tagName){s.preventDefault()
const a=e.parentNode.href;(t=a,o(t).then(p).then(d)).then(r(g,e))}var t
"sendLink"===e.className&&i("img",a).forEach(c)}export default function(){s()||(e(a,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-b5808ac8.js.map
