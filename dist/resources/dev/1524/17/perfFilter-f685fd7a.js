import{w as t,k as s,i as e,f as a,p as c,o,x as f,P as n}from"./calfSystem-1c103624.js"
import{g as r}from"./getArrayByClassName-5fd609f9.js"
import{g as i}from"./getInventoryById-f4443c8c.js"
let m,l
function p(t){const s=t.id.replace(l+"-item-","")
m[s]&&"Perfect"===m[s].craft&&n(t)}function u(){const t=r("selectable-item",f(l+"-items"))
0!==t.length&&t.forEach(p)}function g(t){m=t.items
const f=s({className:"fshAC"})
e(f,'<button class="fshBl">Perfect</button>'),a(c,f),o(f,u)}function h(s){t()||(l=s,i().then(g))}export{h as p}
//# sourceMappingURL=perfFilter-f685fd7a.js.map
