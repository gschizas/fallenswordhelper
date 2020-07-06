import{x as e,A as r,f as t,c as a,p as s,Z as n,e as c,h as o,t as f,i}from"./calfSystem-9901ad27.js"
import"./numberIsNaN-cb2409eb.js"
import"./idb-efff97cf.js"
import"./isChecked-8ee9db43.js"
import{b as l}from"./simpleCheckbox-3328fcb7.js"
import{c as m}from"./createTBody-5d67034f.js"
import{c as d}from"./createTable-cf4fb3e8.js"
import"./isDate-32fe1182.js"
import"./padZ-ce2146a0.js"
import{getFshSeLog as b,doBackgroundCheck as h,oldLog as p,disableBackgroundChecks as u}from"./seLog-ec1abed0.js"
import{f as T}from"./formatUtcDateTime-abf0e3ce.js"
let j
function k(e,r){i(e,`<tr><td class="fshCenter">${r[0]}</td><td class="fshBold fshCenter fshCooldown">${T(new Date(1e3*r[1]))}</td></tr>`)}function C(){const e=s.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function S(e){const r=function(e){const r=d({className:"fshTTracker"}),t=m({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return o(r,t),e.forEach(f(k,t)),r}(e)
j=C(),o(j,r)}function N(e,r){return e[1]-r[1]}function g(){p&&p.se&&S(c(p.se).sort(N))}function y(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,n("enableSeTracker",a.enableSeTracker),a.enableSeTracker?h().finally(g):(j&&(j.parentNode.remove(),j=!1),u()))}function w(){h().finally(g)}export default function(){if(e())return
let s=C()
s.height=20,s=C(),s.className="fshCenter",r(l("enableSeTracker"),s),t(s,"change",y),a.enableSeTracker&&b().then(w)}
//# sourceMappingURL=superelite-52f98bf5.js.map
