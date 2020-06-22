import{x as s,p as e,g as t,t as a,i as r}from"./calfSystem-d04e4be4.js"
import"./playerName-a036237e.js"
import"./idb-0492f5ed.js"
import"./indexAjaxJson-73d427c9.js"
import"./cmdExport-9eb7477e.js"
import"./getProfile-ceaa4d67.js"
import{m as o}from"./myStats-ddaad240.js"
import{r as i}from"./reduceBuffArray-91b52c42.js"
const n=/>\s*([ a-zA-Z]+) Level (\d+)/g,c=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function d(s,e){const{tipped:t}=e.dataset,a=[...t.matchAll(n)].filter(e=>s[e[1]]===Number(e[2]))
a.length>0&&r(e.parentNode,a.map(c).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=e.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(a(d,s))}(i(s._skills))}}export default function(){s()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-d1035a1a.js.map
