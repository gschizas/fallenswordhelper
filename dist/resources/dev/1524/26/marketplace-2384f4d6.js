import{f as s,p as t,y as n,A as o}from"./calfSystem-4991bf5b.js"
import{a as e}from"./addCommas-b567f740.js"
import"./closest-c2515a48.js"
import{c as a}from"./closestTable-f07eb75c.js"
let c,r,f
function i(){return c||(c=n("amount")),c}function u(s){const t=i().value
o(`<span class="fshBlue">You are offering to buy <b>${t}</b> FSP for >> <b>${e(s)}</b> (Total: ${e(function(s,t){const n=s*t
return n+Math.ceil(n/200)}(t,s))})</span>`,function(){if(!f){const s=a(i()).insertRow(2)
f=s.insertCell(0),f.colSpan="2",f.className="fshCenter"}return f}())}function l(){const s=(r||(r=n("price")),r)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):f&&""!==f.innerHTML&&o("",f)}}function m(){s(t,"keyup",l)}export default m
//# sourceMappingURL=marketplace-2384f4d6.js.map
