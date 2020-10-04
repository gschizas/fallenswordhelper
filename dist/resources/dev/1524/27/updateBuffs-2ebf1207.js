import{C as t,m as e,g as r,G as s,M as n,y as o}from"./calfSystem-ec5e5725.js"
import{n as a}from"./numberIsNaN-871eca26.js"
import{s as i}from"./setTipped-141d3404.js"
import{t as c}from"./textNodes-259b48a7.js"
const f=98,p=85,m=60
function u(t){return Number(n(o("stat-"+t.toLowerCase()).childNodes).filter(c).map(s).join(""))}function d(t){const n=e({innerHTML:t.dataset.tipped}),o=r("b",n).map(t=>s(t)),c=u(o[2])
a(c)||function(t,e,r){const s=u(e[3]),n=Math.floor(r*(Number(e[1].replace(/[+%]/g,""))/100))
i(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(n)}<br>${e[2]}: ${String(r-n)}&nbsp;&nbsp;${e[3]}: ${String(s+n)}$&`),t)}(t,o,c)}function b(e){const r=t(`#profileRightColumn img[src$="/${String(e)}.png"]`)
r&&d(r)}function g(){[f,p,m].forEach(b)}export default g
//# sourceMappingURL=updateBuffs-2ebf1207.js.map
