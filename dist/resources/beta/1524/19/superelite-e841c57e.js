import{w as e,z as t,e as r,c as a,p as n,W as s,l as o,f as c,s as f,i}from"./calfSystem-57340987.js"
import"./numberIsNaN-9e712afc.js"
import"./idb-c55e2904.js"
import"./isChecked-e2c7160f.js"
import{b as l}from"./simpleCheckbox-0095209e.js"
import{c as m}from"./createTBody-6df13176.js"
import{c as u}from"./createTable-f10ae272.js"
import{i as d,f as h}from"./isDate-2c2b8ff6.js"
import{p as T}from"./padZ-4a0f9130.js"
import{getFshSeLog as p,doBackgroundCheck as C,oldLog as b,disableBackgroundChecks as S}from"./seLog-451f5423.js"
function g(e){return[e.getUTCFullYear().toString()].concat(function(e){return[e.getUTCMonth()+1,e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds()].map(T)}(e))}let k
function j(e,t){i(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(d(e))return h(g(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=u({className:"fshTTracker"}),r=m({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return c(t,r),e.forEach(f(j,r)),t}(e)
k=U(),c(k,t)}function w(e,t){return e[1]-t[1]}function y(){b&&b.se&&N(o(b.se).sort(w))}function D(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,s("enableSeTracker",a.enableSeTracker),a.enableSeTracker?C().finally(y):(k&&(k.parentNode.remove(),k=!1),S()))}function L(){C().finally(y)}export default function(){if(e())return
let n=U()
n.height=20,n=U(),n.className="fshCenter",t(l("enableSeTracker"),n),r(n,"change",D),a.enableSeTracker&&p().then(L)}
//# sourceMappingURL=superelite-e841c57e.js.map
