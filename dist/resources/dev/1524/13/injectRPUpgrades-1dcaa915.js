import{z as s,aU as a,p as e,g as t,v as n,i as r}from"./calfSystem-01eb06ed.js"
import{r as l}from"./reduceBuffArray-536906d9.js"
const o=/>\s*([ a-zA-Z]+) Level (\d+)/g,c=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function i(s,a){const{tipped:e}=a.dataset,t=[...e.matchAll(o)].filter(a=>s[a[1]]===Number(a[2]))
t.length>0&&r(a.parentNode,t.map(c).join(""))}function f(s){if(0!==s._skills.length){!function(s){const a=e.children[0].rows[9]
a&&t("a",a.cells[0].children[0]).forEach(n(i,s))}(l(s._skills))}}export default function(){s()||a(!0).then(f)}
//# sourceMappingURL=injectRPUpgrades-1dcaa915.js.map
