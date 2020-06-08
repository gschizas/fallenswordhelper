import{x as e,A as t,e as r,c as a,p as n,Y as s,m as c,f as o,t as i,i as f}from"./calfSystem-03970067.js"
import"./numberIsNaN-b19dc958.js"
import"./idb-3dad9172.js"
import"./isChecked-02800593.js"
import{b as l}from"./simpleCheckbox-6af8c076.js"
import{c as d}from"./createTBody-63c3fb8b.js"
import{c as m}from"./createTable-fdc4e68e.js"
import{i as u,f as h}from"./isDate-1d982223.js"
import{p as T}from"./padZ-5ea37ccb.js"
import{getFshSeLog as p,doBackgroundCheck as b,oldLog as C,disableBackgroundChecks as S}from"./seLog-04c97ded.js"
function g(e){return[e.getUTCFullYear().toString()].concat(function(e){return[e.getUTCMonth()+1,e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds()].map(T)}(e))}let k
function j(e,t){f(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(u(e))return h(g(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=m({className:"fshTTracker"}),r=d({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return o(t,r),e.forEach(i(j,r)),t}(e)
k=U(),o(k,t)}function y(e,t){return e[1]-t[1]}function w(){C&&C.se&&N(c(C.se).sort(y))}function x(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,s("enableSeTracker",a.enableSeTracker),a.enableSeTracker?b().finally(w):(k&&(k.parentNode.remove(),k=!1),S()))}function D(){b().finally(w)}export default function(){if(e())return
let n=U()
n.height=20,n=U(),n.className="fshCenter",t(l("enableSeTracker"),n),r(n,"change",x),a.enableSeTracker&&p().then(D)}
//# sourceMappingURL=superelite-755087f2.js.map
