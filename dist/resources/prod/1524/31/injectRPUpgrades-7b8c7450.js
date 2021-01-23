import{x as s,p as t,g as e,t as a,i as r}from"./calfSystem-7aee5245.js"
import{m as o}from"./myStats-50112458.js"
import{r as i}from"./reduceBuffArray-931c7ed5.js"
import"./getProfile-d70516ae.js"
import"./cmdExport-ac019581.js"
import"./indexAjaxJson-d7e2ce82.js"
import"./playerName-87d03488.js"
import"./idb-12bca0fb.js"
const n=/>\s*([ a-zA-Z]+) Level (\d+)/g,c=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function l(s,t){const{tipped:e}=t.dataset,a=[...e.matchAll(n)].filter((t=>s[t[1]]===Number(t[2])))
a.length>0&&r(t.parentNode,a.map(c).join(""))}function m(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&e("a",r.cells[0].children[0]).forEach(a(l,s))}(i(s._skills))}}function p(){s()||o(!0).then(m)}export default p
//# sourceMappingURL=injectRPUpgrades-7b8c7450.js.map
