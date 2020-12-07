import{x as t,m as s,i as e,h as a,p as o,o as n,y as c,P as f}from"./calfSystem-ebf4b17d.js"
import{g as r}from"./getInventoryById-d902b49d.js"
import{g as m}from"./getArrayByClassName-f55d7526.js"
let i,l
function p(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&f(t)}function b(){const t=m("selectable-item",c(l+"-items"))
0!==t.length&&t.forEach(p)}function d(t){i=t.items
const c=s({className:"fshAC"})
e(c,'<button class="fshBl">Perfect</button>'),a(o,c),n(c,b)}function h(s){t()||(l=s,r().then(d))}export{h as p}
//# sourceMappingURL=perfFilter-e8973f26.js.map
