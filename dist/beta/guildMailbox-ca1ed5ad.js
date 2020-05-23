import{z as s,o as a,p as e,i as t,R as n,a_ as o,v as r,g as f,Y as i,bq as l,C as c}from"./calfSystem-fb94ddf0.js"
import"./dialogMsg-9bffb5e8.js"
import"./closest-3210f804.js"
import{c as m}from"./closestTable-3ad17855.js"
import{d}from"./dialog-df4a277b.js"
function p(s){const a=l(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&c('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(p).then(d)).then(r(g,a))}var t
"sendLink"===a.className&&f("img",e).forEach(i)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-ca1ed5ad.js.map
