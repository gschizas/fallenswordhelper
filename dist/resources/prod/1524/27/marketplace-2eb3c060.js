import{f as s,p as e,y as t,A as n}from"./calfSystem-3bdf319e.js"
import{a as o}from"./addCommas-e12eda5f.js"
import"./closest-79b9364e.js"
import{c as a}from"./closestTable-6ec7a709.js"
let r,c,f
function i(){return r||(r=t("amount")),r}function u(s){const e=i().value
n(`<span class="fshBlue">You are offering to buy <b>${e}</b> FSP for >> <b>${o(s)}</b> (Total: ${o(function(s,e){const t=s*e
return t+Math.ceil(t/200)}(e,s))})</span>`,function(){if(!f){const s=a(i()).insertRow(2)
f=s.insertCell(0),f.colSpan="2",f.className="fshCenter"}return f}())}function l(){const s=(c||(c=t("price")),c)
if(s){const e=s.value;-1!==e.search(/^[0-9]+$/)?u(e):f&&""!==f.innerHTML&&n("",f)}}function m(){s(e,"keyup",l)}export default m
//# sourceMappingURL=marketplace-2eb3c060.js.map
