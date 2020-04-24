import{z as t,l as s,i as a,h as e,p as c,o as n,ak as o,A as f,Y as i}from"./calfSystem-07c25a1c.js"
import{g as r}from"./getInventoryById-02cab4dd.js"
let l,m
function h(t){const s=t.id.replace(`${m}-item-`,"")
l[s]&&"Perfect"===l[s].craft&&i(t)}function p(){const t=o("selectable-item",f(`${m}-items`))
0!==t.length&&t.forEach(h)}function u(t){l=t.items
const o=s({className:"fshAC"})
a(o,'<button class="fshBl">Perfect</button>'),e(c,o),n(o,p)}function b(s){t()||(m=s,r().then(u))}export{b as p}
//# sourceMappingURL=perfFilter-eae778ca.js.map
