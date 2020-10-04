import{C as t,m as r,g as s,G as e,M as n,y as o}from"./calfSystem-70c7a660.js"
import{n as a}from"./numberIsNaN-871eca26.js"
import{s as i}from"./setTipped-141d3404.js"
import{t as c}from"./textNodes-259b48a7.js"
const f=98,p=85,m=60
function u(t){return Number(n(o("stat-"+t.toLowerCase()).childNodes).filter(c).map(e).join(""))}function d(t){const n=r({innerHTML:t.dataset.tipped}),o=s("b",n).map(t=>e(t)),c=u(o[2])
a(c)||function(t,r,s){const e=u(r[3]),n=Math.floor(s*(Number(r[1].replace(/[+%]/g,""))/100))
i(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(n)}<br>${r[2]}: ${String(s-n)}&nbsp;&nbsp;${r[3]}: ${String(e+n)}$&`),t)}(t,o,c)}function b(r){const s=t(`#profileRightColumn img[src$="/${String(r)}.png"]`)
s&&d(s)}function g(){[f,p,m].forEach(b)}export default g
//# sourceMappingURL=updateBuffs-0ed8b303.js.map
