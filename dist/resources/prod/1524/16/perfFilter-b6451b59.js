import{w as t,k as s,i as e,f as a,p as c,o,x as f,O as n}from"./calfSystem-be09bdff.js"
import{g as r}from"./getArrayByClassName-dcccee52.js"
import{g as i}from"./getInventoryById-ae95478a.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&n(t)}function u(){const t=r("selectable-item",f(l+"-items"))
0!==t.length&&t.forEach(p)}function b(t){m=t.items
const f=s({className:"fshAC"})
e(f,'<button class="fshBl">Perfect</button>'),a(c,f),o(f,u)}function g(s){t()||(l=s,i().then(b))}export{g as p}
//# sourceMappingURL=perfFilter-b6451b59.js.map
