import{x as s,p as t,g as a,t as e,i as r}from"./calfSystem-71b9378d.js"
import"./playerName-17bbea9d.js"
import"./idb-97e2a44e.js"
import"./indexAjaxJson-fd3c427d.js"
import"./cmdExport-0ed34c6b.js"
import"./getProfile-63a4e7bf.js"
import{m as o}from"./myStats-84aa8b1d.js"
import{r as i}from"./reduceBuffArray-9c42f30d.js"
const n=/>\s*([ a-zA-Z]+) Level (\d+)/g,c=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function f(s,t){const{tipped:a}=t.dataset,e=[...a.matchAll(n)].filter(t=>s[t[1]]===Number(t[2]))
e.length>0&&r(t.parentNode,e.map(c).join(""))}function d(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&a("a",r.cells[0].children[0]).forEach(e(f,s))}(i(s._skills))}}function l(){s()||o(!0).then(d)}export default l
//# sourceMappingURL=injectRPUpgrades-65bbfea0.js.map
