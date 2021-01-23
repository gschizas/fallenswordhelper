import{a as s}from"./addCommas-02eed580.js"
import{c as e}from"./closestTable-08c8eaf4.js"
import{f as t,p as n,y as o,A as a}from"./calfSystem-7aee5245.js"
import"./closest-77701dcf.js"
let c,r,f
function i(){return c||(c=o("amount")),c}function u(t){const n=i().value
a(`<span class="fshBlue">You are offering to buy <b>${n}</b> FSP for >> <b>${s(t)}</b> (Total: ${s(function(s,e){const t=s*e
return t+Math.ceil(t/200)}(n,t))})</span>`,function(){if(!f){const s=e(i()).insertRow(2)
f=s.insertCell(0),f.colSpan="2",f.className="fshCenter"}return f}())}function l(){const s=(r||(r=o("price")),r)
if(s){const e=s.value;-1!==e.search(/^[0-9]+$/)?u(e):f&&""!==f.innerHTML&&a("",f)}}function m(){t(n,"keyup",l)}export default m
//# sourceMappingURL=marketplace-ca026f56.js.map
