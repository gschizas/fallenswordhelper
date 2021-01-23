import{x as s,p as t,g as a,t as e,i as r}from"./calfSystem-47fc08ae.js"
import{m as o}from"./myStats-220f9380.js"
import{r as i}from"./reduceBuffArray-931c7ed5.js"
import"./getProfile-a2615c2b.js"
import"./cmdExport-ca6a6b3e.js"
import"./indexAjaxJson-be24760c.js"
import"./playerName-118d0325.js"
import"./idb-b72d80f0.js"
const c=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function f(s,t){const{tipped:a}=t.dataset,e=[...a.matchAll(c)].filter((t=>s[t[1]]===Number(t[2])))
e.length>0&&r(t.parentNode,e.map(n).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&a("a",r.cells[0].children[0]).forEach(e(f,s))}(i(s._skills))}}function m(){s()||o(!0).then(l)}export default m
//# sourceMappingURL=injectRPUpgrades-b73cabf5.js.map
