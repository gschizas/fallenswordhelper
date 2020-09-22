import{x as s,p as t,g as e,t as a,i as r}from"./calfSystem-019a589c.js"
import"./playerName-6eb83d57.js"
import"./idb-6718e849.js"
import"./indexAjaxJson-424248bd.js"
import"./cmdExport-d38d7643.js"
import"./getProfile-d07ee573.js"
import{m as o}from"./myStats-ff3f54d8.js"
import{r as i}from"./reduceBuffArray-3d054c9d.js"
const n=/>\s*([ a-zA-Z]+) Level (\d+)/g,d=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function f(s,t){const{tipped:e}=t.dataset,a=[...e.matchAll(n)].filter(t=>s[t[1]]===Number(t[2]))
a.length>0&&r(t.parentNode,a.map(d).join(""))}function c(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&e("a",r.cells[0].children[0]).forEach(a(f,s))}(i(s._skills))}}function l(){s()||o(!0).then(c)}export default l
//# sourceMappingURL=injectRPUpgrades-9850c76b.js.map
