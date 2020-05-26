import{w as e,z as t,e as a,c as r,aT as s,p as n,V as o,aU as c,aV as f,l as i,aW as l,f as d,s as u,i as m}from"./calfSystem-1262535f.js"
import"./numberIsNaN-e4fe1516.js"
import"./isChecked-d8a3d688.js"
import{b as T}from"./simpleCheckbox-69fdc6eb.js"
import{c as h}from"./createTBody-5668a27d.js"
import{c as b}from"./createTable-34bb0f34.js"
import{i as C,f as p}from"./isDate-b25d137c.js"
import{p as S}from"./padZ-9d5b7a82.js"
function k(e){return[e.getUTCFullYear().toString()].concat(function(e){return[e.getUTCMonth()+1,e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds()].map(S)}(e))}let g
function j(e,t){m(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(C(e))return p(k(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=b({className:"fshTTracker"}),a=h({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return d(t,a),e.forEach(u(j,a)),t}(e)
g=U(),d(g,t)}function w(e,t){return e[1]-t[1]}function y(){f&&f.se&&N(i(f.se).sort(w))}function D(e){"enableSeTracker"===e.target.id&&(r.enableSeTracker=!r.enableSeTracker,o("enableSeTracker",r.enableSeTracker),r.enableSeTracker?c().finally(y):(g&&(g.parentNode.remove(),g=!1),l()))}function M(){c().finally(y)}export default function(){if(e())return
let n=U()
n.height=20,n=U(),n.className="fshCenter",t(T("enableSeTracker"),n),a(n,"change",D),r.enableSeTracker&&s().then(M)}
//# sourceMappingURL=superelite-a7568bfa.js.map
