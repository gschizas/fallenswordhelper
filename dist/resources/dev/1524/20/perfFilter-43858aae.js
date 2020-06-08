import{x as t,l as s,i as e,f as a,p as o,o as c,y as f,R as n}from"./calfSystem-a2862afc.js"
import{g as r}from"./getInventoryById-7e10dff9.js"
import{g as i}from"./getArrayByClassName-c1e64010.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&n(t)}function u(){const t=i("selectable-item",f(l+"-items"))
0!==t.length&&t.forEach(p)}function y(t){m=t.items
const f=s({className:"fshAC"})
e(f,'<button class="fshBl">Perfect</button>'),a(o,f),c(f,u)}function g(s){t()||(l=s,r().then(y))}export{g as p}
//# sourceMappingURL=perfFilter-43858aae.js.map
