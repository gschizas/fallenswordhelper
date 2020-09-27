import{x as t,m as s,i as e,h as a,p as o,o as c,y as n,P as r}from"./calfSystem-71b9378d.js"
import{g as f}from"./getInventoryById-3b46d9e8.js"
import{g as m}from"./getArrayByClassName-0b903c97.js"
let i,l
function p(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&r(t)}function b(){const t=m("selectable-item",n(l+"-items"))
0!==t.length&&t.forEach(p)}function h(t){i=t.items
const n=s({className:"fshAC"})
e(n,'<button class="fshBl">Perfect</button>'),a(o,n),c(n,b)}function u(s){t()||(l=s,f().then(h))}export{u as p}
//# sourceMappingURL=perfFilter-f79b3a0c.js.map
