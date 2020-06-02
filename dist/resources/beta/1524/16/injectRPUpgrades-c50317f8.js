import{w as s,p as a,g as t,s as e,i as r}from"./calfSystem-9554b525.js"
import"./playerName-855f1e8d.js"
import"./idb-e27acc21.js"
import"./indexAjaxJson-24e555fb.js"
import"./cmdExport-d8ee0a12.js"
import"./getProfile-7babcba2.js"
import{m as o}from"./myStats-3ad83ab7.js"
import{r as i}from"./reduceBuffArray-f61f9d1c.js"
const n=/>\s*([ a-zA-Z]+) Level (\d+)/g,c=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function f(s,a){const{tipped:t}=a.dataset,e=[...t.matchAll(n)].filter(a=>s[a[1]]===Number(a[2]))
e.length>0&&r(a.parentNode,e.map(c).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=a.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(e(f,s))}(i(s._skills))}}export default function(){s()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-c50317f8.js.map
