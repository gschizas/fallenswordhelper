import{y as s,o as a,p as e,i as t,Q as n,aZ as o,u as r,g as i,X as c,bn as l,B as f}from"./calfSystem-d587d232.js"
import"./dialogMsg-8c5a22d3.js"
import"./closest-2b33b59d.js"
import{c as m}from"./closestTable-6cc0678e.js"
import{d}from"./dialog-f9fad105.js"
function p(s){const a=l(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(p).then(d)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(c)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-b8ec4cfe.js.map
