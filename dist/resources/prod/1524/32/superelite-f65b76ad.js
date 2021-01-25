import{x as e,A as t,f as r,c as a,p as n,Z as s,e as c,h as o,t as f,i}from"./calfSystem-45544049.js"
import{c as l}from"./createTBody-ac35e412.js"
import{c as d}from"./createTable-7f36caa1.js"
import{i as m,f as u}from"./isDate-deba0fc7.js"
import{p as h}from"./padZ-0fd2ec23.js"
import{b as T}from"./simpleCheckbox-30d3f70c.js"
import{getFshSeLog as p,doBackgroundCheck as C,oldLog as b,disableBackgroundChecks as S}from"./seLog-8a8afc03.js"
import"./numberIsNaN-fecd7e6d.js"
import"./isChecked-00f5c23d.js"
import"./idb-ca3578bc.js"
function g(e){return[e.getUTCFullYear().toString()].concat(function(e){return[e.getUTCMonth()+1,e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds()].map(h)}(e))}let k
function j(e,t){i(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(m(e))return u(g(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=d({className:"fshTTracker"}),r=l({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return o(t,r),e.forEach(f(j,r)),t}(e)
k=U(),o(k,t)}function y(e,t){return e[1]-t[1]}function w(){b&&b.se&&N(c(b.se).sort(y))}function x(e){"enableSeTracker"===e.target.id&&(a.enableSeTracker=!a.enableSeTracker,s("enableSeTracker",a.enableSeTracker),a.enableSeTracker?C().finally(w):(k&&(k.parentNode.remove(),k=!1),S()))}function D(){C().finally(w)}function L(){if(e())return
let n=U()
n.height=20,n=U(),n.className="fshCenter",t(T("enableSeTracker"),n),r(n,"change",x),a.enableSeTracker&&p().then(D)}export default L
//# sourceMappingURL=superelite-f65b76ad.js.map
