import{C as t,m as r,g as s,K as e,M as n,y as a}from"./calfSystem-9901ad27.js"
import{n as o}from"./numberIsNaN-cb2409eb.js"
import{s as i}from"./setTipped-d4d554a0.js"
import{t as c}from"./textNodes-5ca3a193.js"
const f=98,p=85,m=60
function d(t){return Number(n(a("stat-"+t.toLowerCase()).childNodes).filter(c).map(e).join(""))}function u(t){const n=r({innerHTML:t.dataset.tipped}),a=s("b",n).map(t=>e(t)),c=d(a[2])
o(c)||function(t,r,s){const e=d(r[3]),n=Math.floor(s*(Number(r[1].replace(/[+%]/g,""))/100))
i(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(n)}<br>${r[2]}: ${String(s-n)}&nbsp;&nbsp;${r[3]}: ${String(e+n)}$&`),t)}(t,a,c)}function b(r){const s=t(`#profileRightColumn img[src$="/${String(r)}.png"]`)
s&&u(s)}export default function(){[f,p,m].forEach(b)}
//# sourceMappingURL=updateBuffs-f6e1cfae.js.map
