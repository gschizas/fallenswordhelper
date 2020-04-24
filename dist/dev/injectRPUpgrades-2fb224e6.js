import{z as a,aU as s,p as e,g as t,v as n,i as r}from"./calfSystem-9b1fa4ca.js"
import{r as c}from"./reduceBuffArray-77ae177d.js"
const l=/>\s*([ a-zA-Z]+) Level (\d+)/g,o=a=>`<br><span class="fshRed fshNoWrap">${a[1]} ${a[2]} active</span>`
function f(a,s){const{tipped:e}=s.dataset,t=[...e.matchAll(l)].filter(s=>a[s[1]]===Number(s[2]))
t.length>0&&r(s.parentNode,t.map(o).join(""))}function i(a){if(0!==a._skills.length){!function(a){const s=e.children[0].rows[9]
s&&t("a",s.cells[0].children[0]).forEach(n(f,a))}(c(a._skills))}}export default function(){a()||s(!0).then(i)}
//# sourceMappingURL=injectRPUpgrades-2fb224e6.js.map
