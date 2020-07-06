import{x as t,m as s,i as e,h as a,p as o,o as c,y as n,Q as f}from"./calfSystem-019de1cf.js"
import{g as r}from"./getInventoryById-7c7b7be2.js"
import{g as m}from"./getArrayByClassName-b956f719.js"
let i,l
function p(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&f(t)}function b(){const t=m("selectable-item",n(l+"-items"))
0!==t.length&&t.forEach(p)}function h(t){i=t.items
const n=s({className:"fshAC"})
e(n,'<button class="fshBl">Perfect</button>'),a(o,n),c(n,b)}function u(s){t()||(l=s,r().then(h))}export{u as p}
//# sourceMappingURL=perfFilter-410ef8e9.js.map
