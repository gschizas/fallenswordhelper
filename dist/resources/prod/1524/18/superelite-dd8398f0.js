import{w as e,z as t,e as r,c as a,p as n,W as s,l as o,f as c,s as i,i as f}from"./calfSystem-8b6534a5.js"
import"./numberIsNaN-0a4ef3fd.js"
import"./idb-abce8d8d.js"
import"./isChecked-cb800ed0.js"
import{b as l}from"./simpleCheckbox-c60a3930.js"
import{c as d}from"./createTBody-4807b059.js"
import{c as m}from"./createTable-e198f036.js"
import{i as u,f as b}from"./isDate-003113bc.js"
import{p as h}from"./padZ-1409dbd9.js"
import{getFshSeLog as T,doBackgroundCheck as p,oldLog as C,disableBackgroundChecks as S}from"./seLog-c0ed6ad0.js"
function g(e){return[e.getUTCFullYear().toString()].concat(function(e){return[e.getUTCMonth()+1,e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds()].map(h)}(e))}let k
function j(e,t){f(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(u(e))return b(g(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=m({className:"fshTTracker"}),r=d({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return c(t,r),e.forEach(i(j,r)),t}(e)
k=U(),c(k,t)}function w(e,t){return e[1]-t[1]}function y(){C&&C.se&&N(o(C.se).sort(w))}function D(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,s("enableSeTracker",a.enableSeTracker),a.enableSeTracker?p().finally(y):(k&&(k.parentNode.remove(),k=!1),S()))}function L(){p().finally(y)}export default function(){if(e())return
let n=U()
n.height=20,n=U(),n.className="fshCenter",t(l("enableSeTracker"),n),r(n,"change",D),a.enableSeTracker&&T().then(L)}
//# sourceMappingURL=superelite-dd8398f0.js.map
