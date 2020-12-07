import{C as t,m as n,g as e,G as o,M as r,y as s}from"./calfSystem-6459f18a.js"
import{n as a}from"./numberIsNaN-fa7d637d.js"
import{s as i}from"./setTipped-c3fa7f51.js"
function f(t){if(t instanceof Node)return t.nodeType===Node.TEXT_NODE}const c=98,p=85,m=60
function d(t){return Number(r(s("stat-"+t.toLowerCase()).childNodes).filter(f).map(o).join(""))}function u(t){const r=n({innerHTML:t.dataset.tipped}),s=e("b",r).map(t=>o(t)),f=d(s[2])
a(f)||function(t,n,e){const o=d(n[3]),r=Math.floor(e*(Number(n[1].replace(/[+%]/g,""))/100))
i(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(r)}<br>${n[2]}: ${String(e-r)}&nbsp;&nbsp;${n[3]}: ${String(o+r)}$&`),t)}(t,s,f)}function g(n){const e=t(`#profileRightColumn img[src$="/${String(n)}.png"]`)
e&&u(e)}function l(){[c,p,m].forEach(g)}export default l
//# sourceMappingURL=updateBuffs-365981bc.js.map
