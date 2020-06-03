import{e as s,p as t,x as n,z as o}from"./calfSystem-6fc0cc1b.js"
import{a}from"./addCommas-1fbf27a6.js"
import"./closest-958712aa.js"
import{c as e}from"./closestTable-4bde3ff0.js"
let c,f,r
function i(){return c||(c=n("amount")),c}function u(s){const t=i().value
o(`<span class="fshBlue">You are offering to buy <b>${t}</b> FSP for >> <b>${a(s)}</b> (Total: ${a(function(s,t){const n=s*t
return n+Math.ceil(n/200)}(t,s))})</span>`,function(){if(!r){const s=e(i()).insertRow(2)
r=s.insertCell(0),r.colSpan="2",r.className="fshCenter"}return r}())}function l(){const s=(f||(f=n("price")),f)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):r&&""!==r.innerHTML&&o("",r)}}export default function(){s(t,"keyup",l)}
//# sourceMappingURL=marketplace-941719a6.js.map
