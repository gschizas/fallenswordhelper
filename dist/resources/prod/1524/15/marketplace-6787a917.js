import{e as s,p as t,x as n,z as o}from"./calfSystem-740ec4d2.js"
import{a as e}from"./addCommas-49286cf6.js"
import"./closest-a3325de8.js"
import{c as a}from"./closestTable-770ab949.js"
let c,r,f
function i(){return c||(c=n("amount")),c}function u(s){const t=i().value
o(`<span class="fshBlue">You are offering to buy <b>${t}</b> FSP for >> <b>${e(s)}</b> (Total: ${e(function(s,t){const n=s*t
return n+Math.ceil(n/200)}(t,s))})</span>`,function(){if(!f){const s=a(i()).insertRow(2)
f=s.insertCell(0),f.colSpan="2",f.className="fshCenter"}return f}())}function l(){const s=(r||(r=n("price")),r)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):f&&""!==f.innerHTML&&o("",f)}}export default function(){s(t,"keyup",l)}
//# sourceMappingURL=marketplace-6787a917.js.map
