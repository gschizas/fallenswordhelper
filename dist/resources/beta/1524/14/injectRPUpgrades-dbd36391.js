import{y as s,aQ as a,p as e,g as t,u as n,i as c}from"./calfSystem-371c414c.js"
import{r}from"./reduceBuffArray-442ea152.js"
const l=/>\s*([ a-zA-Z]+) Level (\d+)/g,o=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function i(s,a){const{tipped:e}=a.dataset,t=[...e.matchAll(l)].filter(a=>s[a[1]]===Number(a[2]))
t.length>0&&c(a.parentNode,t.map(o).join(""))}function f(s){if(0!==s._skills.length){!function(s){const a=e.children[0].rows[9]
a&&t("a",a.cells[0].children[0]).forEach(n(i,s))}(r(s._skills))}}export default function(){s()||a(!0).then(f)}
//# sourceMappingURL=injectRPUpgrades-dbd36391.js.map
