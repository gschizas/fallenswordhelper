import{w as e,z as a,e as r,c as t,p as s,X as n,l as c,f as o,s as f,i}from"./calfSystem-1c103624.js"
import"./numberIsNaN-40c4542d.js"
import"./idb-347cc2af.js"
import"./isChecked-acff895a.js"
import{b as l}from"./simpleCheckbox-195e8c73.js"
import{c as m}from"./createTBody-063a5f27.js"
import{c as d}from"./createTable-930c2471.js"
import"./isDate-a4926894.js"
import"./padZ-717e9500.js"
import{getFshSeLog as h,doBackgroundCheck as p,oldLog as u,disableBackgroundChecks as b}from"./seLog-1a124da8.js"
import{f as T}from"./formatUtcDateTime-2746debb.js"
let j
function k(e,a){i(e,`<tr><td class="fshCenter">${a[0]}</td><td class="fshBold fshCenter fshCooldown">${T(new Date(1e3*a[1]))}</td></tr>`)}function C(){const e=s.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function S(e){const a=function(e){const a=d({className:"fshTTracker"}),r=m({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return o(a,r),e.forEach(f(k,r)),a}(e)
j=C(),o(j,a)}function N(e,a){return e[1]-a[1]}function g(){u&&u.se&&S(c(u.se).sort(N))}function w(e){"enableSeTracker"===e.target.id&&(t.enableSeTracker=!t.enableSeTracker,n("enableSeTracker",t.enableSeTracker),t.enableSeTracker?p().finally(g):(j&&(j.parentNode.remove(),j=!1),b()))}function y(){p().finally(g)}export default function(){if(e())return
let s=C()
s.height=20,s=C(),s.className="fshCenter",a(l("enableSeTracker"),s),r(s,"change",w),t.enableSeTracker&&h().then(y)}
//# sourceMappingURL=superelite-1892dd9b.js.map
