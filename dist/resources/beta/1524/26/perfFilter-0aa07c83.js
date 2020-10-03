import{x as t,m as s,i as a,h as e,p as c,o,y as n,P as f}from"./calfSystem-cf4d22a7.js"
import{g as r}from"./getInventoryById-c7da90ec.js"
import{g as m}from"./getArrayByClassName-9fa4b21c.js"
let i,l
function p(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&f(t)}function h(){const t=m("selectable-item",n(l+"-items"))
0!==t.length&&t.forEach(p)}function u(t){i=t.items
const n=s({className:"fshAC"})
a(n,'<button class="fshBl">Perfect</button>'),e(c,n),o(n,h)}function y(s){t()||(l=s,r().then(u))}export{y as p}
//# sourceMappingURL=perfFilter-0aa07c83.js.map
