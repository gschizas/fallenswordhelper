import{w as t,k as s,i as a,f as e,p as o,o as f,x as n,O as c}from"./calfSystem-57340987.js"
import{g as r}from"./getArrayByClassName-26f7f305.js"
import{g as i}from"./getInventoryById-ad102b8b.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&c(t)}function u(){const t=r("selectable-item",n(l+"-items"))
0!==t.length&&t.forEach(p)}function b(t){m=t.items
const n=s({className:"fshAC"})
a(n,'<button class="fshBl">Perfect</button>'),e(o,n),f(n,u)}function g(s){t()||(l=s,i().then(b))}export{g as p}
//# sourceMappingURL=perfFilter-dbb575d8.js.map
