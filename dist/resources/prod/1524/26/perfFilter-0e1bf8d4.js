import{x as t,m as s,i as e,h as a,p as c,o,y as n,P as f}from"./calfSystem-a5fc99d4.js"
import{g as r}from"./getInventoryById-79ecc1dc.js"
import{g as m}from"./getArrayByClassName-7db9f7c4.js"
let i,l
function p(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&f(t)}function h(){const t=m("selectable-item",n(l+"-items"))
0!==t.length&&t.forEach(p)}function u(t){i=t.items
const n=s({className:"fshAC"})
e(n,'<button class="fshBl">Perfect</button>'),a(c,n),o(n,h)}function y(s){t()||(l=s,r().then(u))}export{y as p}
//# sourceMappingURL=perfFilter-0e1bf8d4.js.map
