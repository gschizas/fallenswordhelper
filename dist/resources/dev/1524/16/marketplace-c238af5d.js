import{e as s,p as t,x as n,z as o}from"./calfSystem-d49dbbd3.js"
import{a as e}from"./addCommas-ab251bb7.js"
import"./closest-c1f1e24c.js"
import{c as a}from"./closestTable-dc4f2fff.js"
let c,f,r
function i(){return c||(c=n("amount")),c}function u(s){const t=i().value
o(`<span class="fshBlue">You are offering to buy <b>${t}</b> FSP for >> <b>${e(s)}</b> (Total: ${e(function(s,t){const n=s*t
return n+Math.ceil(n/200)}(t,s))})</span>`,function(){if(!r){const s=a(i()).insertRow(2)
r=s.insertCell(0),r.colSpan="2",r.className="fshCenter"}return r}())}function l(){const s=(f||(f=n("price")),f)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):r&&""!==r.innerHTML&&o("",r)}}export default function(){s(t,"keyup",l)}
//# sourceMappingURL=marketplace-c238af5d.js.map
