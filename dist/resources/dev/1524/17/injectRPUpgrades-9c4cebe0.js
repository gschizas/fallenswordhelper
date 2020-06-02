import{w as s,p as a,g as t,s as e,i as r}from"./calfSystem-1c103624.js"
import"./playerName-191d9509.js"
import"./idb-347cc2af.js"
import"./indexAjaxJson-ed231bc3.js"
import"./cmdExport-15d3dc9a.js"
import"./getProfile-73a4ea38.js"
import{m as o}from"./myStats-5c94e0f9.js"
import{r as i}from"./reduceBuffArray-61ba82f5.js"
const c=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function f(s,a){const{tipped:t}=a.dataset,e=[...t.matchAll(c)].filter(a=>s[a[1]]===Number(a[2]))
e.length>0&&r(a.parentNode,e.map(n).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=a.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(e(f,s))}(i(s._skills))}}export default function(){s()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-9c4cebe0.js.map
