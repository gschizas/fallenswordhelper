import{x as s,p as e,g as t,t as a,i as r}from"./calfSystem-019de1cf.js"
import"./playerName-569fc693.js"
import"./idb-1bb3cee2.js"
import"./indexAjaxJson-d1b1f9ac.js"
import"./cmdExport-ca1fffed.js"
import"./getProfile-88b6b0f8.js"
import{m as o}from"./myStats-8f657323.js"
import{r as f}from"./reduceBuffArray-6eeea593.js"
const i=/>\s*([ a-zA-Z]+) Level (\d+)/g,c=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function n(s,e){const{tipped:t}=e.dataset,a=[...t.matchAll(i)].filter(e=>s[e[1]]===Number(e[2]))
a.length>0&&r(e.parentNode,a.map(c).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=e.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(a(n,s))}(f(s._skills))}}export default function(){s()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-cdbbad79.js.map
