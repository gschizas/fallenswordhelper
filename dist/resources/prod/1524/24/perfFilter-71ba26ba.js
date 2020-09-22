import{x as t,m as s,i as e,h as a,p as c,o,y as f,Q as n}from"./calfSystem-ec854151.js"
import{g as r}from"./getInventoryById-cd437dff.js"
import{g as m}from"./getArrayByClassName-99588fac.js"
let i,l
function p(t){const s=t.id.replace(l+"-item-","")
i[s]&&"Perfect"===i[s].craft&&n(t)}function h(){const t=m("selectable-item",f(l+"-items"))
0!==t.length&&t.forEach(p)}function u(t){i=t.items
const f=s({className:"fshAC"})
e(f,'<button class="fshBl">Perfect</button>'),a(c,f),o(f,h)}function y(s){t()||(l=s,r().then(u))}export{y as p}
//# sourceMappingURL=perfFilter-71ba26ba.js.map
