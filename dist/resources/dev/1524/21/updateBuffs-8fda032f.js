import{C as t,m as e,g as r,K as s,M as n,y as o}from"./calfSystem-9c7241dc.js"
import{n as a}from"./numberIsNaN-7270cc8c.js"
import{s as i}from"./setTipped-df312394.js"
import{t as c}from"./textNodes-deb2ead1.js"
const f=98,p=85,m=60
function d(t){return Number(n(o("stat-"+t.toLowerCase()).childNodes).filter(c).map(s).join(""))}function u(t){const n=e({innerHTML:t.dataset.tipped}),o=r("b",n).map(t=>s(t)),c=d(o[2])
a(c)||function(t,e,r){const s=d(e[3]),n=Math.floor(r*(Number(e[1].replace(/[+%]/g,""))/100))
i(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(n)}<br>${e[2]}: ${String(r-n)}&nbsp;&nbsp;${e[3]}: ${String(s+n)}$&`),t)}(t,o,c)}function b(e){const r=t(`#profileRightColumn img[src$="/${String(e)}.png"]`)
r&&u(r)}export default function(){[f,p,m].forEach(b)}
//# sourceMappingURL=updateBuffs-8fda032f.js.map
