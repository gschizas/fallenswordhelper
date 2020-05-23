import{z as t,l as s,i as e,h as a,p as f,o as n,al as o,A as c,Z as i}from"./calfSystem-70b0df7f.js"
import{g as l}from"./getInventoryById-e8f5fd59.js"
let r,m
function h(t){const s=t.id.replace(`${m}-item-`,"")
r[s]&&"Perfect"===r[s].craft&&i(t)}function p(){const t=o("selectable-item",c(`${m}-items`))
0!==t.length&&t.forEach(h)}function u(t){r=t.items
const o=s({className:"fshAC"})
e(o,'<button class="fshBl">Perfect</button>'),a(f,o),n(o,p)}function b(s){t()||(m=s,l().then(u))}export{b as p}
//# sourceMappingURL=perfFilter-654a8ff3.js.map
