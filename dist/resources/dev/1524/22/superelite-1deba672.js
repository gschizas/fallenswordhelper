import{x as e,A as r,f as t,c as a,p as s,Z as n,e as c,h as f,t as o,i}from"./calfSystem-4cc738f8.js"
import"./numberIsNaN-1f5d9185.js"
import"./idb-670c0cca.js"
import"./isChecked-464466aa.js"
import{b as l}from"./simpleCheckbox-326bdee4.js"
import{c as m}from"./createTBody-e25839cf.js"
import{c as d}from"./createTable-8f45252e.js"
import"./isDate-f0efcfda.js"
import"./padZ-efc0fa0f.js"
import{getFshSeLog as h,doBackgroundCheck as p,oldLog as u,disableBackgroundChecks as b}from"./seLog-9cff5296.js"
import{f as T}from"./formatUtcDateTime-af21e3db.js"
let j
function k(e,r){i(e,`<tr><td class="fshCenter">${r[0]}</td><td class="fshBold fshCenter fshCooldown">${T(new Date(1e3*r[1]))}</td></tr>`)}function C(){const e=s.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function S(e){const r=function(e){const r=d({className:"fshTTracker"}),t=m({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return f(r,t),e.forEach(o(k,t)),r}(e)
j=C(),f(j,r)}function N(e,r){return e[1]-r[1]}function g(){u&&u.se&&S(c(u.se).sort(N))}function y(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,n("enableSeTracker",a.enableSeTracker),a.enableSeTracker?p().finally(g):(j&&(j.parentNode.remove(),j=!1),b()))}function w(){p().finally(g)}export default function(){if(e())return
let s=C()
s.height=20,s=C(),s.className="fshCenter",r(l("enableSeTracker"),s),t(s,"change",y),a.enableSeTracker&&h().then(w)}
//# sourceMappingURL=superelite-1deba672.js.map
