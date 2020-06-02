import{w as t,k as s,i as a,f as e,p as o,o as c,x as n,P as f}from"./calfSystem-d49dbbd3.js"
import{g as r}from"./getArrayByClassName-511145a8.js"
import{g as i}from"./getInventoryById-aa05fc4e.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&f(t)}function u(){const t=r("selectable-item",n(l+"-items"))
0!==t.length&&t.forEach(p)}function b(t){m=t.items
const n=s({className:"fshAC"})
a(n,'<button class="fshBl">Perfect</button>'),e(o,n),c(n,u)}function d(s){t()||(l=s,i().then(b))}export{d as p}
//# sourceMappingURL=perfFilter-e9ea0249.js.map
