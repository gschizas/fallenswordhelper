import{x as t,m as s,i as e,h as a,p as o,o as c,y as n,P as f}from"./calfSystem-57628ebe.js"
import{g as r}from"./getInventoryById-63d8a2eb.js"
import{g as m}from"./getArrayByClassName-b9f9e51c.js"
let i,l
function p(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&f(t)}function b(){const t=m("selectable-item",n(l+"-items"))
0!==t.length&&t.forEach(p)}function h(t){i=t.items
const n=s({className:"fshAC"})
e(n,'<button class="fshBl">Perfect</button>'),a(o,n),c(n,b)}function u(s){t()||(l=s,r().then(h))}export{u as p}
//# sourceMappingURL=perfFilter-54fa31c7.js.map
