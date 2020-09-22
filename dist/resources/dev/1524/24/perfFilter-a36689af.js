import{x as t,m as s,i as e,h as a,p as o,o as c,y as n,R as f}from"./calfSystem-38898f3e.js"
import{g as r}from"./getInventoryById-e93c5950.js"
import{g as m}from"./getArrayByClassName-25f769e2.js"
let i,l
function p(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&f(t)}function h(){const t=m("selectable-item",n(l+"-items"))
0!==t.length&&t.forEach(p)}function u(t){i=t.items
const n=s({className:"fshAC"})
e(n,'<button class="fshBl">Perfect</button>'),a(o,n),c(n,h)}function y(s){t()||(l=s,r().then(u))}export{y as p}
//# sourceMappingURL=perfFilter-a36689af.js.map
