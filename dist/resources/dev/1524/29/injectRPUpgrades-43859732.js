import{x as s,p as a,g as t,t as e,i as r}from"./calfSystem-02c48ff5.js"
import"./playerName-5ca71009.js"
import"./idb-49c5b621.js"
import"./indexAjaxJson-afad01c3.js"
import"./cmdExport-3fceba30.js"
import"./getProfile-a7de2d2c.js"
import{m as o}from"./myStats-bbbc339d.js"
import{r as i}from"./reduceBuffArray-793b77a6.js"
const c=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function f(s,a){const{tipped:t}=a.dataset,e=[...t.matchAll(c)].filter(a=>s[a[1]]===Number(a[2]))
e.length>0&&r(a.parentNode,e.map(n).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=a.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(e(f,s))}(i(s._skills))}}function m(){s()||o(!0).then(l)}export default m
//# sourceMappingURL=injectRPUpgrades-43859732.js.map
