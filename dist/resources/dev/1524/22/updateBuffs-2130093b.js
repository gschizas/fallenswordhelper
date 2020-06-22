import{C as t,m as e,g as r,K as s,M as n,y as o}from"./calfSystem-4cc738f8.js"
import{n as a}from"./numberIsNaN-1f5d9185.js"
import{s as i}from"./setTipped-cae99fc1.js"
import{t as f}from"./textNodes-51ab5ef0.js"
const c=98,p=85,m=60
function u(t){return Number(n(o("stat-"+t.toLowerCase()).childNodes).filter(f).map(s).join(""))}function d(t){const n=e({innerHTML:t.dataset.tipped}),o=r("b",n).map(t=>s(t)),f=u(o[2])
a(f)||function(t,e,r){const s=u(e[3]),n=Math.floor(r*(Number(e[1].replace(/[+%]/g,""))/100))
i(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(n)}<br>${e[2]}: ${String(r-n)}&nbsp;&nbsp;${e[3]}: ${String(s+n)}$&`),t)}(t,o,f)}function b(e){const r=t(`#profileRightColumn img[src$="/${String(e)}.png"]`)
r&&d(r)}export default function(){[c,p,m].forEach(b)}
//# sourceMappingURL=updateBuffs-2130093b.js.map
