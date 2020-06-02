import{w as s,p as e,g as t,s as a,i as r}from"./calfSystem-dec5e071.js"
import"./playerName-aa4fbcf3.js"
import"./idb-8fe34e30.js"
import"./indexAjaxJson-ecf8d1f5.js"
import"./cmdExport-965d881b.js"
import"./getProfile-f1e3acc1.js"
import{m as o}from"./myStats-6490dbe4.js"
import{r as i}from"./reduceBuffArray-8d591e36.js"
const f=/>\s*([ a-zA-Z]+) Level (\d+)/g,c=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function n(s,e){const{tipped:t}=e.dataset,a=[...t.matchAll(f)].filter(e=>s[e[1]]===Number(e[2]))
a.length>0&&r(e.parentNode,a.map(c).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=e.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(a(n,s))}(i(s._skills))}}export default function(){s()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-0a78a405.js.map
