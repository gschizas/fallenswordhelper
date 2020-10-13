import{f as s,p as t,y as n,A as o}from"./calfSystem-964f4fc9.js"
import{a as e}from"./addCommas-8259c1a9.js"
import"./closest-9ef1a6fc.js"
import{c as a}from"./closestTable-8e45507b.js"
let c,f,r
function i(){return c||(c=n("amount")),c}function u(s){const t=i().value
o(`<span class="fshBlue">You are offering to buy <b>${t}</b> FSP for >> <b>${e(s)}</b> (Total: ${e(function(s,t){const n=s*t
return n+Math.ceil(n/200)}(t,s))})</span>`,function(){if(!r){const s=a(i()).insertRow(2)
r=s.insertCell(0),r.colSpan="2",r.className="fshCenter"}return r}())}function l(){const s=(f||(f=n("price")),f)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):r&&""!==r.innerHTML&&o("",r)}}function m(){s(t,"keyup",l)}export default m
//# sourceMappingURL=marketplace-abdab3e3.js.map
