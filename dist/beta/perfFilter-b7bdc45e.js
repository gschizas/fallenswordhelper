import{z as t,l as s,i as e,h as a,p as c,o as n,ak as o,A as f,Y as i}from"./calfSystem-2fb02284.js"
import{g as r}from"./getInventoryById-bd7cfe34.js"
let l,m
function h(t){const s=t.id.replace(m+"-item-","")
l[s]&&"Perfect"===l[s].craft&&i(t)}function p(){const t=o("selectable-item",f(m+"-items"))
0!==t.length&&t.forEach(h)}function u(t){l=t.items
const o=s({className:"fshAC"})
e(o,'<button class="fshBl">Perfect</button>'),a(c,o),n(o,p)}function b(s){t()||(m=s,r().then(u))}export{b as p}
//# sourceMappingURL=perfFilter-b7bdc45e.js.map
