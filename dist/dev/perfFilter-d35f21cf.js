import{z as t,l as s,i as e,h as a,p as c,o as n,al as o,A as f,Z as i}from"./calfSystem-0e5d6faf.js"
import{g as l}from"./getInventoryById-590cf298.js"
let r,m
function h(t){const s=t.id.replace(`${m}-item-`,"")
r[s]&&"Perfect"===r[s].craft&&i(t)}function p(){const t=o("selectable-item",f(`${m}-items`))
0!==t.length&&t.forEach(h)}function u(t){r=t.items
const o=s({className:"fshAC"})
e(o,'<button class="fshBl">Perfect</button>'),a(c,o),n(o,p)}function b(s){t()||(m=s,l().then(u))}export{b as p}
//# sourceMappingURL=perfFilter-d35f21cf.js.map
