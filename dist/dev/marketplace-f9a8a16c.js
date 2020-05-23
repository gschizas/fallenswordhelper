import{f as n,p as s,A as t,C as o,ac as e}from"./calfSystem-fd021443.js"
import"./closest-23d4903f.js"
import{c as a}from"./closestTable-fd1fc1d7.js"
let c,f,r
function i(){return c||(c=t("amount")),c}function u(n){const s=i().value
o(`<span class="fshBlue">You are offering to buy <b>${s}</b> FSP for >> <b>${e(n)}</b> (Total: ${e(function(n,s){const t=n*s
return t+Math.ceil(t/200)}(s,n))})</span>`,function(){if(!r){const n=a(i()).insertRow(2)
r=n.insertCell(0),r.colSpan="2",r.className="fshCenter"}return r}())}function l(){const n=(f||(f=t("price")),f)
if(n){const s=n.value;-1!==s.search(/^[0-9]+$/)?u(s):r&&""!==r.innerHTML&&o("",r)}}export default function(){n(s,"keyup",l)}
//# sourceMappingURL=marketplace-f9a8a16c.js.map
