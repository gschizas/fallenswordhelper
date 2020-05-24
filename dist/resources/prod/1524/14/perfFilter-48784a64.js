import{y as t,k as s,i as a,f as e,p as n,o,aj as c,z as f,X as i}from"./calfSystem-d587d232.js"
import{g as r}from"./getInventoryById-a2479f17.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&i(t)}function u(){const t=c("selectable-item",f(l+"-items"))
0!==t.length&&t.forEach(p)}function h(t){m=t.items
const c=s({className:"fshAC"})
a(c,'<button class="fshBl">Perfect</button>'),e(n,c),o(c,u)}function d(s){t()||(l=s,r().then(h))}export{d as p}
//# sourceMappingURL=perfFilter-48784a64.js.map
