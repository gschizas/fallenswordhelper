import{x as e,A as r,f as t,c as a,p as s,Z as n,e as c,h as o,t as f,i}from"./calfSystem-02c48ff5.js"
import"./numberIsNaN-d1ebf732.js"
import"./idb-49c5b621.js"
import"./isChecked-92297855.js"
import{b as l}from"./simpleCheckbox-5230523e.js"
import{c as m}from"./createTBody-41a1ab82.js"
import{c as d}from"./createTable-b0dd7860.js"
import"./isDate-14b56c12.js"
import"./padZ-a3ed1fe1.js"
import{getFshSeLog as h,doBackgroundCheck as b,oldLog as p,disableBackgroundChecks as u}from"./seLog-2f4cf6f6.js"
import{f as T}from"./formatUtcDateTime-02cd0ca5.js"
let j
function k(e,r){i(e,`<tr><td class="fshCenter">${r[0]}</td><td class="fshBold fshCenter fshCooldown">${T(new Date(1e3*r[1]))}</td></tr>`)}function C(){const e=s.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function S(e){const r=function(e){const r=d({className:"fshTTracker"}),t=m({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return o(r,t),e.forEach(f(k,t)),r}(e)
j=C(),o(j,r)}function N(e,r){return e[1]-r[1]}function g(){p&&p.se&&S(c(p.se).sort(N))}function y(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,n("enableSeTracker",a.enableSeTracker),a.enableSeTracker?b().finally(g):(j&&(j.parentNode.remove(),j=!1),u()))}function w(){b().finally(g)}function x(){if(e())return
let s=C()
s.height=20,s=C(),s.className="fshCenter",r(l("enableSeTracker"),s),t(s,"change",y),a.enableSeTracker&&h().then(w)}export default x
//# sourceMappingURL=superelite-e8ec3ce1.js.map
