import{w as a,p as s,g as t,s as e,i as r}from"./calfSystem-8b6534a5.js"
import"./playerName-bb9c2b65.js"
import"./idb-abce8d8d.js"
import"./indexAjaxJson-b43ddbcc.js"
import"./cmdExport-a4cd29b8.js"
import"./getProfile-7daaa2a5.js"
import{m as o}from"./myStats-eb7eae50.js"
import{r as i}from"./reduceBuffArray-16ae7db9.js"
const c=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=a=>`<br><span class="fshRed fshNoWrap">${a[1]} ${a[2]} active</span>`
function d(a,s){const{tipped:t}=s.dataset,e=[...t.matchAll(c)].filter(s=>a[s[1]]===Number(s[2]))
e.length>0&&r(s.parentNode,e.map(n).join(""))}function l(a){if(0!==a._skills.length){!function(a){const r=s.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(e(d,a))}(i(a._skills))}}export default function(){a()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-e405d5a9.js.map
