import{x as s,p as a,g as t,t as e,i as r}from"./calfSystem-6459f18a.js"
import"./playerName-d1c3e398.js"
import"./idb-737f325b.js"
import"./indexAjaxJson-14aa1022.js"
import"./cmdExport-7faecab1.js"
import"./getProfile-65933826.js"
import{m as o}from"./myStats-2518aba3.js"
import{r as i}from"./reduceBuffArray-77073669.js"
const n=/>\s*([ a-zA-Z]+) Level (\d+)/g,f=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function c(s,a){const{tipped:t}=a.dataset,e=[...t.matchAll(n)].filter(a=>s[a[1]]===Number(a[2]))
e.length>0&&r(a.parentNode,e.map(f).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=a.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(e(c,s))}(i(s._skills))}}function m(){s()||o(!0).then(l)}export default m
//# sourceMappingURL=injectRPUpgrades-76031363.js.map
