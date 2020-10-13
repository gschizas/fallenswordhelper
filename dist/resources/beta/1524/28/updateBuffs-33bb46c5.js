import{C as t,m as e,g as r,G as s,M as n,y as o}from"./calfSystem-964f4fc9.js"
import{n as a}from"./numberIsNaN-91041dcf.js"
import{s as f}from"./setTipped-e5305fe4.js"
import{t as i}from"./textNodes-179114f5.js"
const c=98,p=85,m=60
function u(t){return Number(n(o("stat-"+t.toLowerCase()).childNodes).filter(i).map(s).join(""))}function d(t){const n=e({innerHTML:t.dataset.tipped}),o=r("b",n).map(t=>s(t)),i=u(o[2])
a(i)||function(t,e,r){const s=u(e[3]),n=Math.floor(r*(Number(e[1].replace(/[+%]/g,""))/100))
f(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(n)}<br>${e[2]}: ${String(r-n)}&nbsp;&nbsp;${e[3]}: ${String(s+n)}$&`),t)}(t,o,i)}function g(e){const r=t(`#profileRightColumn img[src$="/${String(e)}.png"]`)
r&&d(r)}function l(){[c,p,m].forEach(g)}export default l
//# sourceMappingURL=updateBuffs-33bb46c5.js.map
