import{x as s,p as t,g as a,t as e,i as r}from"./calfSystem-45544049.js"
import{m as o}from"./myStats-81d199a4.js"
import{r as i}from"./reduceBuffArray-475bd752.js"
import"./getProfile-bf9417e3.js"
import"./cmdExport-4fdfd8a3.js"
import"./indexAjaxJson-e79ad7ee.js"
import"./playerName-c1bcaeb9.js"
import"./idb-ca3578bc.js"
const n=/>\s*([ a-zA-Z]+) Level (\d+)/g,c=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function f(s,t){const{tipped:a}=t.dataset,e=[...a.matchAll(n)].filter((t=>s[t[1]]===Number(t[2])))
e.length>0&&r(t.parentNode,e.map(c).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&a("a",r.cells[0].children[0]).forEach(e(f,s))}(i(s._skills))}}function m(){s()||o(!0).then(l)}export default m
//# sourceMappingURL=injectRPUpgrades-91ba7bed.js.map
