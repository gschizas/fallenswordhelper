import{z as a,aR as s,p as t,g as e,v as n,i as r}from"./calfSystem-99da704d.js"
import{r as l}from"./reduceBuffArray-0945b0aa.js"
const o=/>\s*([ a-zA-Z]+) Level (\d+)/g,c=a=>`<br><span class="fshRed fshNoWrap">${a[1]} ${a[2]} active</span>`
function i(a,s){const{tipped:t}=s.dataset,e=[...t.matchAll(o)].filter(s=>a[s[1]]===Number(s[2]))
e.length>0&&r(s.parentNode,e.map(c).join(""))}function f(a){if(0!==a._skills.length){!function(a){const s=t.children[0].rows[9]
s&&e("a",s.cells[0].children[0]).forEach(n(i,a))}(l(a._skills))}}export default function(){a()||s(!0).then(f)}
//# sourceMappingURL=injectRPUpgrades-4d2f4ecf.js.map
