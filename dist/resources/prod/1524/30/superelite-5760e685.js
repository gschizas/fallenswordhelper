import{x as e,A as t,f as r,c as a,p as n,Y as s,e as o,h as c,t as f,i}from"./calfSystem-6459f18a.js"
import"./numberIsNaN-fa7d637d.js"
import"./idb-737f325b.js"
import"./isChecked-6167b36b.js"
import{b as l}from"./simpleCheckbox-994bcb83.js"
import{c as d}from"./createTBody-f03317b5.js"
import{c as m}from"./createTable-0679902c.js"
import{i as u,f as b}from"./isDate-546a6320.js"
import{p as h}from"./padZ-bd3dfcf9.js"
import{getFshSeLog as T,doBackgroundCheck as p,oldLog as C,disableBackgroundChecks as S}from"./seLog-37790384.js"
function g(e){return[e.getUTCFullYear().toString()].concat(function(e){return[e.getUTCMonth()+1,e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds()].map(h)}(e))}let k
function j(e,t){i(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(u(e))return b(g(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=m({className:"fshTTracker"}),r=d({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return c(t,r),e.forEach(f(j,r)),t}(e)
k=U(),c(k,t)}function y(e,t){return e[1]-t[1]}function w(){C&&C.se&&N(o(C.se).sort(y))}function x(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,s("enableSeTracker",a.enableSeTracker),a.enableSeTracker?p().finally(w):(k&&(k.parentNode.remove(),k=!1),S()))}function D(){p().finally(w)}function L(){if(e())return
let n=U()
n.height=20,n=U(),n.className="fshCenter",t(l("enableSeTracker"),n),r(n,"change",x),a.enableSeTracker&&T().then(D)}export default L
//# sourceMappingURL=superelite-5760e685.js.map
