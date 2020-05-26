import{w as s,p as e,g as t,s as a,i as r}from"./calfSystem-ee582533.js"
import"./playerName-e40f24e0.js"
import"./indexAjaxJson-e486d467.js"
import"./cmdExport-23cec039.js"
import"./getProfile-46c78d5c.js"
import{m as o}from"./myStats-2f234ad0.js"
import{r as c}from"./reduceBuffArray-2e2cab9c.js"
const i=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function f(s,e){const{tipped:t}=e.dataset,a=[...t.matchAll(i)].filter(e=>s[e[1]]===Number(e[2]))
a.length>0&&r(e.parentNode,a.map(n).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=e.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(a(f,s))}(c(s._skills))}}export default function(){s()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-e0c31a21.js.map
