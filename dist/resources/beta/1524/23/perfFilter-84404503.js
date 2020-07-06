import{x as t,m as s,i as a,h as e,p as o,o as c,y as f,Q as n}from"./calfSystem-34fcd691.js"
import{g as r}from"./getInventoryById-60064bf6.js"
import{g as m}from"./getArrayByClassName-674a825f.js"
let i,l
function p(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&n(t)}function h(){const t=m("selectable-item",f(l+"-items"))
0!==t.length&&t.forEach(p)}function u(t){i=t.items
const f=s({className:"fshAC"})
a(f,'<button class="fshBl">Perfect</button>'),e(o,f),c(f,h)}function y(s){t()||(l=s,r().then(u))}export{y as p}
//# sourceMappingURL=perfFilter-84404503.js.map
