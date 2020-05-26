import{w as s,p as a,g as t,s as e,i as r}from"./calfSystem-740ec4d2.js"
import"./playerName-a172b8d3.js"
import"./indexAjaxJson-1e1af708.js"
import"./cmdExport-7c541a4f.js"
import"./getProfile-b78d4980.js"
import{m as o}from"./myStats-54c00a23.js"
import{r as i}from"./reduceBuffArray-1dc4fdb9.js"
const n=/>\s*([ a-zA-Z]+) Level (\d+)/g,c=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function f(s,a){const{tipped:t}=a.dataset,e=[...t.matchAll(n)].filter(a=>s[a[1]]===Number(a[2]))
e.length>0&&r(a.parentNode,e.map(c).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=a.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(e(f,s))}(i(s._skills))}}export default function(){s()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-6a9f07e2.js.map
