import{w as t,k as s,i as e,f as a,p as o,o as n,x as c,O as f}from"./calfSystem-9554b525.js"
import{g as r}from"./getArrayByClassName-61d73ad7.js"
import{g as i}from"./getInventoryById-8ed31e70.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&f(t)}function u(){const t=r("selectable-item",c(l+"-items"))
0!==t.length&&t.forEach(p)}function d(t){m=t.items
const c=s({className:"fshAC"})
e(c,'<button class="fshBl">Perfect</button>'),a(o,c),n(c,u)}function g(s){t()||(l=s,i().then(d))}export{g as p}
//# sourceMappingURL=perfFilter-e59ba5b5.js.map
