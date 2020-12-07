import{f as s,p as t,y as n,A as o}from"./calfSystem-ebf4b17d.js"
import{a as e}from"./addCommas-508f0c08.js"
import"./closest-3bdef2f3.js"
import{c as a}from"./closestTable-d46d4650.js"
let f,r,c
function i(){return f||(f=n("amount")),f}function u(s){const t=i().value
o(`<span class="fshBlue">You are offering to buy <b>${t}</b> FSP for >> <b>${e(s)}</b> (Total: ${e(function(s,t){const n=s*t
return n+Math.ceil(n/200)}(t,s))})</span>`,function(){if(!c){const s=a(i()).insertRow(2)
c=s.insertCell(0),c.colSpan="2",c.className="fshCenter"}return c}())}function l(){const s=(r||(r=n("price")),r)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):c&&""!==c.innerHTML&&o("",c)}}function m(){s(t,"keyup",l)}export default m
//# sourceMappingURL=marketplace-0978be65.js.map
