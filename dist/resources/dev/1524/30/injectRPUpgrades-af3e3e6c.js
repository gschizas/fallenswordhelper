import{x as s,p as t,g as e,t as r,i as a}from"./calfSystem-54df10e3.js"
import"./playerName-8f1e4e48.js"
import"./idb-7f0d2b39.js"
import"./indexAjaxJson-9f23f983.js"
import"./cmdExport-064541e3.js"
import"./getProfile-7795dbc9.js"
import{m as o}from"./myStats-e2765689.js"
import{r as i}from"./reduceBuffArray-77073669.js"
const f=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function l(s,t){const{tipped:e}=t.dataset,r=[...e.matchAll(f)].filter(t=>s[t[1]]===Number(t[2]))
r.length>0&&a(t.parentNode,r.map(n).join(""))}function m(s){if(0!==s._skills.length){!function(s){const a=t.children[0].rows[9]
a&&e("a",a.cells[0].children[0]).forEach(r(l,s))}(i(s._skills))}}function p(){s()||o(!0).then(m)}export default p
//# sourceMappingURL=injectRPUpgrades-af3e3e6c.js.map
