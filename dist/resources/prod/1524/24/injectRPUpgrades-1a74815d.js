import{x as s,p as e,g as t,t as a,i as r}from"./calfSystem-ec854151.js"
import"./playerName-f06eed80.js"
import"./idb-72ad0068.js"
import"./indexAjaxJson-7630ad10.js"
import"./cmdExport-8168eb49.js"
import"./getProfile-3eaaacde.js"
import{m as o}from"./myStats-0cefc464.js"
import{r as i}from"./reduceBuffArray-3d054c9d.js"
const c=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function f(s,e){const{tipped:t}=e.dataset,a=[...t.matchAll(c)].filter(e=>s[e[1]]===Number(e[2]))
a.length>0&&r(e.parentNode,a.map(n).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=e.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(a(f,s))}(i(s._skills))}}function m(){s()||o(!0).then(l)}export default m
//# sourceMappingURL=injectRPUpgrades-1a74815d.js.map
