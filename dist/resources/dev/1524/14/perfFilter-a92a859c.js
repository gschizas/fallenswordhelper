import{y as t,k as s,i as e,f as a,p as n,o,ak as c,z as f,Y as i}from"./calfSystem-d96a3efd.js"
import{g as r}from"./getInventoryById-bb2e70f9.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&i(t)}function u(){const t=c("selectable-item",f(l+"-items"))
0!==t.length&&t.forEach(p)}function b(t){m=t.items
const c=s({className:"fshAC"})
e(c,'<button class="fshBl">Perfect</button>'),a(n,c),o(c,u)}function h(s){t()||(l=s,r().then(b))}export{h as p}
//# sourceMappingURL=perfFilter-a92a859c.js.map
