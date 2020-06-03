import{w as t,k as s,i as a,f as c,p as e,o,x as f,O as n}from"./calfSystem-6fc0cc1b.js"
import{g as r}from"./getArrayByClassName-50cbc2c4.js"
import{g as i}from"./getInventoryById-1fb78caf.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&n(t)}function b(){const t=r("selectable-item",f(l+"-items"))
0!==t.length&&t.forEach(p)}function u(t){m=t.items
const f=s({className:"fshAC"})
a(f,'<button class="fshBl">Perfect</button>'),c(e,f),o(f,b)}function g(s){t()||(l=s,i().then(u))}export{g as p}
//# sourceMappingURL=perfFilter-b0fa5c58.js.map
