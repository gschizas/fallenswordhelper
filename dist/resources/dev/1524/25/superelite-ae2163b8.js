import{x as e,A as r,f as t,c as a,p as s,Z as n,e as c,h as o,t as f,i}from"./calfSystem-69dd5601.js"
import"./numberIsNaN-929de7af.js"
import"./idb-874fe815.js"
import"./isChecked-9f10b428.js"
import{b as l}from"./simpleCheckbox-5b36aca2.js"
import{c as m}from"./createTBody-c786127c.js"
import{c as d}from"./createTable-ba9c0bc4.js"
import"./isDate-b3759236.js"
import"./padZ-0c2f5370.js"
import{getFshSeLog as b,doBackgroundCheck as h,oldLog as p,disableBackgroundChecks as u}from"./seLog-8bd93917.js"
import{f as T}from"./formatUtcDateTime-95fa20b3.js"
let j
function k(e,r){i(e,`<tr><td class="fshCenter">${r[0]}</td><td class="fshBold fshCenter fshCooldown">${T(new Date(1e3*r[1]))}</td></tr>`)}function C(){const e=s.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function S(e){const r=function(e){const r=d({className:"fshTTracker"}),t=m({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return o(r,t),e.forEach(f(k,t)),r}(e)
j=C(),o(j,r)}function N(e,r){return e[1]-r[1]}function g(){p&&p.se&&S(c(p.se).sort(N))}function y(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,n("enableSeTracker",a.enableSeTracker),a.enableSeTracker?h().finally(g):(j&&(j.parentNode.remove(),j=!1),u()))}function w(){h().finally(g)}function x(){if(e())return
let s=C()
s.height=20,s=C(),s.className="fshCenter",r(l("enableSeTracker"),s),t(s,"change",y),a.enableSeTracker&&b().then(w)}export default x
//# sourceMappingURL=superelite-ae2163b8.js.map
