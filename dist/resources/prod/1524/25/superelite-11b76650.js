import{x as e,A as t,f as r,c as a,p as n,Y as s,e as o,h as c,t as i,i as f}from"./calfSystem-71b9378d.js"
import"./numberIsNaN-929de7af.js"
import"./idb-97e2a44e.js"
import"./isChecked-9f10b428.js"
import{b as l}from"./simpleCheckbox-1a2b6475.js"
import{c as m}from"./createTBody-a4a451e2.js"
import{c as u}from"./createTable-0f37c9d5.js"
import{i as d,f as h}from"./isDate-b3759236.js"
import{p as T}from"./padZ-0c2f5370.js"
import{getFshSeLog as p,doBackgroundCheck as b,oldLog as C,disableBackgroundChecks as S}from"./seLog-018025a2.js"
function g(e){return[e.getUTCFullYear().toString()].concat(function(e){return[e.getUTCMonth()+1,e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds()].map(T)}(e))}let k
function j(e,t){f(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(d(e))return h(g(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=u({className:"fshTTracker"}),r=m({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return c(t,r),e.forEach(i(j,r)),t}(e)
k=U(),c(k,t)}function y(e,t){return e[1]-t[1]}function w(){C&&C.se&&N(o(C.se).sort(y))}function x(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,s("enableSeTracker",a.enableSeTracker),a.enableSeTracker?b().finally(w):(k&&(k.parentNode.remove(),k=!1),S()))}function D(){b().finally(w)}function L(){if(e())return
let n=U()
n.height=20,n=U(),n.className="fshCenter",t(l("enableSeTracker"),n),r(n,"change",x),a.enableSeTracker&&p().then(D)}export default L
//# sourceMappingURL=superelite-11b76650.js.map
