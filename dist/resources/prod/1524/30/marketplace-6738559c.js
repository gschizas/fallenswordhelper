import{f as s,p as t,y as n,A as o}from"./calfSystem-6459f18a.js"
import{a as e}from"./addCommas-508f0c08.js"
import"./closest-3bdef2f3.js"
import{c as a}from"./closestTable-0cc3d3c3.js"
let c,f,r
function i(){return c||(c=n("amount")),c}function u(s){const t=i().value
o(`<span class="fshBlue">You are offering to buy <b>${t}</b> FSP for >> <b>${e(s)}</b> (Total: ${e(function(s,t){const n=s*t
return n+Math.ceil(n/200)}(t,s))})</span>`,function(){if(!r){const s=a(i()).insertRow(2)
r=s.insertCell(0),r.colSpan="2",r.className="fshCenter"}return r}())}function l(){const s=(f||(f=n("price")),f)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):r&&""!==r.innerHTML&&o("",r)}}function m(){s(t,"keyup",l)}export default m
//# sourceMappingURL=marketplace-6738559c.js.map
