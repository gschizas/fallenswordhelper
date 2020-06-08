import{C as t,l as r,g as s,K as e,M as n,y as o}from"./calfSystem-a2862afc.js"
import{n as a}from"./numberIsNaN-77d06981.js"
import{s as i}from"./setTipped-4f77e47d.js"
import{t as f}from"./textNodes-9244d3f4.js"
const p=98,c=85,m=60
function d(t){return Number(n(o("stat-"+t.toLowerCase()).childNodes).filter(f).map(e).join(""))}function u(t){const n=r({innerHTML:t.dataset.tipped}),o=s("b",n).map(t=>e(t)),f=d(o[2])
a(f)||function(t,r,s){const e=d(r[3]),n=Math.floor(s*(Number(r[1].replace(/[+%]/g,""))/100))
i(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(n)}<br>${r[2]}: ${String(s-n)}&nbsp;&nbsp;${r[3]}: ${String(e+n)}$&`),t)}(t,o,f)}function l(r){const s=t(`#profileRightColumn img[src$="/${String(r)}.png"]`)
s&&u(s)}export default function(){[p,c,m].forEach(l)}
//# sourceMappingURL=updateBuffs-5a0b6d7e.js.map
