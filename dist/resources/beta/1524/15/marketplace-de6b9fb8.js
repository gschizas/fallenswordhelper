import{e as s,p as t,x as n,z as o}from"./calfSystem-1262535f.js"
import{a as e}from"./addCommas-feda1131.js"
import"./closest-20389d90.js"
import{c as a}from"./closestTable-fb9486a9.js"
let r,c,f
function i(){return r||(r=n("amount")),r}function u(s){const t=i().value
o(`<span class="fshBlue">You are offering to buy <b>${t}</b> FSP for >> <b>${e(s)}</b> (Total: ${e(function(s,t){const n=s*t
return n+Math.ceil(n/200)}(t,s))})</span>`,function(){if(!f){const s=a(i()).insertRow(2)
f=s.insertCell(0),f.colSpan="2",f.className="fshCenter"}return f}())}function l(){const s=(c||(c=n("price")),c)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):f&&""!==f.innerHTML&&o("",f)}}export default function(){s(t,"keyup",l)}
//# sourceMappingURL=marketplace-de6b9fb8.js.map
