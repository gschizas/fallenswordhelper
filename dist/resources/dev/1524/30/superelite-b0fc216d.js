import{x as e,A as r,f as t,c as a,p as s,Z as n,e as o,h as c,t as f,i}from"./calfSystem-54df10e3.js"
import"./numberIsNaN-fa7d637d.js"
import"./idb-7f0d2b39.js"
import"./isChecked-6167b36b.js"
import{b as l}from"./simpleCheckbox-4ba02dd9.js"
import{c as d}from"./createTBody-effa7e62.js"
import{c as m}from"./createTable-a5bfc655.js"
import"./isDate-546a6320.js"
import"./padZ-bd3dfcf9.js"
import{getFshSeLog as b,doBackgroundCheck as h,oldLog as p,disableBackgroundChecks as u}from"./seLog-902139fc.js"
import{f as T}from"./formatUtcDateTime-611562a5.js"
let j
function k(e,r){i(e,`<tr><td class="fshCenter">${r[0]}</td><td class="fshBold fshCenter fshCooldown">${T(new Date(1e3*r[1]))}</td></tr>`)}function C(){const e=s.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function S(e){const r=function(e){const r=m({className:"fshTTracker"}),t=d({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return c(r,t),e.forEach(f(k,t)),r}(e)
j=C(),c(j,r)}function N(e,r){return e[1]-r[1]}function g(){p&&p.se&&S(o(p.se).sort(N))}function y(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,n("enableSeTracker",a.enableSeTracker),a.enableSeTracker?h().finally(g):(j&&(j.parentNode.remove(),j=!1),u()))}function w(){h().finally(g)}function x(){if(e())return
let s=C()
s.height=20,s=C(),s.className="fshCenter",r(l("enableSeTracker"),s),t(s,"change",y),a.enableSeTracker&&b().then(w)}export default x
//# sourceMappingURL=superelite-b0fc216d.js.map
