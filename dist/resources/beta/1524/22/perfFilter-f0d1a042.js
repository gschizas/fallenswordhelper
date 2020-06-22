import{x as t,m as s,i as a,h as e,p as o,o as n,y as c,Q as f}from"./calfSystem-1b876afa.js"
import{g as r}from"./getInventoryById-b28970a8.js"
import{g as m}from"./getArrayByClassName-ef7e9871.js"
let i,l
function p(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&f(t)}function h(){const t=m("selectable-item",c(l+"-items"))
0!==t.length&&t.forEach(p)}function u(t){i=t.items
const c=s({className:"fshAC"})
a(c,'<button class="fshBl">Perfect</button>'),e(o,c),n(c,h)}function y(s){t()||(l=s,r().then(u))}export{y as p}
//# sourceMappingURL=perfFilter-f0d1a042.js.map
