import{x as e,A as r,f as t,c as a,p as s,_ as n,e as c,h as o,t as f,i}from"./calfSystem-ec5e5725.js"
import"./numberIsNaN-871eca26.js"
import"./idb-cecca562.js"
import"./isChecked-ed98077f.js"
import{b as l}from"./simpleCheckbox-e694b596.js"
import{c as d}from"./createTBody-b1c8bf61.js"
import{c as m}from"./createTable-4d32a607.js"
import"./isDate-ad4f47cd.js"
import"./padZ-b87d0d09.js"
import{getFshSeLog as h,doBackgroundCheck as b,oldLog as p,disableBackgroundChecks as u}from"./seLog-e95dfa79.js"
import{f as T}from"./formatUtcDateTime-039f0079.js"
let j
function k(e,r){i(e,`<tr><td class="fshCenter">${r[0]}</td><td class="fshBold fshCenter fshCooldown">${T(new Date(1e3*r[1]))}</td></tr>`)}function C(){const e=s.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function S(e){const r=function(e){const r=m({className:"fshTTracker"}),t=d({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return o(r,t),e.forEach(f(k,t)),r}(e)
j=C(),o(j,r)}function N(e,r){return e[1]-r[1]}function g(){p&&p.se&&S(c(p.se).sort(N))}function y(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,n("enableSeTracker",a.enableSeTracker),a.enableSeTracker?b().finally(g):(j&&(j.parentNode.remove(),j=!1),u()))}function w(){b().finally(g)}function x(){if(e())return
let s=C()
s.height=20,s=C(),s.className="fshCenter",r(l("enableSeTracker"),s),t(s,"change",y),a.enableSeTracker&&h().then(w)}export default x
//# sourceMappingURL=superelite-cb645a0c.js.map
