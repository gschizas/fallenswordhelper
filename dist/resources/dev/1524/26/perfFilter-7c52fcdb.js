import{x as t,m as s,i as e,h as a,p as o,o as c,y as n,Q as f}from"./calfSystem-4991bf5b.js"
import{g as r}from"./getInventoryById-5eb1ebd7.js"
import{g as m}from"./getArrayByClassName-7efc50e3.js"
let i,l
function b(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&f(t)}function p(){const t=m("selectable-item",n(l+"-items"))
0!==t.length&&t.forEach(b)}function h(t){i=t.items
const n=s({className:"fshAC"})
e(n,'<button class="fshBl">Perfect</button>'),a(o,n),c(n,p)}function u(s){t()||(l=s,r().then(h))}export{u as p}
//# sourceMappingURL=perfFilter-7c52fcdb.js.map
