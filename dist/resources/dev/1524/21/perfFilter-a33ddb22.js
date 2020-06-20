import{x as t,m as s,i as a,h as e,p as o,o as c,y as n,R as f}from"./calfSystem-9c7241dc.js"
import{g as r}from"./getInventoryById-addb0357.js"
import{g as m}from"./getArrayByClassName-5afbd411.js"
let i,l
function p(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&f(t)}function d(){const t=m("selectable-item",n(l+"-items"))
0!==t.length&&t.forEach(p)}function h(t){i=t.items
const n=s({className:"fshAC"})
a(n,'<button class="fshBl">Perfect</button>'),e(o,n),c(n,d)}function u(s){t()||(l=s,r().then(h))}export{u as p}
//# sourceMappingURL=perfFilter-a33ddb22.js.map
