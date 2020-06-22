import{C as t,m as a,g as r,K as s,M as e,y as n}from"./calfSystem-1b876afa.js"
import{n as o}from"./numberIsNaN-1ac731b5.js"
import{s as i}from"./setTipped-aa3fcf43.js"
import{t as f}from"./textNodes-b746dea5.js"
const c=98,p=85,m=60
function u(t){return Number(e(n("stat-"+t.toLowerCase()).childNodes).filter(f).map(s).join(""))}function b(t){const e=a({innerHTML:t.dataset.tipped}),n=r("b",e).map(t=>s(t)),f=u(n[2])
o(f)||function(t,a,r){const s=u(a[3]),e=Math.floor(r*(Number(a[1].replace(/[+%]/g,""))/100))
i(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(e)}<br>${a[2]}: ${String(r-e)}&nbsp;&nbsp;${a[3]}: ${String(s+e)}$&`),t)}(t,n,f)}function d(a){const r=t(`#profileRightColumn img[src$="/${String(a)}.png"]`)
r&&b(r)}export default function(){[c,p,m].forEach(d)}
//# sourceMappingURL=updateBuffs-dbff5e6c.js.map
