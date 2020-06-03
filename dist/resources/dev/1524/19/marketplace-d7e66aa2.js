import{e as s,p as t,x as n,z as o}from"./calfSystem-f7574730.js"
import{a}from"./addCommas-1a19f537.js"
import"./closest-807af018.js"
import{c as e}from"./closestTable-4db1af82.js"
let r,f,c
function i(){return r||(r=n("amount")),r}function u(s){const t=i().value
o(`<span class="fshBlue">You are offering to buy <b>${t}</b> FSP for >> <b>${a(s)}</b> (Total: ${a(function(s,t){const n=s*t
return n+Math.ceil(n/200)}(t,s))})</span>`,function(){if(!c){const s=e(i()).insertRow(2)
c=s.insertCell(0),c.colSpan="2",c.className="fshCenter"}return c}())}function l(){const s=(f||(f=n("price")),f)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):c&&""!==c.innerHTML&&o("",c)}}export default function(){s(t,"keyup",l)}
//# sourceMappingURL=marketplace-d7e66aa2.js.map
