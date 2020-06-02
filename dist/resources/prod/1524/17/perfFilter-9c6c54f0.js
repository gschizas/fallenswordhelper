import{w as t,k as s,i as e,f as a,p as o,o as c,x as n,O as f}from"./calfSystem-dec5e071.js"
import{g as r}from"./getArrayByClassName-82011e34.js"
import{g as i}from"./getInventoryById-a2e66e56.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&f(t)}function u(){const t=r("selectable-item",n(l+"-items"))
0!==t.length&&t.forEach(p)}function g(t){m=t.items
const n=s({className:"fshAC"})
e(n,'<button class="fshBl">Perfect</button>'),a(o,n),c(n,u)}function h(s){t()||(l=s,i().then(g))}export{h as p}
//# sourceMappingURL=perfFilter-9c6c54f0.js.map
