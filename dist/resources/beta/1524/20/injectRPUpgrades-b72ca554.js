import{x as s,p as t,g as e,t as a,i as r}from"./calfSystem-05554bae.js"
import"./playerName-0e65dbb6.js"
import"./idb-862da886.js"
import"./indexAjaxJson-c1c386d4.js"
import"./cmdExport-9dcb6bc5.js"
import"./getProfile-dcbb4eb8.js"
import{m as o}from"./myStats-eebd97e2.js"
import{r as i}from"./reduceBuffArray-377c86af.js"
const c=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function l(s,t){const{tipped:e}=t.dataset,a=[...e.matchAll(c)].filter(t=>s[t[1]]===Number(t[2]))
a.length>0&&r(t.parentNode,a.map(n).join(""))}function m(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&e("a",r.cells[0].children[0]).forEach(a(l,s))}(i(s._skills))}}export default function(){s()||o(!0).then(m)}
//# sourceMappingURL=injectRPUpgrades-b72ca554.js.map
