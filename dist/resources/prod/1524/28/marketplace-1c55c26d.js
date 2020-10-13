import{f as s,p as t,y as n,A as o}from"./calfSystem-a5da5210.js"
import{a}from"./addCommas-8259c1a9.js"
import"./closest-9ef1a6fc.js"
import{c as e}from"./closestTable-5b922600.js"
let c,r,f
function i(){return c||(c=n("amount")),c}function u(s){const t=i().value
o(`<span class="fshBlue">You are offering to buy <b>${t}</b> FSP for >> <b>${a(s)}</b> (Total: ${a(function(s,t){const n=s*t
return n+Math.ceil(n/200)}(t,s))})</span>`,function(){if(!f){const s=e(i()).insertRow(2)
f=s.insertCell(0),f.colSpan="2",f.className="fshCenter"}return f}())}function l(){const s=(r||(r=n("price")),r)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):f&&""!==f.innerHTML&&o("",f)}}function m(){s(t,"keyup",l)}export default m
//# sourceMappingURL=marketplace-1c55c26d.js.map
