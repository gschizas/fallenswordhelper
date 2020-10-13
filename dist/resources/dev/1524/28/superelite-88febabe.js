import{x as e,A as r,f as t,c as a,p as s,Z as n,e as c,h as o,t as f,i}from"./calfSystem-b136673a.js"
import"./numberIsNaN-91041dcf.js"
import"./idb-c31665cb.js"
import"./isChecked-12c32ad5.js"
import{b as l}from"./simpleCheckbox-b7b2f875.js"
import{c as m}from"./createTBody-f74b1a93.js"
import{c as d}from"./createTable-629a2fee.js"
import"./isDate-45c423ee.js"
import"./padZ-28ca6b6e.js"
import{getFshSeLog as b,doBackgroundCheck as h,oldLog as p,disableBackgroundChecks as u}from"./seLog-a620f428.js"
import{f as T}from"./formatUtcDateTime-233cbd79.js"
let j
function k(e,r){i(e,`<tr><td class="fshCenter">${r[0]}</td><td class="fshBold fshCenter fshCooldown">${T(new Date(1e3*r[1]))}</td></tr>`)}function C(){const e=s.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function S(e){const r=function(e){const r=d({className:"fshTTracker"}),t=m({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return o(r,t),e.forEach(f(k,t)),r}(e)
j=C(),o(j,r)}function N(e,r){return e[1]-r[1]}function g(){p&&p.se&&S(c(p.se).sort(N))}function y(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,n("enableSeTracker",a.enableSeTracker),a.enableSeTracker?h().finally(g):(j&&(j.parentNode.remove(),j=!1),u()))}function w(){h().finally(g)}function x(){if(e())return
let s=C()
s.height=20,s=C(),s.className="fshCenter",r(l("enableSeTracker"),s),t(s,"change",y),a.enableSeTracker&&b().then(w)}export default x
//# sourceMappingURL=superelite-88febabe.js.map
