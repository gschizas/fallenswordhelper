import{C as t,m as e,g as r,G as s,M as n,y as o}from"./calfSystem-4991bf5b.js"
import{n as a}from"./numberIsNaN-a6bcb044.js"
import{s as i}from"./setTipped-7d31935e.js"
import{t as f}from"./textNodes-6e058198.js"
const p=98,c=85,m=60
function b(t){return Number(n(o("stat-"+t.toLowerCase()).childNodes).filter(f).map(s).join(""))}function u(t){const n=e({innerHTML:t.dataset.tipped}),o=r("b",n).map(t=>s(t)),f=b(o[2])
a(f)||function(t,e,r){const s=b(e[3]),n=Math.floor(r*(Number(e[1].replace(/[+%]/g,""))/100))
i(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(n)}<br>${e[2]}: ${String(r-n)}&nbsp;&nbsp;${e[3]}: ${String(s+n)}$&`),t)}(t,o,f)}function d(e){const r=t(`#profileRightColumn img[src$="/${String(e)}.png"]`)
r&&u(r)}function g(){[p,c,m].forEach(d)}export default g
//# sourceMappingURL=updateBuffs-ddb95ac8.js.map
