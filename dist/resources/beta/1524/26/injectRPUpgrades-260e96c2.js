import{x as s,p as t,g as a,t as e,i as r}from"./calfSystem-cf4d22a7.js"
import"./playerName-b9ef36e6.js"
import"./idb-4798970d.js"
import"./indexAjaxJson-451a313a.js"
import"./cmdExport-b7dc8f76.js"
import"./getProfile-ff141b7e.js"
import{m as o}from"./myStats-a5a471c2.js"
import{r as i}from"./reduceBuffArray-bd721314.js"
const f=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function c(s,t){const{tipped:a}=t.dataset,e=[...a.matchAll(f)].filter(t=>s[t[1]]===Number(t[2]))
e.length>0&&r(t.parentNode,e.map(n).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&a("a",r.cells[0].children[0]).forEach(e(c,s))}(i(s._skills))}}function m(){s()||o(!0).then(l)}export default m
//# sourceMappingURL=injectRPUpgrades-260e96c2.js.map
