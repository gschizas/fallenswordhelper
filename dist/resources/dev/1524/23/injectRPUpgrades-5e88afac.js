import{x as s,p as a,g as t,t as e,i as r}from"./calfSystem-9901ad27.js"
import"./playerName-a0f4217f.js"
import"./idb-efff97cf.js"
import"./indexAjaxJson-93ae4cbc.js"
import"./cmdExport-f7c4fb03.js"
import"./getProfile-fa400fda.js"
import{m as f}from"./myStats-6b1ad672.js"
import{r as o}from"./reduceBuffArray-6eeea593.js"
const i=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function c(s,a){const{tipped:t}=a.dataset,e=[...t.matchAll(i)].filter(a=>s[a[1]]===Number(a[2]))
e.length>0&&r(a.parentNode,e.map(n).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=a.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(e(c,s))}(o(s._skills))}}export default function(){s()||f(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-5e88afac.js.map
