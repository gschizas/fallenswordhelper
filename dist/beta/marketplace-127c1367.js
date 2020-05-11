import{f as n,p as s,A as t,C as o,ab as e}from"./calfSystem-99da704d.js"
import"./closest-5dc907d7.js"
import{c as a}from"./closestTable-f11f74cf.js"
let c,f,r
function i(){return c||(c=t("amount")),c}function u(n){const s=i().value
o(`<span class="fshBlue">You are offering to buy <b>${s}</b> FSP for >> <b>${e(n)}</b> (Total: ${e(function(n,s){const t=n*s
return t+Math.ceil(t/200)}(s,n))})</span>`,function(){if(!r){const n=a(i()).insertRow(2)
r=n.insertCell(0),r.colSpan="2",r.className="fshCenter"}return r}())}function l(){const n=(f||(f=t("price")),f)
if(n){const s=n.value;-1!==s.search(/^[0-9]+$/)?u(s):r&&""!==r.innerHTML&&o("",r)}}export default function(){n(s,"keyup",l)}
//# sourceMappingURL=marketplace-127c1367.js.map
