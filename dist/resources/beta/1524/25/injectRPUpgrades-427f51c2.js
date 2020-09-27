import{x as s,p as a,g as t,t as e,i as r}from"./calfSystem-d3aab5a8.js"
import"./playerName-6a2b4679.js"
import"./idb-f33380fa.js"
import"./indexAjaxJson-86b35353.js"
import"./cmdExport-806d42e0.js"
import"./getProfile-e3b95fab.js"
import{m as o}from"./myStats-aed09f57.js"
import{r as i}from"./reduceBuffArray-9c42f30d.js"
const f=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function l(s,a){const{tipped:t}=a.dataset,e=[...t.matchAll(f)].filter(a=>s[a[1]]===Number(a[2]))
e.length>0&&r(a.parentNode,e.map(n).join(""))}function m(s){if(0!==s._skills.length){!function(s){const r=a.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(e(l,s))}(i(s._skills))}}function p(){s()||o(!0).then(m)}export default p
//# sourceMappingURL=injectRPUpgrades-427f51c2.js.map
