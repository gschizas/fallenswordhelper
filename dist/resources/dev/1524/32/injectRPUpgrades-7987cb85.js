import{x as s,p as t,g as a,t as e,i as r}from"./calfSystem-19a5d332.js"
import{m as o}from"./myStats-1a3a33f7.js"
import{r as i}from"./reduceBuffArray-475bd752.js"
import"./getProfile-d128b80b.js"
import"./cmdExport-bf03c29e.js"
import"./indexAjaxJson-bdfce70d.js"
import"./playerName-09521e4e.js"
import"./idb-faef0351.js"
const f=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function c(s,t){const{tipped:a}=t.dataset,e=[...a.matchAll(f)].filter((t=>s[t[1]]===Number(t[2])))
e.length>0&&r(t.parentNode,e.map(n).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&a("a",r.cells[0].children[0]).forEach(e(c,s))}(i(s._skills))}}function m(){s()||o(!0).then(l)}export default m
//# sourceMappingURL=injectRPUpgrades-7987cb85.js.map
