import{x as t,m as s,i as e,h as a,p as o,o as n,y as c,Q as f}from"./calfSystem-54df10e3.js"
import{g as r}from"./getInventoryById-4b09b9d2.js"
import{g as m}from"./getArrayByClassName-1306b7b7.js"
let i,l
function b(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&f(t)}function p(){const t=m("selectable-item",c(l+"-items"))
0!==t.length&&t.forEach(b)}function h(t){i=t.items
const c=s({className:"fshAC"})
e(c,'<button class="fshBl">Perfect</button>'),a(o,c),n(c,p)}function u(s){t()||(l=s,r().then(h))}export{u as p}
//# sourceMappingURL=perfFilter-e331a5b1.js.map
