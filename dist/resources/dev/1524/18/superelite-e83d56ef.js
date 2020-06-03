import{w as e,z as a,e as r,c as t,p as s,X as n,l as o,f as c,s as i,i as l}from"./calfSystem-5545a3e6.js"
import"./numberIsNaN-0d2994c6.js"
import"./idb-ab1a88c6.js"
import"./isChecked-ae232d81.js"
import{b as f}from"./simpleCheckbox-16914843.js"
import{c as d}from"./createTBody-14d36590.js"
import{c as m}from"./createTable-b1e7ce39.js"
import"./isDate-f8d1bd37.js"
import"./padZ-d6df3a69.js"
import{getFshSeLog as b,doBackgroundCheck as h,oldLog as p,disableBackgroundChecks as u}from"./seLog-25d58558.js"
import{f as T}from"./formatUtcDateTime-bd681baa.js"
let j
function k(e,a){l(e,`<tr><td class="fshCenter">${a[0]}</td><td class="fshBold fshCenter fshCooldown">${T(new Date(1e3*a[1]))}</td></tr>`)}function C(){const e=s.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function S(e){const a=function(e){const a=m({className:"fshTTracker"}),r=d({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return c(a,r),e.forEach(i(k,r)),a}(e)
j=C(),c(j,a)}function N(e,a){return e[1]-a[1]}function g(){p&&p.se&&S(o(p.se).sort(N))}function w(e){"enableSeTracker"===e.target.id&&(t.enableSeTracker=!t.enableSeTracker,n("enableSeTracker",t.enableSeTracker),t.enableSeTracker?h().finally(g):(j&&(j.parentNode.remove(),j=!1),u()))}function y(){h().finally(g)}export default function(){if(e())return
let s=C()
s.height=20,s=C(),s.className="fshCenter",a(f("enableSeTracker"),s),r(s,"change",w),t.enableSeTracker&&b().then(y)}
//# sourceMappingURL=superelite-e83d56ef.js.map
