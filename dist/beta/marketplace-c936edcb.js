import{f as n,p as s,A as t,C as o,ab as e}from"./calfSystem-fb94ddf0.js"
import"./closest-3210f804.js"
import{c as a}from"./closestTable-3ad17855.js"
let c,f,r
function i(){return c||(c=t("amount")),c}function u(n){const s=i().value
o(`<span class="fshBlue">You are offering to buy <b>${s}</b> FSP for >> <b>${e(n)}</b> (Total: ${e(function(n,s){const t=n*s
return t+Math.ceil(t/200)}(s,n))})</span>`,function(){if(!r){const n=a(i()).insertRow(2)
r=n.insertCell(0),r.colSpan="2",r.className="fshCenter"}return r}())}function l(){const n=(f||(f=t("price")),f)
if(n){const s=n.value;-1!==s.search(/^[0-9]+$/)?u(s):r&&""!==r.innerHTML&&o("",r)}}export default function(){n(s,"keyup",l)}
//# sourceMappingURL=marketplace-c936edcb.js.map
