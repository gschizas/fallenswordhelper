import{x as e,A as t,f as r,c as a,p as n,Y as s,e as c,h as o,t as f,i}from"./calfSystem-34fcd691.js"
import"./numberIsNaN-cb2409eb.js"
import"./idb-62d2605f.js"
import"./isChecked-8ee9db43.js"
import{b as l}from"./simpleCheckbox-86567985.js"
import{c as d}from"./createTBody-491c483b.js"
import{c as m}from"./createTable-615fb65e.js"
import{i as u,f as h}from"./isDate-32fe1182.js"
import{p as T}from"./padZ-ce2146a0.js"
import{getFshSeLog as b,doBackgroundCheck as p,oldLog as C,disableBackgroundChecks as S}from"./seLog-c2dcc9f9.js"
function g(e){return[e.getUTCFullYear().toString()].concat(function(e){return[e.getUTCMonth()+1,e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds()].map(T)}(e))}let k
function j(e,t){i(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(u(e))return h(g(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=m({className:"fshTTracker"}),r=d({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return o(t,r),e.forEach(f(j,r)),t}(e)
k=U(),o(k,t)}function y(e,t){return e[1]-t[1]}function w(){C&&C.se&&N(c(C.se).sort(y))}function x(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,s("enableSeTracker",a.enableSeTracker),a.enableSeTracker?p().finally(w):(k&&(k.parentNode.remove(),k=!1),S()))}function D(){p().finally(w)}export default function(){if(e())return
let n=U()
n.height=20,n=U(),n.className="fshCenter",t(l("enableSeTracker"),n),r(n,"change",x),a.enableSeTracker&&b().then(D)}
//# sourceMappingURL=superelite-c73b1e01.js.map
