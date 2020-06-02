import{e as s,p as t,x as e,z as n}from"./calfSystem-be09bdff.js"
import{a as o}from"./addCommas-f6a1bc8a.js"
import"./closest-81c3e392.js"
import{c as a}from"./closestTable-dde6bdc8.js"
let c,r,f
function i(){return c||(c=e("amount")),c}function u(s){const t=i().value
n(`<span class="fshBlue">You are offering to buy <b>${t}</b> FSP for >> <b>${o(s)}</b> (Total: ${o(function(s,t){const e=s*t
return e+Math.ceil(e/200)}(t,s))})</span>`,function(){if(!f){const s=a(i()).insertRow(2)
f=s.insertCell(0),f.colSpan="2",f.className="fshCenter"}return f}())}function l(){const s=(r||(r=e("price")),r)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):f&&""!==f.innerHTML&&n("",f)}}export default function(){s(t,"keyup",l)}
//# sourceMappingURL=marketplace-ce4d8d70.js.map
