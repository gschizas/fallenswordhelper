import{w as e,z as t,e as r,c as a,p as n,W as s,l as c,f as o,s as f,i}from"./calfSystem-4197cc22.js"
import"./numberIsNaN-1db4e673.js"
import"./idb-f3252f63.js"
import"./isChecked-3260d105.js"
import{b as l}from"./simpleCheckbox-8187e065.js"
import{c as m}from"./createTBody-c586129b.js"
import{c as u}from"./createTable-5f6ce6ed.js"
import{i as d,f as h}from"./isDate-bc6c8ff3.js"
import{p as T}from"./padZ-0ee33b17.js"
import{getFshSeLog as b,doBackgroundCheck as p,oldLog as C,disableBackgroundChecks as S}from"./seLog-38ba9caa.js"
function g(e){return[e.getUTCFullYear().toString()].concat(function(e){return[e.getUTCMonth()+1,e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds()].map(T)}(e))}let k
function j(e,t){i(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(d(e))return h(g(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=u({className:"fshTTracker"}),r=m({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return o(t,r),e.forEach(f(j,r)),t}(e)
k=U(),o(k,t)}function w(e,t){return e[1]-t[1]}function y(){C&&C.se&&N(c(C.se).sort(w))}function D(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,s("enableSeTracker",a.enableSeTracker),a.enableSeTracker?p().finally(y):(k&&(k.parentNode.remove(),k=!1),S()))}function L(){p().finally(y)}export default function(){if(e())return
let n=U()
n.height=20,n=U(),n.className="fshCenter",t(l("enableSeTracker"),n),r(n,"change",D),a.enableSeTracker&&b().then(L)}
//# sourceMappingURL=superelite-7fd94634.js.map
