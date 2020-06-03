import{w as t,k as s,i as e,f as a,p as o,o as c,x as f,O as n}from"./calfSystem-4197cc22.js"
import{g as r}from"./getArrayByClassName-22badefd.js"
import{g as i}from"./getInventoryById-8142e4af.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&n(t)}function u(){const t=r("selectable-item",f(l+"-items"))
0!==t.length&&t.forEach(p)}function g(t){m=t.items
const f=s({className:"fshAC"})
e(f,'<button class="fshBl">Perfect</button>'),a(o,f),c(f,u)}function h(s){t()||(l=s,i().then(g))}export{h as p}
//# sourceMappingURL=perfFilter-4e100c36.js.map
