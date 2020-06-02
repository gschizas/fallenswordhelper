import{w as s,o as a,p as e,i as t,N as n,aR as o,s as r,g as c,P as f,ba as i,z as l}from"./calfSystem-d49dbbd3.js"
import"./dialogMsg-c696a07c.js"
import"./closest-c1f1e24c.js"
import{c as m}from"./closestTable-dc4f2fff.js"
import{d}from"./dialog-9b65c22f.js"
function p(s){const a=i(s)
let e={r:1,m:a}
return"Item was transferred to the guild store!"===a&&(e={r:0,m:""}),e}function g(s,a){0===a.r&&l('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:a}=s
if("IMG"===a.tagName){s.preventDefault()
const e=a.parentNode.href;(t=e,o(t).then(p).then(d)).then(r(g,a))}var t
"sendLink"===a.className&&c("img",e).forEach(f)}export default function(){s()||(a(e,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-94e693de.js.map
