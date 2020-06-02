import{w as t,k as s,i as e,f as a,p as o,o as c,x as n,O as f}from"./calfSystem-02ae8657.js"
import{g as r}from"./getArrayByClassName-d2e73c64.js"
import{g as i}from"./getInventoryById-8b3f94ee.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&f(t)}function u(){const t=r("selectable-item",n(l+"-items"))
0!==t.length&&t.forEach(p)}function g(t){m=t.items
const n=s({className:"fshAC"})
e(n,'<button class="fshBl">Perfect</button>'),a(o,n),c(n,u)}function h(s){t()||(l=s,i().then(g))}export{h as p}
//# sourceMappingURL=perfFilter-da4c5ce0.js.map
