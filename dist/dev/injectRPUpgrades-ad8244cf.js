import{z as s,aU as a,p as t,g as e,v as n,i as r}from"./calfSystem-8dc0fa4b.js"
import{r as c}from"./reduceBuffArray-3651d455.js"
const l=/>\s*([ a-zA-Z]+) Level (\d+)/g,o=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function f(s,a){const{tipped:t}=a.dataset,e=[...t.matchAll(l)].filter(a=>s[a[1]]===Number(a[2]))
e.length>0&&r(a.parentNode,e.map(o).join(""))}function i(s){if(0!==s._skills.length){!function(s){const a=t.children[0].rows[9]
a&&e("a",a.cells[0].children[0]).forEach(n(f,s))}(c(s._skills))}}export default function(){s()||a(!0).then(i)}
//# sourceMappingURL=injectRPUpgrades-ad8244cf.js.map
