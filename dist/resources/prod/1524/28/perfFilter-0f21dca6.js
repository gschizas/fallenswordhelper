import{x as t,m as s,i as a,h as e,p as o,o as c,y as n,P as f}from"./calfSystem-a5da5210.js"
import{g as r}from"./getInventoryById-6fa4cb8c.js"
import{g as m}from"./getArrayByClassName-6e0bb75e.js"
let i,l
function p(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&f(t)}function b(){const t=m("selectable-item",n(l+"-items"))
0!==t.length&&t.forEach(p)}function h(t){i=t.items
const n=s({className:"fshAC"})
a(n,'<button class="fshBl">Perfect</button>'),e(o,n),c(n,b)}function u(s){t()||(l=s,r().then(h))}export{u as p}
//# sourceMappingURL=perfFilter-0f21dca6.js.map
