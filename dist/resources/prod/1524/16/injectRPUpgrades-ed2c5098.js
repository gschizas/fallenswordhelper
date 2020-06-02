import{w as s,p as t,g as e,s as a,i as r}from"./calfSystem-be09bdff.js"
import"./playerName-73d6a463.js"
import"./idb-a63ec135.js"
import"./indexAjaxJson-f8cc1f1e.js"
import"./cmdExport-8189e42d.js"
import"./getProfile-394c4f03.js"
import{m as o}from"./myStats-c8681855.js"
import{r as i}from"./reduceBuffArray-e1a4c684.js"
const c=/>\s*([ a-zA-Z]+) Level (\d+)/g,f=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function n(s,t){const{tipped:e}=t.dataset,a=[...e.matchAll(c)].filter(t=>s[t[1]]===Number(t[2]))
a.length>0&&r(t.parentNode,a.map(f).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&e("a",r.cells[0].children[0]).forEach(a(n,s))}(i(s._skills))}}export default function(){s()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-ed2c5098.js.map
