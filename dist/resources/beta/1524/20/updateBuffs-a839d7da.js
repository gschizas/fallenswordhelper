import{C as t,l as e,g as r,K as s,M as n,y as o}from"./calfSystem-05554bae.js"
import{n as a}from"./numberIsNaN-d04aa9f7.js"
import{s as i}from"./setTipped-227f970f.js"
import{t as f}from"./textNodes-cb3ee45c.js"
const c=98,p=85,m=60
function u(t){return Number(n(o("stat-"+t.toLowerCase()).childNodes).filter(f).map(s).join(""))}function d(t){const n=e({innerHTML:t.dataset.tipped}),o=r("b",n).map(t=>s(t)),f=u(o[2])
a(f)||function(t,e,r){const s=u(e[3]),n=Math.floor(r*(Number(e[1].replace(/[+%]/g,""))/100))
i(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(n)}<br>${e[2]}: ${String(r-n)}&nbsp;&nbsp;${e[3]}: ${String(s+n)}$&`),t)}(t,o,f)}function b(e){const r=t(`#profileRightColumn img[src$="/${String(e)}.png"]`)
r&&d(r)}export default function(){[c,p,m].forEach(b)}
//# sourceMappingURL=updateBuffs-a839d7da.js.map
