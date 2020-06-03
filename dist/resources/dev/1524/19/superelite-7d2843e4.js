import{w as e,z as r,e as t,c as a,p as s,X as n,l as c,f as o,s as f,i}from"./calfSystem-f7574730.js"
import"./numberIsNaN-92f332e4.js"
import"./idb-14a57c5b.js"
import"./isChecked-8b5fb1cd.js"
import{b as l}from"./simpleCheckbox-6ccf77ae.js"
import{c as d}from"./createTBody-6724caba.js"
import{c as m}from"./createTable-61b1bd32.js"
import"./isDate-04e85c3b.js"
import"./padZ-30f972ec.js"
import{getFshSeLog as b,doBackgroundCheck as h,oldLog as p,disableBackgroundChecks as u}from"./seLog-412f46d9.js"
import{f as T}from"./formatUtcDateTime-f8ddad6b.js"
let j
function k(e,r){i(e,`<tr><td class="fshCenter">${r[0]}</td><td class="fshBold fshCenter fshCooldown">${T(new Date(1e3*r[1]))}</td></tr>`)}function C(){const e=s.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function S(e){const r=function(e){const r=m({className:"fshTTracker"}),t=d({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return o(r,t),e.forEach(f(k,t)),r}(e)
j=C(),o(j,r)}function N(e,r){return e[1]-r[1]}function g(){p&&p.se&&S(c(p.se).sort(N))}function w(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,n("enableSeTracker",a.enableSeTracker),a.enableSeTracker?h().finally(g):(j&&(j.parentNode.remove(),j=!1),u()))}function y(){h().finally(g)}export default function(){if(e())return
let s=C()
s.height=20,s=C(),s.className="fshCenter",r(l("enableSeTracker"),s),t(s,"change",w),a.enableSeTracker&&b().then(y)}
//# sourceMappingURL=superelite-7d2843e4.js.map
