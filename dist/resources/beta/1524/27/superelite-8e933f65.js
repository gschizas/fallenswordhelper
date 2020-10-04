import{x as e,A as t,f as r,c as a,p as n,Z as s,e as c,h as o,t as i,i as f}from"./calfSystem-70c7a660.js"
import"./numberIsNaN-871eca26.js"
import"./idb-d93da5f0.js"
import"./isChecked-ed98077f.js"
import{b as l}from"./simpleCheckbox-334243d2.js"
import{c as d}from"./createTBody-0057c25b.js"
import{c as m}from"./createTable-72dc1b73.js"
import{i as u,f as h}from"./isDate-ad4f47cd.js"
import{p as T}from"./padZ-b87d0d09.js"
import{getFshSeLog as p,doBackgroundCheck as C,oldLog as b,disableBackgroundChecks as S}from"./seLog-025c14ac.js"
function g(e){return[e.getUTCFullYear().toString()].concat(function(e){return[e.getUTCMonth()+1,e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds()].map(T)}(e))}let k
function j(e,t){f(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(u(e))return h(g(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=m({className:"fshTTracker"}),r=d({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return o(t,r),e.forEach(i(j,r)),t}(e)
k=U(),o(k,t)}function y(e,t){return e[1]-t[1]}function w(){b&&b.se&&N(c(b.se).sort(y))}function x(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,s("enableSeTracker",a.enableSeTracker),a.enableSeTracker?C().finally(w):(k&&(k.parentNode.remove(),k=!1),S()))}function D(){C().finally(w)}function L(){if(e())return
let n=U()
n.height=20,n=U(),n.className="fshCenter",t(l("enableSeTracker"),n),r(n,"change",x),a.enableSeTracker&&p().then(D)}export default L
//# sourceMappingURL=superelite-8e933f65.js.map
