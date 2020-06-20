import{x as s,p as t,g as e,t as a,i as r}from"./calfSystem-9c7241dc.js"
import"./playerName-ddecc25a.js"
import"./idb-5f8a9591.js"
import"./indexAjaxJson-82fdd15d.js"
import"./cmdExport-cec76f08.js"
import"./getProfile-57e44e9c.js"
import{m as o}from"./myStats-37894cfd.js"
import{r as c}from"./reduceBuffArray-917b77ed.js"
const i=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function f(s,t){const{tipped:e}=t.dataset,a=[...e.matchAll(i)].filter(t=>s[t[1]]===Number(t[2]))
a.length>0&&r(t.parentNode,a.map(n).join(""))}function d(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&e("a",r.cells[0].children[0]).forEach(a(f,s))}(c(s._skills))}}export default function(){s()||o(!0).then(d)}
//# sourceMappingURL=injectRPUpgrades-07793ed3.js.map
