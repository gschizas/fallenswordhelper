import{x as e,A as r,f as t,c as a,p as s,Z as n,e as c,h as o,t as f,i}from"./calfSystem-9c7241dc.js"
import"./numberIsNaN-7270cc8c.js"
import"./idb-5f8a9591.js"
import"./isChecked-6dfc89f5.js"
import{b as l}from"./simpleCheckbox-6241d838.js"
import{c as m}from"./createTBody-146954cc.js"
import{c as d}from"./createTable-711dc1b7.js"
import"./isDate-b97c9238.js"
import"./padZ-95af3fc2.js"
import{getFshSeLog as h,doBackgroundCheck as p,oldLog as u,disableBackgroundChecks as b}from"./seLog-34033c24.js"
import{f as T}from"./formatUtcDateTime-aa67f421.js"
let j
function k(e,r){i(e,`<tr><td class="fshCenter">${r[0]}</td><td class="fshBold fshCenter fshCooldown">${T(new Date(1e3*r[1]))}</td></tr>`)}function C(){const e=s.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function S(e){const r=function(e){const r=d({className:"fshTTracker"}),t=m({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return o(r,t),e.forEach(f(k,t)),r}(e)
j=C(),o(j,r)}function N(e,r){return e[1]-r[1]}function g(){u&&u.se&&S(c(u.se).sort(N))}function y(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,n("enableSeTracker",a.enableSeTracker),a.enableSeTracker?p().finally(g):(j&&(j.parentNode.remove(),j=!1),b()))}function w(){p().finally(g)}export default function(){if(e())return
let s=C()
s.height=20,s=C(),s.className="fshCenter",r(l("enableSeTracker"),s),t(s,"change",y),a.enableSeTracker&&h().then(w)}
//# sourceMappingURL=superelite-c05834a1.js.map
