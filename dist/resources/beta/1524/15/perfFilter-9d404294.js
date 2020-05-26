import{w as t,k as s,i as e,f as a,p as o,o as f,x as c,N as n}from"./calfSystem-1262535f.js"
import{g as r}from"./getArrayByClassName-486c0115.js"
import{g as i}from"./getInventoryById-3ff089d4.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&n(t)}function u(){const t=r("selectable-item",c(l+"-items"))
0!==t.length&&t.forEach(p)}function g(t){m=t.items
const c=s({className:"fshAC"})
e(c,'<button class="fshBl">Perfect</button>'),a(o,c),f(c,u)}function h(s){t()||(l=s,i().then(g))}export{h as p}
//# sourceMappingURL=perfFilter-9d404294.js.map
