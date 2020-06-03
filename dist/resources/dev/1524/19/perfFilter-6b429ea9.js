import{w as t,k as s,i as e,f as a,p as c,o,x as n,P as f}from"./calfSystem-f7574730.js"
import{g as r}from"./getArrayByClassName-6077b562.js"
import{g as i}from"./getInventoryById-c0c88cd1.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&f(t)}function u(){const t=r("selectable-item",n(l+"-items"))
0!==t.length&&t.forEach(p)}function g(t){m=t.items
const n=s({className:"fshAC"})
e(n,'<button class="fshBl">Perfect</button>'),a(c,n),o(n,u)}function h(s){t()||(l=s,i().then(g))}export{h as p}
//# sourceMappingURL=perfFilter-6b429ea9.js.map
