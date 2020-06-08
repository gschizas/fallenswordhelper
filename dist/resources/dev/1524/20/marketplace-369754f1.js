import{e as s,p as t,y as a,A as n}from"./calfSystem-a2862afc.js"
import{a as o}from"./addCommas-f02ec3aa.js"
import"./closest-75b5e3c5.js"
import{c as e}from"./closestTable-89a74d0f.js"
let c,r,f
function i(){return c||(c=a("amount")),c}function u(s){const t=i().value
n(`<span class="fshBlue">You are offering to buy <b>${t}</b> FSP for >> <b>${o(s)}</b> (Total: ${o(function(s,t){const a=s*t
return a+Math.ceil(a/200)}(t,s))})</span>`,function(){if(!f){const s=e(i()).insertRow(2)
f=s.insertCell(0),f.colSpan="2",f.className="fshCenter"}return f}())}function l(){const s=(r||(r=a("price")),r)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):f&&""!==f.innerHTML&&n("",f)}}export default function(){s(t,"keyup",l)}
//# sourceMappingURL=marketplace-369754f1.js.map
