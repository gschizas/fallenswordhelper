import{C as t,m as e,g as r,G as s,M as n,y as a}from"./calfSystem-d3aab5a8.js"
import{n as o}from"./numberIsNaN-929de7af.js"
import{s as i}from"./setTipped-64e874d6.js"
import{t as f}from"./textNodes-512be06d.js"
const p=98,c=85,m=60
function d(t){return Number(n(a("stat-"+t.toLowerCase()).childNodes).filter(f).map(s).join(""))}function u(t){const n=e({innerHTML:t.dataset.tipped}),a=r("b",n).map(t=>s(t)),f=d(a[2])
o(f)||function(t,e,r){const s=d(e[3]),n=Math.floor(r*(Number(e[1].replace(/[+%]/g,""))/100))
i(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(n)}<br>${e[2]}: ${String(r-n)}&nbsp;&nbsp;${e[3]}: ${String(s+n)}$&`),t)}(t,a,f)}function b(e){const r=t(`#profileRightColumn img[src$="/${String(e)}.png"]`)
r&&u(r)}function g(){[p,c,m].forEach(b)}export default g
//# sourceMappingURL=updateBuffs-7f93c3a6.js.map
