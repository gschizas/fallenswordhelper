import{a as s}from"./addCommas-02eed580.js"
import{c as t}from"./closestTable-820f3aaf.js"
import{f as n,p as o,y as a,A as e}from"./calfSystem-393ab895.js"
import"./closest-77701dcf.js"
let r,c,f
function i(){return r||(r=a("amount")),r}function u(n){const o=i().value
e(`<span class="fshBlue">You are offering to buy <b>${o}</b> FSP for >> <b>${s(n)}</b> (Total: ${s(function(s,t){const n=s*t
return n+Math.ceil(n/200)}(o,n))})</span>`,function(){if(!f){const s=t(i()).insertRow(2)
f=s.insertCell(0),f.colSpan="2",f.className="fshCenter"}return f}())}function l(){const s=(c||(c=a("price")),c)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):f&&""!==f.innerHTML&&e("",f)}}function m(){n(o,"keyup",l)}export default m
//# sourceMappingURL=marketplace-f1c8aa19.js.map
