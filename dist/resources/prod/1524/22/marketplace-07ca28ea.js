import{f as s,p as t,y as n,A as o}from"./calfSystem-d04e4be4.js"
import{a as e}from"./addCommas-d05e6f0b.js"
import"./closest-137378db.js"
import{c as a}from"./closestTable-f6804f7b.js"
let r,f,c
function i(){return r||(r=n("amount")),r}function u(s){const t=i().value
o(`<span class="fshBlue">You are offering to buy <b>${t}</b> FSP for >> <b>${e(s)}</b> (Total: ${e(function(s,t){const n=s*t
return n+Math.ceil(n/200)}(t,s))})</span>`,function(){if(!c){const s=a(i()).insertRow(2)
c=s.insertCell(0),c.colSpan="2",c.className="fshCenter"}return c}())}function l(){const s=(f||(f=n("price")),f)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):c&&""!==c.innerHTML&&o("",c)}}export default function(){s(t,"keyup",l)}
//# sourceMappingURL=marketplace-07ca28ea.js.map
