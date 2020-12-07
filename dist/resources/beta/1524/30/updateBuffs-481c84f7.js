import{C as t,m as r,g as s,G as e,M as n,y as o}from"./calfSystem-ebf4b17d.js"
import{n as a}from"./numberIsNaN-fa7d637d.js"
import{s as i}from"./setTipped-c3fa7f51.js"
import{t as f}from"./textNodes-0d3bc9d5.js"
const c=98,p=85,m=60
function d(t){return Number(n(o("stat-"+t.toLowerCase()).childNodes).filter(f).map(e).join(""))}function u(t){const n=r({innerHTML:t.dataset.tipped}),o=s("b",n).map(t=>e(t)),f=d(o[2])
a(f)||function(t,r,s){const e=d(r[3]),n=Math.floor(s*(Number(r[1].replace(/[+%]/g,""))/100))
i(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(n)}<br>${r[2]}: ${String(s-n)}&nbsp;&nbsp;${r[3]}: ${String(e+n)}$&`),t)}(t,o,f)}function b(r){const s=t(`#profileRightColumn img[src$="/${String(r)}.png"]`)
s&&u(s)}function g(){[c,p,m].forEach(b)}export default g
//# sourceMappingURL=updateBuffs-481c84f7.js.map
