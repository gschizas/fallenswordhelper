import{x as a,p as s,g as t,t as r,i as e}from"./calfSystem-1b876afa.js"
import"./playerName-14ec00f6.js"
import"./idb-0681f9af.js"
import"./indexAjaxJson-1a78cb06.js"
import"./cmdExport-f01a6b63.js"
import"./getProfile-712ac5b2.js"
import{m as o}from"./myStats-ab6896d7.js"
import{r as i}from"./reduceBuffArray-f381a047.js"
const f=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=a=>`<br><span class="fshRed fshNoWrap">${a[1]} ${a[2]} active</span>`
function c(a,s){const{tipped:t}=s.dataset,r=[...t.matchAll(f)].filter(s=>a[s[1]]===Number(s[2]))
r.length>0&&e(s.parentNode,r.map(n).join(""))}function l(a){if(0!==a._skills.length){!function(a){const e=s.children[0].rows[9]
e&&t("a",e.cells[0].children[0]).forEach(r(c,a))}(i(a._skills))}}export default function(){a()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-1ad6ecf5.js.map
