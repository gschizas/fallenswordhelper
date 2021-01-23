import{C as t,m as e,g as n,G as o,M as r,y as s}from"./calfSystem-7aee5245.js"
import{n as i}from"./numberIsNaN-53300e34.js"
import{s as a}from"./setTipped-777d443c.js"
function f(t){if(t instanceof Node)return t.nodeType===Node.TEXT_NODE}const c=98,p=85,m=60
function u(t){return Number(r(s(`stat-${t.toLowerCase()}`).childNodes).filter(f).map(o).join(""))}function d(t){const r=e({innerHTML:t.dataset.tipped}),s=n("b",r).map((t=>o(t))),f=u(s[2])
i(f)||function(t,e,n){const o=u(e[3]),r=Math.floor(n*(Number(e[1].replace(/[+%]/g,""))/100))
a(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(r)}<br>${e[2]}: ${String(n-r)}&nbsp;&nbsp;${e[3]}: ${String(o+r)}$&`),t)}(t,s,f)}function g(e){const n=t(`#profileRightColumn img[src$="/${String(e)}.png"]`)
n&&d(n)}function l(){[c,p,m].forEach(g)}export default l
//# sourceMappingURL=updateBuffs-0c39948e.js.map
