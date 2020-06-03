import{w as e,z as t,e as r,c as a,p as n,W as s,l as c,f as o,s as f,i}from"./calfSystem-6fc0cc1b.js"
import"./numberIsNaN-4ae9af58.js"
import"./idb-92d6a2b5.js"
import"./isChecked-ce5ca840.js"
import{b as l}from"./simpleCheckbox-a0ada781.js"
import{c as d}from"./createTBody-f954eeed.js"
import{c as m}from"./createTable-380d7c97.js"
import{i as u,f as h}from"./isDate-12da8c02.js"
import{p as T}from"./padZ-8f1e016d.js"
import{getFshSeLog as p,doBackgroundCheck as C,oldLog as b,disableBackgroundChecks as S}from"./seLog-2ad92fdb.js"
function g(e){return[e.getUTCFullYear().toString()].concat(function(e){return[e.getUTCMonth()+1,e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds()].map(T)}(e))}let k
function j(e,t){i(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(u(e))return h(g(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=m({className:"fshTTracker"}),r=d({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return o(t,r),e.forEach(f(j,r)),t}(e)
k=U(),o(k,t)}function w(e,t){return e[1]-t[1]}function y(){b&&b.se&&N(c(b.se).sort(w))}function D(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,s("enableSeTracker",a.enableSeTracker),a.enableSeTracker?C().finally(y):(k&&(k.parentNode.remove(),k=!1),S()))}function L(){C().finally(y)}export default function(){if(e())return
let n=U()
n.height=20,n=U(),n.className="fshCenter",t(l("enableSeTracker"),n),r(n,"change",D),a.enableSeTracker&&p().then(L)}
//# sourceMappingURL=superelite-0f149d29.js.map
