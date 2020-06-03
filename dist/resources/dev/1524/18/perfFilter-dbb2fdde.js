import{w as t,k as s,i as e,f as a,p as o,o as c,x as f,P as n}from"./calfSystem-5545a3e6.js"
import{g as r}from"./getArrayByClassName-8790cbe5.js"
import{g as i}from"./getInventoryById-f2f6620e.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&n(t)}function u(){const t=r("selectable-item",f(l+"-items"))
0!==t.length&&t.forEach(p)}function g(t){m=t.items
const f=s({className:"fshAC"})
e(f,'<button class="fshBl">Perfect</button>'),a(o,f),c(f,u)}function h(s){t()||(l=s,i().then(g))}export{h as p}
//# sourceMappingURL=perfFilter-dbb2fdde.js.map
