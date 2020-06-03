import{w as s,p as t,g as e,s as a,i as r}from"./calfSystem-4197cc22.js"
import"./playerName-8ec525d6.js"
import"./idb-f3252f63.js"
import"./indexAjaxJson-914501b6.js"
import"./cmdExport-ccb93370.js"
import"./getProfile-92484501.js"
import{m as o}from"./myStats-1e0221a4.js"
import{r as i}from"./reduceBuffArray-bcfdeffd.js"
const c=/>\s*([ a-zA-Z]+) Level (\d+)/g,f=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function n(s,t){const{tipped:e}=t.dataset,a=[...e.matchAll(c)].filter(t=>s[t[1]]===Number(t[2]))
a.length>0&&r(t.parentNode,a.map(f).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&e("a",r.cells[0].children[0]).forEach(a(n,s))}(i(s._skills))}}export default function(){s()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-ef80138d.js.map
