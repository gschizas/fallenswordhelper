import{x as s,p as t,g as a,t as e,i as r}from"./calfSystem-393ab895.js"
import{m as o}from"./myStats-6e633ab7.js"
import{r as i}from"./reduceBuffArray-931c7ed5.js"
import"./getProfile-9a170510.js"
import"./cmdExport-ef0399c5.js"
import"./indexAjaxJson-f78a3fe6.js"
import"./playerName-03162bd7.js"
import"./idb-46b78b1e.js"
const n=/>\s*([ a-zA-Z]+) Level (\d+)/g,f=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function c(s,t){const{tipped:a}=t.dataset,e=[...a.matchAll(n)].filter((t=>s[t[1]]===Number(t[2])))
e.length>0&&r(t.parentNode,e.map(f).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&a("a",r.cells[0].children[0]).forEach(e(c,s))}(i(s._skills))}}function m(){s()||o(!0).then(l)}export default m
//# sourceMappingURL=injectRPUpgrades-5c5bbb1d.js.map
