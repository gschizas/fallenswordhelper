import{x as s,p as t,g as a,t as e,i as r}from"./calfSystem-4cc738f8.js"
import"./playerName-2fd84b2a.js"
import"./idb-670c0cca.js"
import"./indexAjaxJson-39fb942e.js"
import"./cmdExport-3370ea6e.js"
import"./getProfile-29c38861.js"
import{m as o}from"./myStats-7b63c520.js"
import{r as c}from"./reduceBuffArray-055dacbb.js"
const i=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function f(s,t){const{tipped:a}=t.dataset,e=[...a.matchAll(i)].filter(t=>s[t[1]]===Number(t[2]))
e.length>0&&r(t.parentNode,e.map(n).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&a("a",r.cells[0].children[0]).forEach(e(f,s))}(c(s._skills))}}export default function(){s()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-443bed7d.js.map
