import{z as s,o as a,p as e,i as t,R as n,a_ as o,v as r,g as i,Y as l,bo as c,C as f}from"./calfSystem-d06402b1.js"
import"./dialogMsg-b515da3f.js"
import"./closest-0e7d337b.js"
import{c as m}from"./closestTable-3bbadb79.js"
import{d}from"./dialog-b58c95c9.js"
function p(s){const a=c(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function b(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function g(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(p).then(d)).then(r(b,a))}var t
"sendLink"===a.className&&i("img",e).forEach(l)}export default function(){s()||(a(e,g),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-d74c2edd.js.map
