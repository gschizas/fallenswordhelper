import{w as s,p as t,g as a,s as r,i as e}from"./calfSystem-6fc0cc1b.js"
import"./playerName-958718a3.js"
import"./idb-92d6a2b5.js"
import"./indexAjaxJson-608117f0.js"
import"./cmdExport-ce8b0402.js"
import"./getProfile-caf96531.js"
import{m as o}from"./myStats-121fdc7d.js"
import{r as i}from"./reduceBuffArray-f1d85a30.js"
const c=/>\s*([ a-zA-Z]+) Level (\d+)/g,f=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function n(s,t){const{tipped:a}=t.dataset,r=[...a.matchAll(c)].filter(t=>s[t[1]]===Number(t[2]))
r.length>0&&e(t.parentNode,r.map(f).join(""))}function l(s){if(0!==s._skills.length){!function(s){const e=t.children[0].rows[9]
e&&a("a",e.cells[0].children[0]).forEach(r(n,s))}(i(s._skills))}}export default function(){s()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-25733c97.js.map
