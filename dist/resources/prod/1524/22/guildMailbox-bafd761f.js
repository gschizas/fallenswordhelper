import{x as s,o as e,p as a,i as t,C as n,ax as o,t as r,g as i,Q as f,b2 as l,A as c}from"./calfSystem-d04e4be4.js"
import"./dialogMsg-88e95d9f.js"
import"./closest-137378db.js"
import{c as m}from"./closestTable-f6804f7b.js"
import{d}from"./dialog-8f80d849.js"
function p(s){const e=l(s)
let a={r:1,m:e}
return"Item was transferred to the guild store!"===e&&(a={r:0,m:""}),a}function g(s,e){0===e.r&&c('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:e}=s
if("IMG"===e.tagName){s.preventDefault()
const a=e.parentNode.href;(t=a,o(t).then(p).then(d)).then(r(g,e))}var t
"sendLink"===e.className&&i("img",a).forEach(f)}export default function(){s()||(e(a,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-bafd761f.js.map
