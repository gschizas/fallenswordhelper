import{z as s,aU as a,p as e,g as t,v as n,i as f}from"./calfSystem-70b0df7f.js"
import{r}from"./reduceBuffArray-2f7f3ea5.js"
const l=/>\s*([ a-zA-Z]+) Level (\d+)/g,o=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function c(s,a){const{tipped:e}=a.dataset,t=[...e.matchAll(l)].filter(a=>s[a[1]]===Number(a[2]))
t.length>0&&f(a.parentNode,t.map(o).join(""))}function i(s){if(0!==s._skills.length){!function(s){const a=e.children[0].rows[9]
a&&t("a",a.cells[0].children[0]).forEach(n(c,s))}(r(s._skills))}}export default function(){s()||a(!0).then(i)}
//# sourceMappingURL=injectRPUpgrades-d193d950.js.map
