import{f as s,p as t,y as n,A as o}from"./calfSystem-34fcd691.js"
import{a as e}from"./addCommas-8cd7d96d.js"
import"./closest-5107b89a.js"
import{c as a}from"./closestTable-26bc0e79.js"
let c,r,f
function i(){return c||(c=n("amount")),c}function u(s){const t=i().value
o(`<span class="fshBlue">You are offering to buy <b>${t}</b> FSP for >> <b>${e(s)}</b> (Total: ${e(function(s,t){const n=s*t
return n+Math.ceil(n/200)}(t,s))})</span>`,function(){if(!f){const s=a(i()).insertRow(2)
f=s.insertCell(0),f.colSpan="2",f.className="fshCenter"}return f}())}function l(){const s=(r||(r=n("price")),r)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):f&&""!==f.innerHTML&&o("",f)}}export default function(){s(t,"keyup",l)}
//# sourceMappingURL=marketplace-b4ce6d58.js.map
