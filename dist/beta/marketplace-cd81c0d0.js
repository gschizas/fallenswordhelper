import{f as e,p as n,A as s,C as t,ab as o}from"./calfSystem-70c0e373.js"
import"./closest-9d6eeb1b.js"
import{c as a}from"./closestTable-aeb85a89.js"
let c,r,f
function i(){return c||(c=s("amount")),c}function u(e){const n=i().value
t(`<span class="fshBlue">You are offering to buy <b>${n}</b> FSP for >> <b>${o(e)}</b> (Total: ${o(function(e,n){const s=e*n
return s+Math.ceil(s/200)}(n,e))})</span>`,function(){if(!f){const e=a(i()).insertRow(2)
f=e.insertCell(0),f.colSpan="2",f.className="fshCenter"}return f}())}function l(){const e=(r||(r=s("price")),r)
if(e){const n=e.value;-1!==n.search(/^[0-9]+$/)?u(n):f&&""!==f.innerHTML&&t("",f)}}export default function(){e(n,"keyup",l)}
//# sourceMappingURL=marketplace-cd81c0d0.js.map
