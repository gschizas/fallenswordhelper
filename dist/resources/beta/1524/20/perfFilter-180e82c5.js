import{x as t,l as s,i as e,f as a,p as o,o as c,y as f,Q as n}from"./calfSystem-05554bae.js"
import{g as r}from"./getInventoryById-d10cf296.js"
import{g as i}from"./getArrayByClassName-4e6df9b6.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&n(t)}function u(){const t=i("selectable-item",f(l+"-items"))
0!==t.length&&t.forEach(p)}function y(t){m=t.items
const f=s({className:"fshAC"})
e(f,'<button class="fshBl">Perfect</button>'),a(o,f),c(f,u)}function b(s){t()||(l=s,r().then(y))}export{b as p}
//# sourceMappingURL=perfFilter-180e82c5.js.map
