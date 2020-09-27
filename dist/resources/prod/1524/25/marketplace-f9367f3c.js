import{f as s,p as t,y as n,A as o}from"./calfSystem-71b9378d.js"
import{a as e}from"./addCommas-bdfe3cd5.js"
import"./closest-8d8d60b3.js"
import{c as a}from"./closestTable-2fd585db.js"
let r,c,f
function i(){return r||(r=n("amount")),r}function u(s){const t=i().value
o(`<span class="fshBlue">You are offering to buy <b>${t}</b> FSP for >> <b>${e(s)}</b> (Total: ${e(function(s,t){const n=s*t
return n+Math.ceil(n/200)}(t,s))})</span>`,function(){if(!f){const s=a(i()).insertRow(2)
f=s.insertCell(0),f.colSpan="2",f.className="fshCenter"}return f}())}function l(){const s=(c||(c=n("price")),c)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):f&&""!==f.innerHTML&&o("",f)}}function m(){s(t,"keyup",l)}export default m
//# sourceMappingURL=marketplace-f9367f3c.js.map
