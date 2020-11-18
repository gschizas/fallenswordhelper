import{x as e,A as t,f as r,c as a,p as n,Y as s,e as o,h as c,t as i,i as f}from"./calfSystem-f9a27018.js"
import"./numberIsNaN-d1ebf732.js"
import"./idb-5c501cd3.js"
import"./isChecked-92297855.js"
import{b as l}from"./simpleCheckbox-7d7105d2.js"
import{c as d}from"./createTBody-d6b63075.js"
import{c as m}from"./createTable-1203d2c6.js"
import{i as u,f as h}from"./isDate-14b56c12.js"
import{p as T}from"./padZ-a3ed1fe1.js"
import{getFshSeLog as p,doBackgroundCheck as b,oldLog as C,disableBackgroundChecks as S}from"./seLog-a64b1d03.js"
function g(e){return[e.getUTCFullYear().toString()].concat(function(e){return[e.getUTCMonth()+1,e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds()].map(T)}(e))}let k
function j(e,t){f(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(u(e))return h(g(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=m({className:"fshTTracker"}),r=d({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return c(t,r),e.forEach(i(j,r)),t}(e)
k=U(),c(k,t)}function y(e,t){return e[1]-t[1]}function w(){C&&C.se&&N(o(C.se).sort(y))}function x(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,s("enableSeTracker",a.enableSeTracker),a.enableSeTracker?b().finally(w):(k&&(k.parentNode.remove(),k=!1),S()))}function D(){b().finally(w)}function L(){if(e())return
let n=U()
n.height=20,n=U(),n.className="fshCenter",t(l("enableSeTracker"),n),r(n,"change",x),a.enableSeTracker&&p().then(D)}export default L
//# sourceMappingURL=superelite-abf08e93.js.map
