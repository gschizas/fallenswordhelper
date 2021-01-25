import{x as s,p as t,g as a,t as e,i as r}from"./calfSystem-26bcf570.js"
import{m as o}from"./myStats-a894ba9e.js"
import{r as i}from"./reduceBuffArray-475bd752.js"
import"./getProfile-04622a4b.js"
import"./cmdExport-3b45fb85.js"
import"./indexAjaxJson-4dbe92a4.js"
import"./playerName-7d235e41.js"
import"./idb-47b3fdf8.js"
const n=/>\s*([ a-zA-Z]+) Level (\d+)/g,f=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function l(s,t){const{tipped:a}=t.dataset,e=[...a.matchAll(n)].filter((t=>s[t[1]]===Number(t[2])))
e.length>0&&r(t.parentNode,e.map(f).join(""))}function m(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&a("a",r.cells[0].children[0]).forEach(e(l,s))}(i(s._skills))}}function p(){s()||o(!0).then(m)}export default p
//# sourceMappingURL=injectRPUpgrades-709d18e8.js.map
