import{w as s,p as a,g as t,s as e,i as r}from"./calfSystem-f7574730.js"
import"./playerName-b7a62fcc.js"
import"./idb-14a57c5b.js"
import"./indexAjaxJson-66a839ba.js"
import"./cmdExport-da1f542a.js"
import"./getProfile-3530a5f7.js"
import{m as o}from"./myStats-de75fce8.js"
import{r as i}from"./reduceBuffArray-a0e35189.js"
const f=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function c(s,a){const{tipped:t}=a.dataset,e=[...t.matchAll(f)].filter(a=>s[a[1]]===Number(a[2]))
e.length>0&&r(a.parentNode,e.map(n).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=a.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(e(c,s))}(i(s._skills))}}export default function(){s()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-3ff02c5a.js.map
