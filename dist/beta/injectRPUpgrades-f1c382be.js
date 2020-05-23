import{z as s,aR as a,p as t,g as e,v as n,i as r}from"./calfSystem-2fb02284.js"
import{r as l}from"./reduceBuffArray-64488671.js"
const o=/>\s*([ a-zA-Z]+) Level (\d+)/g,c=s=>`<br><span class="fshRed fshNoWrap">${s[1]} ${s[2]} active</span>`
function f(s,a){const{tipped:t}=a.dataset,e=[...t.matchAll(o)].filter(a=>s[a[1]]===Number(a[2]))
e.length>0&&r(a.parentNode,e.map(c).join(""))}function i(s){if(0!==s._skills.length){!function(s){const a=t.children[0].rows[9]
a&&e("a",a.cells[0].children[0]).forEach(n(f,s))}(l(s._skills))}}export default function(){s()||a(!0).then(i)}
//# sourceMappingURL=injectRPUpgrades-f1c382be.js.map
