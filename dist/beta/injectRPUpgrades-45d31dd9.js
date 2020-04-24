import{z as s,aR as a,p as e,g as t,v as n,i as c}from"./calfSystem-c91e004c.js"
import{r}from"./reduceBuffArray-d07f64f5.js"
const f=/>\s*([ a-zA-Z]+) Level (\d+)/g,l=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function o(s,a){const{tipped:e}=a.dataset,t=[...e.matchAll(f)].filter(a=>s[a[1]]===Number(a[2]))
t.length>0&&c(a.parentNode,t.map(l).join(""))}function i(s){if(0!==s._skills.length){!function(s){const a=e.children[0].rows[9]
a&&t("a",a.cells[0].children[0]).forEach(n(o,s))}(r(s._skills))}}export default function(){s()||a(!0).then(i)}
//# sourceMappingURL=injectRPUpgrades-45d31dd9.js.map
