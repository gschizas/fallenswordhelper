import{x as s,p as t,g as a,t as e,i as r}from"./calfSystem-a5da5210.js"
import"./playerName-22f2b3f0.js"
import"./idb-2c141566.js"
import"./indexAjaxJson-e64296df.js"
import"./cmdExport-7f82d72f.js"
import"./getProfile-9ac6489a.js"
import{m as o}from"./myStats-83be7f00.js"
import{r as i}from"./reduceBuffArray-f9edb55b.js"
const f=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function c(s,t){const{tipped:a}=t.dataset,e=[...a.matchAll(f)].filter(t=>s[t[1]]===Number(t[2]))
e.length>0&&r(t.parentNode,e.map(n).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&a("a",r.cells[0].children[0]).forEach(e(c,s))}(i(s._skills))}}function m(){s()||o(!0).then(l)}export default m
//# sourceMappingURL=injectRPUpgrades-9db45458.js.map
