import{f as n,p as s,A as t,C as e,ab as o}from"./calfSystem-1e164202.js"
import"./closest-42af84ad.js"
import{c as a}from"./closestTable-42d2debb.js"
let c,r,f
function i(){return c||(c=t("amount")),c}function u(n){const s=i().value
e(`<span class="fshBlue">You are offering to buy <b>${s}</b> FSP for >> <b>${o(n)}</b> (Total: ${o(function(n,s){const t=n*s
return t+Math.ceil(t/200)}(s,n))})</span>`,function(){if(!f){const n=a(i()).insertRow(2)
f=n.insertCell(0),f.colSpan="2",f.className="fshCenter"}return f}())}function l(){const n=(r||(r=t("price")),r)
if(n){const s=n.value;-1!==s.search(/^[0-9]+$/)?u(s):f&&""!==f.innerHTML&&e("",f)}}export default function(){n(s,"keyup",l)}
//# sourceMappingURL=marketplace-546bc884.js.map
