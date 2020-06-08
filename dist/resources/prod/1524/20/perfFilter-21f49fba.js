import{x as t,l as s,i as e,f as a,p as o,o as n,y as c,Q as f}from"./calfSystem-03970067.js"
import{g as r}from"./getInventoryById-4e448ba1.js"
import{g as i}from"./getArrayByClassName-24024eda.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&f(t)}function u(){const t=i("selectable-item",c(l+"-items"))
0!==t.length&&t.forEach(p)}function y(t){m=t.items
const c=s({className:"fshAC"})
e(c,'<button class="fshBl">Perfect</button>'),a(o,c),n(c,u)}function g(s){t()||(l=s,r().then(y))}export{g as p}
//# sourceMappingURL=perfFilter-21f49fba.js.map
