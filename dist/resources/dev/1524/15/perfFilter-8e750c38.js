import{w as t,k as s,i as e,f as a,p as o,o as n,x as c,O as f}from"./calfSystem-ee582533.js"
import{g as r}from"./getArrayByClassName-981a136a.js"
import{g as i}from"./getInventoryById-77125772.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&f(t)}function u(){const t=r("selectable-item",c(l+"-items"))
0!==t.length&&t.forEach(p)}function g(t){m=t.items
const c=s({className:"fshAC"})
e(c,'<button class="fshBl">Perfect</button>'),a(o,c),n(c,u)}function h(s){t()||(l=s,i().then(g))}export{h as p}
//# sourceMappingURL=perfFilter-8e750c38.js.map
