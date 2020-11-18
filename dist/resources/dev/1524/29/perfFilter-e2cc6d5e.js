import{x as t,m as s,i as e,h as a,p as o,o as c,y as f,Q as n}from"./calfSystem-02c48ff5.js"
import{g as r}from"./getInventoryById-d43a2fe1.js"
import{g as m}from"./getArrayByClassName-8897eb0e.js"
let i,l
function p(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&n(t)}function h(){const t=m("selectable-item",f(l+"-items"))
0!==t.length&&t.forEach(p)}function u(t){i=t.items
const f=s({className:"fshAC"})
e(f,'<button class="fshBl">Perfect</button>'),a(o,f),c(f,h)}function y(s){t()||(l=s,r().then(u))}export{y as p}
//# sourceMappingURL=perfFilter-e2cc6d5e.js.map
