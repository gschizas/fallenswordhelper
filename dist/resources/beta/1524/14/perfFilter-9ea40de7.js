import{y as t,k as s,i as a,f as e,p as c,o as n,aj as o,z as f,X as i}from"./calfSystem-371c414c.js"
import{g as r}from"./getInventoryById-9da95555.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&i(t)}function u(){const t=o("selectable-item",f(l+"-items"))
0!==t.length&&t.forEach(p)}function h(t){m=t.items
const o=s({className:"fshAC"})
a(o,'<button class="fshBl">Perfect</button>'),e(c,o),n(o,u)}function y(s){t()||(l=s,r().then(h))}export{y as p}
//# sourceMappingURL=perfFilter-9ea40de7.js.map
