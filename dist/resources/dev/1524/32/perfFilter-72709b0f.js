import{x as t,m as s,i as a,h as e,p as c,o,y as n,R as f}from"./calfSystem-19a5d332.js"
import{g as r}from"./getArrayByClassName-8cefca3b.js"
import{g as m}from"./getInventoryById-3a7785c2.js"
let i,l
function p(t){const s=t.id.replace(`${l}-item-`,"")
i[s]&&"Perfect"===i[s].craft&&f(t)}function h(){const t=r("selectable-item",n(`${l}-items`))
0!==t.length&&t.forEach(p)}function u(t){i=t.items
const n=s({className:"fshAC"})
a(n,'<button class="fshBl">Perfect</button>'),e(c,n),o(n,h)}function y(s){t()||(l=s,m().then(u))}export{y as p}
//# sourceMappingURL=perfFilter-72709b0f.js.map
