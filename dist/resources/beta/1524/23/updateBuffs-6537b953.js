import{C as t,m as r,g as s,K as e,M as n,y as o}from"./calfSystem-34fcd691.js"
import{n as a}from"./numberIsNaN-cb2409eb.js"
import{s as i}from"./setTipped-d4d554a0.js"
import{t as c}from"./textNodes-5ca3a193.js"
const f=98,p=85,m=60
function d(t){return Number(n(o("stat-"+t.toLowerCase()).childNodes).filter(c).map(e).join(""))}function u(t){const n=r({innerHTML:t.dataset.tipped}),o=s("b",n).map(t=>e(t)),c=d(o[2])
a(c)||function(t,r,s){const e=d(r[3]),n=Math.floor(s*(Number(r[1].replace(/[+%]/g,""))/100))
i(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(n)}<br>${r[2]}: ${String(s-n)}&nbsp;&nbsp;${r[3]}: ${String(e+n)}$&`),t)}(t,o,c)}function b(r){const s=t(`#profileRightColumn img[src$="/${String(r)}.png"]`)
s&&u(s)}export default function(){[f,p,m].forEach(b)}
//# sourceMappingURL=updateBuffs-6537b953.js.map
