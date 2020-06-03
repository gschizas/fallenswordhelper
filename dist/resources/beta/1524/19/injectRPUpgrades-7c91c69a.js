import{w as s,p as t,g as a,s as e,i as r}from"./calfSystem-57340987.js"
import"./playerName-8027bacf.js"
import"./idb-c55e2904.js"
import"./indexAjaxJson-f0b26dd6.js"
import"./cmdExport-1b96d8bc.js"
import"./getProfile-63915fbf.js"
import{m as o}from"./myStats-aab3f9c7.js"
import{r as i}from"./reduceBuffArray-8f4ef76d.js"
const f=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function c(s,t){const{tipped:a}=t.dataset,e=[...a.matchAll(f)].filter(t=>s[t[1]]===Number(t[2]))
e.length>0&&r(t.parentNode,e.map(n).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&a("a",r.cells[0].children[0]).forEach(e(c,s))}(i(s._skills))}}export default function(){s()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-7c91c69a.js.map
