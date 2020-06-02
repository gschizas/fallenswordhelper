import{w as s,o as a,p as e,i as t,M as n,aP as o,s as r,g as f,O as i,b5 as l,z as c}from"./calfSystem-02ae8657.js"
import"./dialogMsg-f195b598.js"
import"./closest-8af29cf3.js"
import{c as m}from"./closestTable-704cfbde.js"
import{d as p}from"./dialog-daafeeb1.js"
function d(s){const a=l(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&c('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&f("img",e).forEach(i)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-6c34c055.js.map
