import{f as s,p as t,y as e,A as n}from"./calfSystem-70c7a660.js"
import{a as o}from"./addCommas-e12eda5f.js"
import"./closest-79b9364e.js"
import{c as a}from"./closestTable-bade513a.js"
let r,c,f
function i(){return r||(r=e("amount")),r}function u(s){const t=i().value
n(`<span class="fshBlue">You are offering to buy <b>${t}</b> FSP for >> <b>${o(s)}</b> (Total: ${o(function(s,t){const e=s*t
return e+Math.ceil(e/200)}(t,s))})</span>`,function(){if(!f){const s=a(i()).insertRow(2)
f=s.insertCell(0),f.colSpan="2",f.className="fshCenter"}return f}())}function l(){const s=(c||(c=e("price")),c)
if(s){const t=s.value;-1!==t.search(/^[0-9]+$/)?u(t):f&&""!==f.innerHTML&&n("",f)}}function m(){s(t,"keyup",l)}export default m
//# sourceMappingURL=marketplace-59bb50cf.js.map
