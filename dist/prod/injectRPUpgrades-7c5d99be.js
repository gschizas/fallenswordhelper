import{z as s,aR as a,p as t,g as e,v as c,i as n}from"./calfSystem-cb871cc0.js"
import{r}from"./reduceBuffArray-60b520c4.js"
const l=/>\s*([ a-zA-Z]+) Level (\d+)/g,o=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function i(s,a){const{tipped:t}=a.dataset,e=[...t.matchAll(l)].filter(a=>s[a[1]]===Number(a[2]))
e.length>0&&n(a.parentNode,e.map(o).join(""))}function f(s){if(0!==s._skills.length){!function(s){const a=t.children[0].rows[9]
a&&e("a",a.cells[0].children[0]).forEach(c(i,s))}(r(s._skills))}}export default function(){s()||a(!0).then(f)}
//# sourceMappingURL=injectRPUpgrades-7c5d99be.js.map
