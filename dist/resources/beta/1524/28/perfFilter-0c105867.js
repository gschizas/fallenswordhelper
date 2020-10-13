import{x as t,m as s,i as a,h as e,p as o,o as c,y as n,P as f}from"./calfSystem-964f4fc9.js"
import{g as r}from"./getInventoryById-d734e0a5.js"
import{g as m}from"./getArrayByClassName-022b52a0.js"
let i,l
function p(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&f(t)}function h(){const t=m("selectable-item",n(l+"-items"))
0!==t.length&&t.forEach(p)}function u(t){i=t.items
const n=s({className:"fshAC"})
a(n,'<button class="fshBl">Perfect</button>'),e(o,n),c(n,h)}function y(s){t()||(l=s,r().then(u))}export{y as p}
//# sourceMappingURL=perfFilter-0c105867.js.map
