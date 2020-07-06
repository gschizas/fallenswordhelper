import{x as s,p as t,g as a,t as e,i as r}from"./calfSystem-34fcd691.js"
import"./playerName-d0ea3aa5.js"
import"./idb-62d2605f.js"
import"./indexAjaxJson-951ebca2.js"
import"./cmdExport-963c885b.js"
import"./getProfile-5811c437.js"
import{m as o}from"./myStats-f933dc68.js"
import{r as i}from"./reduceBuffArray-6eeea593.js"
const c=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function f(s,t){const{tipped:a}=t.dataset,e=[...a.matchAll(c)].filter(t=>s[t[1]]===Number(t[2]))
e.length>0&&r(t.parentNode,e.map(n).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&a("a",r.cells[0].children[0]).forEach(e(f,s))}(i(s._skills))}}export default function(){s()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-2e7f43b0.js.map
