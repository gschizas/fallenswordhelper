import{f as s,p as t,y as n,A as o}from"./calfSystem-4cc738f8.js"
import{a as c}from"./addCommas-c5c5d2c5.js"
import"./closest-b21303d7.js"
import{c as e}from"./closestTable-6d07ec05.js"
let a,r,f
function i(){return a||(a=n("amount")),a}function u(s){const t=i().value
o(`<span class="fshBlue">You are offering to buy <b>${t}</b> FSP for >> <b>${c(s)}</b> (Total: ${c(function(s,t){const n=s*t
return n+Math.ceil(n/200)}(t,s))})</span>`,function(){if(!f){const s=e(i()).insertRow(2)
f=s.insertCell(0),f.colSpan="2",f.className="fshCenter"}return f}())}function l(){const s=(r||(r=n("price")),r)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):f&&""!==f.innerHTML&&o("",f)}}export default function(){s(t,"keyup",l)}
//# sourceMappingURL=marketplace-29946b45.js.map
