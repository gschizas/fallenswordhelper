import{x as s,p as a,g as t,t as e,i as r}from"./calfSystem-3bdf319e.js"
import"./playerName-26a1f7d9.js"
import"./idb-31fb041e.js"
import"./indexAjaxJson-5033dc48.js"
import"./cmdExport-7ba590c1.js"
import"./getProfile-ca7df963.js"
import{m as o}from"./myStats-af133fa4.js"
import{r as i}from"./reduceBuffArray-45edadf4.js"
const f=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function c(s,a){const{tipped:t}=a.dataset,e=[...t.matchAll(f)].filter(a=>s[a[1]]===Number(a[2]))
e.length>0&&r(a.parentNode,e.map(n).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=a.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(e(c,s))}(i(s._skills))}}function m(){s()||o(!0).then(l)}export default m
//# sourceMappingURL=injectRPUpgrades-93796411.js.map
