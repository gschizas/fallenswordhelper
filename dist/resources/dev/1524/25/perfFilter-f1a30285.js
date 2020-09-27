import{x as t,m as s,i as e,h as a,p as o,o as c,y as f,Q as n}from"./calfSystem-69dd5601.js"
import{g as r}from"./getInventoryById-e46f5fa9.js"
import{g as m}from"./getArrayByClassName-0f29c742.js"
let i,l
function p(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&n(t)}function h(){const t=m("selectable-item",f(l+"-items"))
0!==t.length&&t.forEach(p)}function u(t){i=t.items
const f=s({className:"fshAC"})
e(f,'<button class="fshBl">Perfect</button>'),a(o,f),c(f,h)}function y(s){t()||(l=s,r().then(u))}export{y as p}
//# sourceMappingURL=perfFilter-f1a30285.js.map
