import{w as t,k as s,i as e,f as a,p as o,o as c,x as n,N as f}from"./calfSystem-740ec4d2.js"
import{g as r}from"./getArrayByClassName-c703ad24.js"
import{g as i}from"./getInventoryById-627b014e.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&f(t)}function u(){const t=r("selectable-item",n(l+"-items"))
0!==t.length&&t.forEach(p)}function g(t){m=t.items
const n=s({className:"fshAC"})
e(n,'<button class="fshBl">Perfect</button>'),a(o,n),c(n,u)}function h(s){t()||(l=s,i().then(g))}export{h as p}
//# sourceMappingURL=perfFilter-fc22ea23.js.map
