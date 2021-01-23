import{x as t,m as s,i as e,h as a,p as c,o,y as n,Q as r}from"./calfSystem-393ab895.js"
import{g as f}from"./getArrayByClassName-1bdcec20.js"
import{g as m}from"./getInventoryById-ed6dc7be.js"
let i,l
function p(t){const s=t.id.replace(`${l}-item-`,"")
i[s]&&"Perfect"===i[s].craft&&r(t)}function b(){const t=f("selectable-item",n(`${l}-items`))
0!==t.length&&t.forEach(p)}function h(t){i=t.items
const n=s({className:"fshAC"})
e(n,'<button class="fshBl">Perfect</button>'),a(c,n),o(n,b)}function u(s){t()||(l=s,m().then(h))}export{u as p}
//# sourceMappingURL=perfFilter-c8f38b54.js.map
