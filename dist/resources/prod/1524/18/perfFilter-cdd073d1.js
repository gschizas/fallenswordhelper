import{w as t,k as s,i as a,f as e,p as o,o as c,x as n,O as f}from"./calfSystem-8b6534a5.js"
import{g as r}from"./getArrayByClassName-6b8fb696.js"
import{g as i}from"./getInventoryById-182cb218.js"
let m,l
function b(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&f(t)}function p(){const t=r("selectable-item",n(l+"-items"))
0!==t.length&&t.forEach(b)}function u(t){m=t.items
const n=s({className:"fshAC"})
a(n,'<button class="fshBl">Perfect</button>'),e(o,n),c(n,p)}function g(s){t()||(l=s,i().then(u))}export{g as p}
//# sourceMappingURL=perfFilter-cdd073d1.js.map
