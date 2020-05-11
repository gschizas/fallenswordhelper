import{z as s,o as e,p as a,i as t,R as n,a_ as o,v as r,g as i,Y as c,bo as l,C as f}from"./calfSystem-72fdbe97.js"
import"./dialogMsg-efcd2089.js"
import"./closest-495903f5.js"
import{c as m}from"./closestTable-78e4c82b.js"
import{d as p}from"./dialog-9c6ee33b.js"
function d(s){const e=l(s)
let a={r:1,m:e}
return"Item was transferred to the guild store!"===e&&(a={r:0,m:""}),a}function g(s,e){0===e.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:e}=s
if("IMG"===e.tagName){s.preventDefault()
const a=e.parentNode.href;(t=a,o(t).then(d).then(p)).then(r(g,e))}var t
"sendLink"===e.className&&i("img",a).forEach(c)}export default function(){s()||(e(a,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-c58f61c0.js.map
