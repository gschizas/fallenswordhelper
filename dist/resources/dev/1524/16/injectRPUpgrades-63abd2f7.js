import{w as s,p as e,g as t,s as a,i as r}from"./calfSystem-d49dbbd3.js"
import"./playerName-7c21a13e.js"
import"./idb-a6d1a1ba.js"
import"./indexAjaxJson-6ef1f9f4.js"
import"./cmdExport-1b537f9c.js"
import"./getProfile-c6e60ebe.js"
import{m as o}from"./myStats-eb8dd16b.js"
import{r as i}from"./reduceBuffArray-4d541bd8.js"
const n=/>\s*([ a-zA-Z]+) Level (\d+)/g,f=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function c(s,e){const{tipped:t}=e.dataset,a=[...t.matchAll(n)].filter(e=>s[e[1]]===Number(e[2]))
a.length>0&&r(e.parentNode,a.map(f).join(""))}function d(s){if(0!==s._skills.length){!function(s){const r=e.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(a(c,s))}(i(s._skills))}}export default function(){s()||o(!0).then(d)}
//# sourceMappingURL=injectRPUpgrades-63abd2f7.js.map
