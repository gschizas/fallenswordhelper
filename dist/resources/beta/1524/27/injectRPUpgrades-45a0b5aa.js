import{x as a,p as s,g as t,t as e,i as r}from"./calfSystem-70c7a660.js"
import"./playerName-d7dd0a91.js"
import"./idb-d93da5f0.js"
import"./indexAjaxJson-4ca9de3e.js"
import"./cmdExport-31b9da33.js"
import"./getProfile-62d13fa3.js"
import{m as o}from"./myStats-ca96e379.js"
import{r as i}from"./reduceBuffArray-45edadf4.js"
const d=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=a=>`<br><span class="fshRed fshNoWrap">${a[1]} ${a[2]} active</span>`
function c(a,s){const{tipped:t}=s.dataset,e=[...t.matchAll(d)].filter(s=>a[s[1]]===Number(s[2]))
e.length>0&&r(s.parentNode,e.map(n).join(""))}function f(a){if(0!==a._skills.length){!function(a){const r=s.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(e(c,a))}(i(a._skills))}}function l(){a()||o(!0).then(f)}export default l
//# sourceMappingURL=injectRPUpgrades-45a0b5aa.js.map
