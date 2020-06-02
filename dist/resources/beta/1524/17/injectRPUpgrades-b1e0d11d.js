import{w as s,p as e,g as t,s as a,i as r}from"./calfSystem-02ae8657.js"
import"./playerName-9873e3df.js"
import"./idb-ac1635f3.js"
import"./indexAjaxJson-8dbd2034.js"
import"./cmdExport-de6d587e.js"
import"./getProfile-de98ee56.js"
import{m as o}from"./myStats-40b81d9d.js"
import{r as i}from"./reduceBuffArray-23ba3ef2.js"
const n=/>\s*([ a-zA-Z]+) Level (\d+)/g,d=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function f(s,e){const{tipped:t}=e.dataset,a=[...t.matchAll(n)].filter(e=>s[e[1]]===Number(e[2]))
a.length>0&&r(e.parentNode,a.map(d).join(""))}function l(s){if(0!==s._skills.length){!function(s){const r=e.children[0].rows[9]
r&&t("a",r.cells[0].children[0]).forEach(a(f,s))}(i(s._skills))}}export default function(){s()||o(!0).then(l)}
//# sourceMappingURL=injectRPUpgrades-b1e0d11d.js.map
