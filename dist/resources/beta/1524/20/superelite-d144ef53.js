import{x as e,A as t,e as r,c as a,p as n,Y as s,m as o,f as c,t as i,i as f}from"./calfSystem-05554bae.js"
import"./numberIsNaN-d04aa9f7.js"
import"./idb-862da886.js"
import"./isChecked-57b4060d.js"
import{b as l}from"./simpleCheckbox-1bbe1878.js"
import{c as d}from"./createTBody-24bbe037.js"
import{c as m}from"./createTable-db205e04.js"
import{i as u,f as b}from"./isDate-b81a8388.js"
import{p as h}from"./padZ-14d8d7ee.js"
import{getFshSeLog as T,doBackgroundCheck as p,oldLog as C,disableBackgroundChecks as S}from"./seLog-ea58f8bc.js"
function g(e){return[e.getUTCFullYear().toString()].concat(function(e){return[e.getUTCMonth()+1,e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds()].map(h)}(e))}let k
function j(e,t){f(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(u(e))return b(g(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=m({className:"fshTTracker"}),r=d({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return c(t,r),e.forEach(i(j,r)),t}(e)
k=U(),c(k,t)}function y(e,t){return e[1]-t[1]}function w(){C&&C.se&&N(o(C.se).sort(y))}function x(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,s("enableSeTracker",a.enableSeTracker),a.enableSeTracker?p().finally(w):(k&&(k.parentNode.remove(),k=!1),S()))}function D(){p().finally(w)}export default function(){if(e())return
let n=U()
n.height=20,n=U(),n.className="fshCenter",t(l("enableSeTracker"),n),r(n,"change",x),a.enableSeTracker&&T().then(D)}
//# sourceMappingURL=superelite-d144ef53.js.map
