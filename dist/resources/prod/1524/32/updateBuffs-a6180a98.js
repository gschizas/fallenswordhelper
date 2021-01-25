import{C as t,m as e,g as n,G as o,M as r,y as s}from"./calfSystem-45544049.js"
import{n as i}from"./numberIsNaN-fecd7e6d.js"
import{s as a}from"./setTipped-808b71de.js"
function f(t){if(t instanceof Node)return t.nodeType===Node.TEXT_NODE}const c=98,p=85,d=60
function m(t){return Number(r(s(`stat-${t.toLowerCase()}`).childNodes).filter(f).map(o).join(""))}function u(t){const r=e({innerHTML:t.dataset.tipped}),s=n("b",r).map((t=>o(t))),f=m(s[2])
i(f)||function(t,e,n){const o=m(e[3]),r=Math.floor(n*(Number(e[1].replace(/[+%]/g,""))/100))
a(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(r)}<br>${e[2]}: ${String(n-r)}&nbsp;&nbsp;${e[3]}: ${String(o+r)}$&`),t)}(t,s,f)}function b(e){const n=t(`#profileRightColumn img[src$="/${String(e)}.png"]`)
n&&u(n)}function g(){[c,p,d].forEach(b)}export default g
//# sourceMappingURL=updateBuffs-a6180a98.js.map
