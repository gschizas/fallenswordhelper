import{x as s,p as t,g as e,t as a,i as r}from"./calfSystem-ebf4b17d.js"
import"./playerName-1bc13590.js"
import"./idb-b7d9067e.js"
import"./indexAjaxJson-91b10960.js"
import"./cmdExport-6e99c1e8.js"
import"./getProfile-45b98f95.js"
import{m as o}from"./myStats-17cad75c.js"
import{r as i}from"./reduceBuffArray-77073669.js"
const n=/>\s*([ a-zA-Z]+) Level (\d+)/g,c=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function f(s,t){const{tipped:e}=t.dataset,a=[...e.matchAll(n)].filter(t=>s[t[1]]===Number(t[2]))
a.length>0&&r(t.parentNode,a.map(c).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&e("a",r.cells[0].children[0]).forEach(a(f,s))}(i(s._skills))}}function m(){s()||o(!0).then(l)}export default m
//# sourceMappingURL=injectRPUpgrades-73fd7d9d.js.map
