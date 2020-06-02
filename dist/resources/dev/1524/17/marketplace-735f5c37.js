import{e as s,p as t,x as n,z as o}from"./calfSystem-1c103624.js"
import{a}from"./addCommas-708246cb.js"
import"./closest-a4273a71.js"
import{c as e}from"./closestTable-67ab97b7.js"
let c,r,f
function i(){return c||(c=n("amount")),c}function u(s){const t=i().value
o(`<span class="fshBlue">You are offering to buy <b>${t}</b> FSP for >> <b>${a(s)}</b> (Total: ${a(function(s,t){const n=s*t
return n+Math.ceil(n/200)}(t,s))})</span>`,function(){if(!f){const s=e(i()).insertRow(2)
f=s.insertCell(0),f.colSpan="2",f.className="fshCenter"}return f}())}function l(){const s=(r||(r=n("price")),r)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):f&&""!==f.innerHTML&&o("",f)}}export default function(){s(t,"keyup",l)}
//# sourceMappingURL=marketplace-735f5c37.js.map
