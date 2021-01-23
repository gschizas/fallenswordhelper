import{a as s}from"./addCommas-02eed580.js"
import{c as t}from"./closestTable-6e948651.js"
import{f as e,p as n,y as o,A as a}from"./calfSystem-47fc08ae.js"
import"./closest-77701dcf.js"
let c,r,f
function i(){return c||(c=o("amount")),c}function u(e){const n=i().value
a(`<span class="fshBlue">You are offering to buy <b>${n}</b> FSP for >> <b>${s(e)}</b> (Total: ${s(function(s,t){const e=s*t
return e+Math.ceil(e/200)}(n,e))})</span>`,function(){if(!f){const s=t(i()).insertRow(2)
f=s.insertCell(0),f.colSpan="2",f.className="fshCenter"}return f}())}function l(){const s=(r||(r=o("price")),r)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):f&&""!==f.innerHTML&&a("",f)}}function m(){e(n,"keyup",l)}export default m
//# sourceMappingURL=marketplace-684b3c7c.js.map
