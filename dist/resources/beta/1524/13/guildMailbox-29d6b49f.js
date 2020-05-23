import{z as s,o as a,p as e,i as t,R as n,a_ as o,v as r,g as i,Y as l,bq as c,C as f}from"./calfSystem-1e164202.js"
import"./dialogMsg-b431c172.js"
import"./closest-42af84ad.js"
import{c as m}from"./closestTable-42d2debb.js"
import{d}from"./dialog-938d7c32.js"
function p(s){const a=c(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(p).then(d)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(l)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-29d6b49f.js.map
