import{w as e,z as t,e as r,c as a,p as n,W as s,l as o,f as c,s as i,i as f}from"./calfSystem-dec5e071.js"
import"./numberIsNaN-ea515379.js"
import"./idb-8fe34e30.js"
import"./isChecked-9b2ad5c2.js"
import{b as l}from"./simpleCheckbox-3c52b154.js"
import{c as d}from"./createTBody-0a1e0d4a.js"
import{c as m}from"./createTable-e5b9da81.js"
import{i as u,f as h}from"./isDate-d6df2ce8.js"
import{p as T}from"./padZ-89cf7495.js"
import{getFshSeLog as p,doBackgroundCheck as C,oldLog as b,disableBackgroundChecks as S}from"./seLog-4f601510.js"
function g(e){return[e.getUTCFullYear().toString()].concat(function(e){return[e.getUTCMonth()+1,e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds()].map(T)}(e))}let k
function j(e,t){f(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(u(e))return h(g(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=m({className:"fshTTracker"}),r=d({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return c(t,r),e.forEach(i(j,r)),t}(e)
k=U(),c(k,t)}function w(e,t){return e[1]-t[1]}function y(){b&&b.se&&N(o(b.se).sort(w))}function D(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,s("enableSeTracker",a.enableSeTracker),a.enableSeTracker?C().finally(y):(k&&(k.parentNode.remove(),k=!1),S()))}function L(){C().finally(y)}export default function(){if(e())return
let n=U()
n.height=20,n=U(),n.className="fshCenter",t(l("enableSeTracker"),n),r(n,"change",D),a.enableSeTracker&&p().then(L)}
//# sourceMappingURL=superelite-dbb9aff7.js.map
