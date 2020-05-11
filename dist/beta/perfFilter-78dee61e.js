import{z as t,l as s,i as a,h as e,p as n,o,ak as c,A as f,Y as i}from"./calfSystem-99da704d.js"
import{g as r}from"./getInventoryById-6720d91b.js"
let l,m
function h(t){const s=t.id.replace(`${m}-item-`,"")
l[s]&&"Perfect"===l[s].craft&&i(t)}function p(){const t=c("selectable-item",f(`${m}-items`))
0!==t.length&&t.forEach(h)}function u(t){l=t.items
const c=s({className:"fshAC"})
a(c,'<button class="fshBl">Perfect</button>'),e(n,c),o(c,p)}function d(s){t()||(m=s,r().then(u))}export{d as p}
//# sourceMappingURL=perfFilter-78dee61e.js.map
