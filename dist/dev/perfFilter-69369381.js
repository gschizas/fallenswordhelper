import{z as t,l as s,i as a,h as e,p as c,o as n,al as o,A as f,Z as i}from"./calfSystem-94018cd0.js"
import{g as l}from"./getInventoryById-8ad86d92.js"
let r,m
function h(t){const s=t.id.replace(`${m}-item-`,"")
r[s]&&"Perfect"===r[s].craft&&i(t)}function p(){const t=o("selectable-item",f(`${m}-items`))
0!==t.length&&t.forEach(h)}function u(t){r=t.items
const o=s({className:"fshAC"})
a(o,'<button class="fshBl">Perfect</button>'),e(c,o),n(o,p)}function d(s){t()||(m=s,l().then(u))}export{d as p}
//# sourceMappingURL=perfFilter-69369381.js.map
