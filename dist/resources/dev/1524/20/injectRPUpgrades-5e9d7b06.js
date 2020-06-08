import{x as a,p as s,g as t,t as r,i as o}from"./calfSystem-a2862afc.js"
import"./playerName-72c7301a.js"
import"./idb-911ff7c2.js"
import"./indexAjaxJson-afc1ac85.js"
import"./cmdExport-356fd6f3.js"
import"./getProfile-57a9a6d7.js"
import{m as e}from"./myStats-8612677a.js"
import{r as i}from"./reduceBuffArray-22a34b32.js"
const f=/>\s*([ a-zA-Z]+) Level (\d+)/g,c=a=>`<br><span class="fshRed fshNoWrap">${a[1]} ${a[2]} active</span>`
function n(a,s){const{tipped:t}=s.dataset,r=[...t.matchAll(f)].filter(s=>a[s[1]]===Number(s[2]))
r.length>0&&o(s.parentNode,r.map(c).join(""))}function l(a){if(0!==a._skills.length){!function(a){const o=s.children[0].rows[9]
o&&t("a",o.cells[0].children[0]).forEach(r(n,a))}(i(a._skills))}}export default function(){a()||e(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-5e9d7b06.js.map
