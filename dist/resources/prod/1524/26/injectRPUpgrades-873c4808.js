import{x as a,p as s,g as t,t as e,i as r}from"./calfSystem-a5fc99d4.js"
import"./playerName-f44ad46e.js"
import"./idb-b13ab254.js"
import"./indexAjaxJson-a651394e.js"
import"./cmdExport-a361aa41.js"
import"./getProfile-5b3b85bb.js"
import{m as o}from"./myStats-5a69344c.js"
import{r as i}from"./reduceBuffArray-bd721314.js"
const n=/>\s*([ a-zA-Z]+) Level (\d+)/g,c=a=>`<br><span class="fshRed fshNoWrap">${a[1]} ${a[2]} active</span>`
function f(a,s){const{tipped:t}=s.dataset,e=[...t.matchAll(n)].filter(s=>a[s[1]]===Number(s[2]))
e.length>0&&r(s.parentNode,e.map(c).join(""))}function l(a){if(0!==a._skills.length){!function(a){const r=s.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(e(f,a))}(i(a._skills))}}function m(){a()||o(!0).then(l)}export default m
//# sourceMappingURL=injectRPUpgrades-873c4808.js.map
