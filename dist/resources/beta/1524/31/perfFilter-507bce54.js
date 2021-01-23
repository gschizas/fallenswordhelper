import{x as t,m as s,i as a,h as e,p as c,o,y as n,P as f}from"./calfSystem-47fc08ae.js"
import{g as r}from"./getArrayByClassName-2a13cfae.js"
import{g as m}from"./getInventoryById-216cdd3b.js"
let i,l
function p(t){const s=t.id.replace(`${l}-item-`,"")
i[s]&&"Perfect"===i[s].craft&&f(t)}function h(){const t=r("selectable-item",n(`${l}-items`))
0!==t.length&&t.forEach(p)}function u(t){i=t.items
const n=s({className:"fshAC"})
a(n,'<button class="fshBl">Perfect</button>'),e(c,n),o(n,h)}function y(s){t()||(l=s,m().then(u))}export{y as p}
//# sourceMappingURL=perfFilter-507bce54.js.map
