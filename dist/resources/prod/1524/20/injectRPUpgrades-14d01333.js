import{x as s,p as t,g as a,t as e,i as r}from"./calfSystem-03970067.js"
import"./playerName-e0979c8e.js"
import"./idb-3dad9172.js"
import"./indexAjaxJson-d04ad897.js"
import"./cmdExport-4773c3fd.js"
import"./getProfile-f312a4e1.js"
import{m as o}from"./myStats-a0140457.js"
import{r as i}from"./reduceBuffArray-9203fbe6.js"
const n=/>\s*([ a-zA-Z]+) Level (\d+)/g,f=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function c(s,t){const{tipped:a}=t.dataset,e=[...a.matchAll(n)].filter(t=>s[t[1]]===Number(t[2]))
e.length>0&&r(t.parentNode,e.map(f).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&a("a",r.cells[0].children[0]).forEach(e(c,s))}(i(s._skills))}}export default function(){s()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-14d01333.js.map
