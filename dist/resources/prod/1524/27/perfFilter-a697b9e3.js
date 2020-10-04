import{x as t,m as s,i as e,h as a,p as o,o as c,y as f,P as n}from"./calfSystem-3bdf319e.js"
import{g as r}from"./getInventoryById-2de7cef6.js"
import{g as m}from"./getArrayByClassName-1fb66d0d.js"
let i,l
function p(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&n(t)}function d(){const t=m("selectable-item",f(l+"-items"))
0!==t.length&&t.forEach(p)}function h(t){i=t.items
const f=s({className:"fshAC"})
e(f,'<button class="fshBl">Perfect</button>'),a(o,f),c(f,d)}function u(s){t()||(l=s,r().then(h))}export{u as p}
//# sourceMappingURL=perfFilter-a697b9e3.js.map
