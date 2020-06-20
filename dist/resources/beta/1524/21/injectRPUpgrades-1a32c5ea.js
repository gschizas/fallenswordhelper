import{x as s,p as t,g as e,t as a,i as r}from"./calfSystem-89b939c8.js"
import"./playerName-8ec11865.js"
import"./idb-9be3057e.js"
import"./indexAjaxJson-dab169e3.js"
import"./cmdExport-788e7045.js"
import"./getProfile-82a0964d.js"
import{m as o}from"./myStats-fbafa703.js"
import{r as i}from"./reduceBuffArray-f8083beb.js"
const n=/>\s*([ a-zA-Z]+) Level (\d+)/g,f=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function c(s,t){const{tipped:e}=t.dataset,a=[...e.matchAll(n)].filter(t=>s[t[1]]===Number(t[2]))
a.length>0&&r(t.parentNode,a.map(f).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&e("a",r.cells[0].children[0]).forEach(a(c,s))}(i(s._skills))}}export default function(){s()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-1a32c5ea.js.map
