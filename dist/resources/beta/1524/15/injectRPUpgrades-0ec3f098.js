import{w as s,p as t,g as a,s as e,i as r}from"./calfSystem-1262535f.js"
import"./playerName-11654d0b.js"
import"./indexAjaxJson-f27fbe77.js"
import"./cmdExport-721bbaf9.js"
import"./getProfile-4b51a044.js"
import{m as o}from"./myStats-385ffe62.js"
import{r as f}from"./reduceBuffArray-78229d68.js"
const i=/>\s*([ a-zA-Z]+) Level (\d+)/g,n=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function l(s,t){const{tipped:a}=t.dataset,e=[...a.matchAll(i)].filter(t=>s[t[1]]===Number(t[2]))
e.length>0&&r(t.parentNode,e.map(n).join(""))}function m(s){if(0!==s._skills.length){!function(s){const r=t.children[0].rows[9]
r&&a("a",r.cells[0].children[0]).forEach(e(l,s))}(f(s._skills))}}export default function(){s()||o(!0).then(m)}
//# sourceMappingURL=injectRPUpgrades-0ec3f098.js.map
