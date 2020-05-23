import{z as s,o as e,p as a,i as t,S as n,a$ as o,v as r,g as c,Z as i,bv as l,C as f}from"./calfSystem-01eb06ed.js"
import"./dialogMsg-7ec2c29d.js"
import"./closest-6fcf191a.js"
import{c as m}from"./closestTable-c3597d67.js"
import{d as p}from"./dialog-e8202133.js"
function d(s){const e=l(s)
let a={r:1,m:e}
return"Item was transferred to the guild store!"===e&&(a={r:0,m:""}),a}function g(s,e){0===e.r&&f('<span class="fshGreen">Taken</span>',m(s).nextElementSibling.rows[0].cells[0])}function h(s){const{target:e}=s
if("IMG"===e.tagName){s.preventDefault()
const a=e.parentNode.href;(t=a,o(t).then(d).then(p)).then(r(g,e))}var t
"sendLink"===e.className&&c("img",a).forEach(i)}export default function(){s()||(e(a,h),t(n('#pCC td[height="25"]'),'<span class="sendLink">Take All</span>'))}
//# sourceMappingURL=guildMailbox-02be1867.js.map
