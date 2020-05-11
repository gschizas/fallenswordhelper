import{aJ as e,z as t,C as a,f as r,e as n,b8 as s,p as c,a4 as o,b9 as f,ba as i,q as l,bb as u,h as d,v as b,i as h}from"./calfSystem-72fdbe97.js"
import"./numberIsNaN-7d89f7bf.js"
import"./isChecked-66e1d489.js"
import{b as m}from"./simpleCheckbox-c6b19142.js"
import{c as T}from"./createTBody-48199bf0.js"
import{c as C}from"./createTable-8595230a.js"
import{i as p,f as S}from"./isDate-08d5ec71.js"
function k(t){return[t.getUTCFullYear().toString()].concat(function(t){return[t.getUTCMonth()+1,t.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds()].map(e)}(t))}let g
function j(e,t){h(e,`<tr><td class="fshCenter">${t[0]}</td>`+`<td class="fshBold fshCenter fshCooldown">${function(e){if(p(e))return S(k(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=c.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=C({className:"fshTTracker"}),a=T({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return d(t,a),e.forEach(b(j,a)),t}(e)
g=U(),d(g,t)}function y(e,t){return e[1]-t[1]}function w(){i&&i.se&&N(l(i.se).sort(y))}function D(e){"enableSeTracker"===e.target.id&&(n.enableSeTracker=!n.enableSeTracker,o("enableSeTracker",n.enableSeTracker),n.enableSeTracker?f().finally(w):(g&&(g.parentNode.remove(),g=!1),u()))}function M(){f().finally(w)}export default function(){if(t())return
let e=U()
e.height=20,e=U(),e.className="fshCenter",a(m("enableSeTracker"),e),r(e,"change",D),n.enableSeTracker&&s().then(M)}
//# sourceMappingURL=superelite-d2c7f52f.js.map
