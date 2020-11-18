import{x as s,p as t,g as a,t as e,i as r}from"./calfSystem-f9a27018.js"
import"./playerName-6c5f1f5b.js"
import"./idb-5c501cd3.js"
import"./indexAjaxJson-e32f2264.js"
import"./cmdExport-c40c0dde.js"
import"./getProfile-f70d5e2d.js"
import{m as o}from"./myStats-f6662cd8.js"
import{r as i}from"./reduceBuffArray-793b77a6.js"
const c=/>\s*([ a-zA-Z]+) Level (\d+)/g,f=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function n(s,t){const{tipped:a}=t.dataset,e=[...a.matchAll(c)].filter(t=>s[t[1]]===Number(t[2]))
e.length>0&&r(t.parentNode,e.map(f).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&a("a",r.cells[0].children[0]).forEach(e(n,s))}(i(s._skills))}}function m(){s()||o(!0).then(l)}export default m
//# sourceMappingURL=injectRPUpgrades-504dc439.js.map
