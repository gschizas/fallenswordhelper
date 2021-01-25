import{a as s}from"./addCommas-b2b2ad82.js"
import{c as t}from"./closestTable-fd04a72b.js"
import{f as n,p as o,y as a,A as e}from"./calfSystem-26bcf570.js"
import"./closest-331833f9.js"
let r,c,f
function i(){return r||(r=a("amount")),r}function u(n){const o=i().value
e(`<span class="fshBlue">You are offering to buy <b>${o}</b> FSP for >> <b>${s(n)}</b> (Total: ${s(function(s,t){const n=s*t
return n+Math.ceil(n/200)}(o,n))})</span>`,function(){if(!f){const s=t(i()).insertRow(2)
f=s.insertCell(0),f.colSpan="2",f.className="fshCenter"}return f}())}function l(){const s=(c||(c=a("price")),c)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):f&&""!==f.innerHTML&&e("",f)}}function m(){n(o,"keyup",l)}export default m
//# sourceMappingURL=marketplace-72697135.js.map
