import{w as s,o as a,p as e,i as t,L as n,aJ as o,s as r,g as i,N as c,bg as l,z as f}from"./calfSystem-740ec4d2.js"
import"./dialogMsg-a44aafc4.js"
import"./closest-a3325de8.js"
import{c as m}from"./closestTable-770ab949.js"
import{d as p}from"./dialog-004172c3.js"
function d(s){const a=l(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(d).then(p)).then(r(g,a))}var t
"sendLink"===a.className&&i("img",e).forEach(c)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-f6a62046.js.map
