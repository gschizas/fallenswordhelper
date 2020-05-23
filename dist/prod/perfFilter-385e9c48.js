import{z as t,l as s,i as e,h as a,p as n,o,ak as c,A as f,Y as i}from"./calfSystem-d06402b1.js"
import{g as r}from"./getInventoryById-0b74db1b.js"
let l,m
function b(t){const s=t.id.replace(`${m}-item-`,"")
l[s]&&"Perfect"===l[s].craft&&i(t)}function h(){const t=c("selectable-item",f(`${m}-items`))
0!==t.length&&t.forEach(b)}function p(t){l=t.items
const c=s({className:"fshAC"})
e(c,'<button class="fshBl">Perfect</button>'),a(n,c),o(c,h)}function u(s){t()||(m=s,r().then(p))}export{u as p}
//# sourceMappingURL=perfFilter-385e9c48.js.map
