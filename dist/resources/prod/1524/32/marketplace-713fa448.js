import{a as s}from"./addCommas-b2b2ad82.js"
import{c as t}from"./closestTable-fdf2cb5f.js"
import{f as n,p as o,y as a,A as e}from"./calfSystem-45544049.js"
import"./closest-331833f9.js"
let f,r,c
function i(){return f||(f=a("amount")),f}function u(n){const o=i().value
e(`<span class="fshBlue">You are offering to buy <b>${o}</b> FSP for >> <b>${s(n)}</b> (Total: ${s(function(s,t){const n=s*t
return n+Math.ceil(n/200)}(o,n))})</span>`,function(){if(!c){const s=t(i()).insertRow(2)
c=s.insertCell(0),c.colSpan="2",c.className="fshCenter"}return c}())}function l(){const s=(r||(r=a("price")),r)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):c&&""!==c.innerHTML&&e("",c)}}function m(){n(o,"keyup",l)}export default m
//# sourceMappingURL=marketplace-713fa448.js.map
