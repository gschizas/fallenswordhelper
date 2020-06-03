import{w as s,p as a,g as t,s as e,i as r}from"./calfSystem-5545a3e6.js"
import"./playerName-546a1209.js"
import"./idb-ab1a88c6.js"
import"./indexAjaxJson-06c0d970.js"
import"./cmdExport-2a172ff1.js"
import"./getProfile-462e8b38.js"
import{m as o}from"./myStats-f536bf5b.js"
import{r as i}from"./reduceBuffArray-46549e25.js"
const n=/>\s*([ a-zA-Z]+) Level (\d+)/g,f=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function c(s,a){const{tipped:t}=a.dataset,e=[...t.matchAll(n)].filter(a=>s[a[1]]===Number(a[2]))
e.length>0&&r(a.parentNode,e.map(f).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=a.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(e(c,s))}(i(s._skills))}}export default function(){s()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-d897a4ed.js.map
