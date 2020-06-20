import{x as s,o as a,p as e,i as t,C as n,ax as o,t as r,g as i,Q as l,b2 as f,A as c}from"./calfSystem-2741d97b.js"
import"./dialogMsg-edf7150f.js"
import"./closest-5ba11a5a.js"
import{c as m}from"./closestTable-4420f163.js"
import{d as p}from"./dialog-594eeb25.js"
function d(s){const a=f(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&c('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(l)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-17f90589.js.map
