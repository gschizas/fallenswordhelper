import{x as t,m as s,i as a,h as e,p as o,o as f,y as n,Q as c}from"./calfSystem-45544049.js"
import{g as r}from"./getArrayByClassName-b62a000f.js"
import{g as m}from"./getInventoryById-610482ff.js"
let i,l
function p(t){const s=t.id.replace(`${l}-item-`,"")
i[s]&&"Perfect"===i[s].craft&&c(t)}function h(){const t=r("selectable-item",n(`${l}-items`))
0!==t.length&&t.forEach(p)}function u(t){i=t.items
const n=s({className:"fshAC"})
a(n,'<button class="fshBl">Perfect</button>'),e(o,n),f(n,h)}function y(s){t()||(l=s,m().then(u))}export{y as p}
//# sourceMappingURL=perfFilter-f4b85c24.js.map
