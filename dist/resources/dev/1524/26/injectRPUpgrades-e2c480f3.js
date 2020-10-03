import{x as s,p as t,g as a,t as e,i as r}from"./calfSystem-4991bf5b.js"
import"./playerName-69861ead.js"
import"./idb-ee31c042.js"
import"./indexAjaxJson-b9139aa9.js"
import"./cmdExport-f5c9af35.js"
import"./getProfile-80a3e208.js"
import{m as o}from"./myStats-71b5ed12.js"
import{r as i}from"./reduceBuffArray-bd721314.js"
const n=/>\s*([ a-zA-Z]+) Level (\d+)/g,f=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function c(s,t){const{tipped:a}=t.dataset,e=[...a.matchAll(n)].filter(t=>s[t[1]]===Number(t[2]))
e.length>0&&r(t.parentNode,e.map(f).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&a("a",r.cells[0].children[0]).forEach(e(c,s))}(i(s._skills))}}function m(){s()||o(!0).then(l)}export default m
//# sourceMappingURL=injectRPUpgrades-e2c480f3.js.map
