import{x as s,o as a,p as e,i as t,C as n,ax as o,t as r,g as i,Q as f,b4 as l,A as c}from"./calfSystem-1b876afa.js"
import"./dialogMsg-e85a09f8.js"
import"./closest-f51e0443.js"
import{c as m}from"./closestTable-e4ca5f26.js"
import{d as p}from"./dialog-e9943726.js"
function d(s){const a=l(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&c('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(f)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-3351420a.js.map
