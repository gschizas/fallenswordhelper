import{x as s,p as t,g as e,t as a,i as r}from"./calfSystem-2741d97b.js"
import"./playerName-5fbf0efe.js"
import"./idb-cb4fc9f9.js"
import"./indexAjaxJson-2aa42945.js"
import"./cmdExport-b57576c3.js"
import"./getProfile-4599c389.js"
import{m as o}from"./myStats-34e94e53.js"
import{r as i}from"./reduceBuffArray-02ee718a.js"
const f=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function c(s,t){const{tipped:e}=t.dataset,a=[...e.matchAll(f)].filter(t=>s[t[1]]===Number(t[2]))
a.length>0&&r(t.parentNode,a.map(n).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&e("a",r.cells[0].children[0]).forEach(a(c,s))}(i(s._skills))}}export default function(){s()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-83b7a40b.js.map
