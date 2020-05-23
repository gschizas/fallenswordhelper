import{z as s,aR as a,p as t,g as e,v as n,i as c}from"./calfSystem-4f7c0235.js"
import{r}from"./reduceBuffArray-c61220fa.js"
const f=/>\s*([ a-zA-Z]+) Level (\d+)/g,l=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function o(s,a){const{tipped:t}=a.dataset,e=[...t.matchAll(f)].filter(a=>s[a[1]]===Number(a[2]))
e.length>0&&c(a.parentNode,e.map(l).join(""))}function i(s){if(0!==s._skills.length){!function(s){const a=t.children[0].rows[9]
a&&e("a",a.cells[0].children[0]).forEach(n(o,s))}(r(s._skills))}}export default function(){s()||a(!0).then(i)}
//# sourceMappingURL=injectRPUpgrades-77198cca.js.map
