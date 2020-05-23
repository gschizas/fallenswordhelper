import{z as t,l as s,i as e,h as a,p as c,o as n,ak as o,A as f,Y as i}from"./calfSystem-4b4fbec4.js"
import{g as r}from"./getInventoryById-b76e4148.js"
let l,m
function b(t){const s=t.id.replace(m+"-item-","")
l[s]&&"Perfect"===l[s].craft&&i(t)}function h(){const t=o("selectable-item",f(m+"-items"))
0!==t.length&&t.forEach(b)}function p(t){l=t.items
const o=s({className:"fshAC"})
e(o,'<button class="fshBl">Perfect</button>'),a(c,o),n(o,h)}function u(s){t()||(m=s,r().then(p))}export{u as p}
//# sourceMappingURL=perfFilter-37b16782.js.map
