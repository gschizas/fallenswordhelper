import{z as t,l as s,i as a,h as e,p as n,o,al as c,A as f,Z as i}from"./calfSystem-fd021443.js"
import{g as l}from"./getInventoryById-a110ba2d.js"
let r,m
function h(t){const s=t.id.replace(m+"-item-","")
r[s]&&"Perfect"===r[s].craft&&i(t)}function p(){const t=c("selectable-item",f(m+"-items"))
0!==t.length&&t.forEach(h)}function u(t){r=t.items
const c=s({className:"fshAC"})
a(c,'<button class="fshBl">Perfect</button>'),e(n,c),o(c,p)}function b(s){t()||(m=s,l().then(u))}export{b as p}
//# sourceMappingURL=perfFilter-5cfb96ea.js.map
