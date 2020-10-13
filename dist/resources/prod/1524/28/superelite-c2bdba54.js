import{x as e,A as t,f as r,c as a,p as n,Y as s,e as c,h as o,t as i,i as f}from"./calfSystem-a5da5210.js"
import"./numberIsNaN-91041dcf.js"
import"./idb-2c141566.js"
import"./isChecked-12c32ad5.js"
import{b as l}from"./simpleCheckbox-b35743b7.js"
import{c as d}from"./createTBody-7279fad8.js"
import{c as m}from"./createTable-731fc93d.js"
import{i as u,f as h}from"./isDate-45c423ee.js"
import{p as T}from"./padZ-28ca6b6e.js"
import{getFshSeLog as b,doBackgroundCheck as p,oldLog as C,disableBackgroundChecks as S}from"./seLog-bd071cb0.js"
function g(e){return[e.getUTCFullYear().toString()].concat(function(e){return[e.getUTCMonth()+1,e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds()].map(T)}(e))}let k
function j(e,t){f(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(u(e))return h(g(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=m({className:"fshTTracker"}),r=d({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return o(t,r),e.forEach(i(j,r)),t}(e)
k=U(),o(k,t)}function y(e,t){return e[1]-t[1]}function w(){C&&C.se&&N(c(C.se).sort(y))}function x(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,s("enableSeTracker",a.enableSeTracker),a.enableSeTracker?p().finally(w):(k&&(k.parentNode.remove(),k=!1),S()))}function D(){p().finally(w)}function L(){if(e())return
let n=U()
n.height=20,n=U(),n.className="fshCenter",t(l("enableSeTracker"),n),r(n,"change",x),a.enableSeTracker&&b().then(D)}export default L
//# sourceMappingURL=superelite-c2bdba54.js.map
