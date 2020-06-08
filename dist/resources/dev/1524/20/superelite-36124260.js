import{x as e,A as r,e as t,c as a,p as s,Z as n,m as c,f as o,t as f,i}from"./calfSystem-a2862afc.js"
import"./numberIsNaN-77d06981.js"
import"./idb-911ff7c2.js"
import"./isChecked-e0d689b2.js"
import{b as l}from"./simpleCheckbox-c8f3914c.js"
import{c as m}from"./createTBody-9b48ed82.js"
import{c as d}from"./createTable-6dbc7d62.js"
import"./isDate-4c8ac6ee.js"
import"./padZ-c3ec0e2d.js"
import{getFshSeLog as h,doBackgroundCheck as b,oldLog as p,disableBackgroundChecks as u}from"./seLog-2f731521.js"
import{f as T}from"./formatUtcDateTime-89b5f49f.js"
let j
function k(e,r){i(e,`<tr><td class="fshCenter">${r[0]}</td><td class="fshBold fshCenter fshCooldown">${T(new Date(1e3*r[1]))}</td></tr>`)}function C(){const e=s.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function S(e){const r=function(e){const r=d({className:"fshTTracker"}),t=m({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return o(r,t),e.forEach(f(k,t)),r}(e)
j=C(),o(j,r)}function N(e,r){return e[1]-r[1]}function g(){p&&p.se&&S(c(p.se).sort(N))}function y(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,n("enableSeTracker",a.enableSeTracker),a.enableSeTracker?b().finally(g):(j&&(j.parentNode.remove(),j=!1),u()))}function w(){b().finally(g)}export default function(){if(e())return
let s=C()
s.height=20,s=C(),s.className="fshCenter",r(l("enableSeTracker"),s),t(s,"change",y),a.enableSeTracker&&h().then(w)}
//# sourceMappingURL=superelite-36124260.js.map
