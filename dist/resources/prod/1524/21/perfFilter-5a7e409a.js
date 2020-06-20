import{x as t,m as s,i as e,h as a,p as o,o as c,y as n,Q as r}from"./calfSystem-2741d97b.js"
import{g as f}from"./getInventoryById-e8d5c395.js"
import{g as m}from"./getArrayByClassName-3946388a.js"
let i,l
function p(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&r(t)}function h(){const t=m("selectable-item",n(l+"-items"))
0!==t.length&&t.forEach(p)}function u(t){i=t.items
const n=s({className:"fshAC"})
e(n,'<button class="fshBl">Perfect</button>'),a(o,n),c(n,h)}function y(s){t()||(l=s,f().then(u))}export{y as p}
//# sourceMappingURL=perfFilter-5a7e409a.js.map
