import{x as e,A as t,f as r,c as a,p as n,Z as s,e as o,h as c,t as i,i as f}from"./calfSystem-393ab895.js"
import{c as l}from"./createTBody-528613e5.js"
import{c as m}from"./createTable-aae48322.js"
import{i as u,f as d}from"./isDate-3e775446.js"
import{p as h}from"./padZ-4bdbf4bf.js"
import{b}from"./simpleCheckbox-649df0f1.js"
import{getFshSeLog as T,doBackgroundCheck as p,oldLog as C,disableBackgroundChecks as S}from"./seLog-e0884726.js"
import"./numberIsNaN-53300e34.js"
import"./isChecked-1c18cd61.js"
import"./idb-46b78b1e.js"
function g(e){return[e.getUTCFullYear().toString()].concat(function(e){return[e.getUTCMonth()+1,e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds()].map(h)}(e))}let k
function j(e,t){f(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(u(e))return d(g(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=m({className:"fshTTracker"}),r=l({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return c(t,r),e.forEach(i(j,r)),t}(e)
k=U(),c(k,t)}function y(e,t){return e[1]-t[1]}function w(){C&&C.se&&N(o(C.se).sort(y))}function x(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,s("enableSeTracker",a.enableSeTracker),a.enableSeTracker?p().finally(w):(k&&(k.parentNode.remove(),k=!1),S()))}function D(){p().finally(w)}function L(){if(e())return
let n=U()
n.height=20,n=U(),n.className="fshCenter",t(b("enableSeTracker"),n),r(n,"change",x),a.enableSeTracker&&T().then(D)}export default L
//# sourceMappingURL=superelite-3adee506.js.map
