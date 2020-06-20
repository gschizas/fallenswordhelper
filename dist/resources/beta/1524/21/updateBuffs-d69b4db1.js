import{C as t,m as e,g as r,K as s,M as n,y as o}from"./calfSystem-89b939c8.js"
import{n as a}from"./numberIsNaN-913aebac.js"
import{s as i}from"./setTipped-3dfbd3ed.js"
import{t as f}from"./textNodes-44e86a4b.js"
const c=98,p=85,m=60
function d(t){return Number(n(o("stat-"+t.toLowerCase()).childNodes).filter(f).map(s).join(""))}function b(t){const n=e({innerHTML:t.dataset.tipped}),o=r("b",n).map(t=>s(t)),f=d(o[2])
a(f)||function(t,e,r){const s=d(e[3]),n=Math.floor(r*(Number(e[1].replace(/[+%]/g,""))/100))
i(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(n)}<br>${e[2]}: ${String(r-n)}&nbsp;&nbsp;${e[3]}: ${String(s+n)}$&`),t)}(t,o,f)}function u(e){const r=t(`#profileRightColumn img[src$="/${String(e)}.png"]`)
r&&b(r)}export default function(){[c,p,m].forEach(u)}
//# sourceMappingURL=updateBuffs-d69b4db1.js.map
