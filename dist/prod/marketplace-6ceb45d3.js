import{f as n,p as s,A as t,C as o,ab as e}from"./calfSystem-cb871cc0.js"
import"./closest-8cd211a4.js"
import{c}from"./closestTable-f05bb6bb.js"
let a,r,f
function i(){return a||(a=t("amount")),a}function u(n){const s=i().value
o(`<span class="fshBlue">You are offering to buy <b>${s}</b> FSP for >> <b>${e(n)}</b> (Total: ${e(function(n,s){const t=n*s
return t+Math.ceil(t/200)}(s,n))})</span>`,function(){if(!f){const n=c(i()).insertRow(2)
f=n.insertCell(0),f.colSpan="2",f.className="fshCenter"}return f}())}function l(){const n=(r||(r=t("price")),r)
if(n){const s=n.value;-1!==s.search(/^[0-9]+$/)?u(s):f&&""!==f.innerHTML&&o("",f)}}export default function(){n(s,"keyup",l)}
//# sourceMappingURL=marketplace-6ceb45d3.js.map
