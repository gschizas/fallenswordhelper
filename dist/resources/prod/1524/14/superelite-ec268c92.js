import{aI as e,y as t,B as a,e as r,c as n,b7 as s,p as c,a3 as o,b8 as f,b9 as i,n as l,ba as d,f as u,u as m,i as b}from"./calfSystem-d587d232.js"
import"./numberIsNaN-054e0c59.js"
import"./isChecked-75e8367b.js"
import{b as h}from"./simpleCheckbox-d7dd72e2.js"
import{c as T}from"./createTBody-d864b9fe.js"
import{c as C}from"./createTable-5f8e2bd3.js"
import{i as p,f as S}from"./isDate-e674ecfd.js"
function k(t){return[t.getUTCFullYear().toString()].concat(function(t){return[t.getUTCMonth()+1,t.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds()].map(e)}(t))}let g
function j(e,t){b(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(p(e))return S(k(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=c.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function y(e){const t=function(e){const t=C({className:"fshTTracker"}),a=T({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return u(t,a),e.forEach(m(j,a)),t}(e)
g=U(),u(g,t)}function N(e,t){return e[1]-t[1]}function w(){i&&i.se&&y(l(i.se).sort(N))}function B(e){"enableSeTracker"===e.target.id&&(n.enableSeTracker=!n.enableSeTracker,o("enableSeTracker",n.enableSeTracker),n.enableSeTracker?f().finally(w):(g&&(g.parentNode.remove(),g=!1),d()))}function D(){f().finally(w)}export default function(){if(t())return
let e=U()
e.height=20,e=U(),e.className="fshCenter",a(h("enableSeTracker"),e),r(e,"change",B),n.enableSeTracker&&s().then(D)}
//# sourceMappingURL=superelite-ec268c92.js.map
