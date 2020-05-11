import{z as t,l as s,i as e,h as a,p as n,o,ak as c,A as f,Y as i}from"./calfSystem-72fdbe97.js"
import{g as r}from"./getInventoryById-49848b69.js"
let l,m
function h(t){const s=t.id.replace(`${m}-item-`,"")
l[s]&&"Perfect"===l[s].craft&&i(t)}function p(){const t=c("selectable-item",f(`${m}-items`))
0!==t.length&&t.forEach(h)}function u(t){l=t.items
const c=s({className:"fshAC"})
e(c,'<button class="fshBl">Perfect</button>'),a(n,c),o(c,p)}function b(s){t()||(m=s,r().then(u))}export{b as p}
//# sourceMappingURL=perfFilter-8beec5fc.js.map
