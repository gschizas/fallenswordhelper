import{x as s,p as t,g as a,t as e,i as r}from"./calfSystem-69dd5601.js"
import"./playerName-688c2cbc.js"
import"./idb-874fe815.js"
import"./indexAjaxJson-2e5777a1.js"
import"./cmdExport-88c93b51.js"
import"./getProfile-6a2bd83d.js"
import{m as o}from"./myStats-84112137.js"
import{r as i}from"./reduceBuffArray-9c42f30d.js"
const c=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function f(s,t){const{tipped:a}=t.dataset,e=[...a.matchAll(c)].filter(t=>s[t[1]]===Number(t[2]))
e.length>0&&r(t.parentNode,e.map(n).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&a("a",r.cells[0].children[0]).forEach(e(f,s))}(i(s._skills))}}function m(){s()||o(!0).then(l)}export default m
//# sourceMappingURL=injectRPUpgrades-9943fb5c.js.map
