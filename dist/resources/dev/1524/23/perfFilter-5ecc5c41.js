import{x as t,m as s,i as e,h as a,p as c,o,y as n,R as f}from"./calfSystem-9901ad27.js"
import{g as r}from"./getInventoryById-8ce6ec79.js"
import{g as m}from"./getArrayByClassName-a5f709cf.js"
let i,l
function p(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&f(t)}function h(){const t=m("selectable-item",n(l+"-items"))
0!==t.length&&t.forEach(p)}function u(t){i=t.items
const n=s({className:"fshAC"})
e(n,'<button class="fshBl">Perfect</button>'),a(c,n),o(n,h)}function y(s){t()||(l=s,r().then(u))}export{y as p}
//# sourceMappingURL=perfFilter-5ecc5c41.js.map
