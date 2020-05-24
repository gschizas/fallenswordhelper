import{aI as e,y as t,B as a,e as r,c as n,b7 as s,p as c,a3 as o,b8 as i,b9 as l,n as f,ba as u,f as d,u as m,i as h}from"./calfSystem-371c414c.js"
import"./numberIsNaN-987e3021.js"
import"./isChecked-b460a43d.js"
import{b as T}from"./simpleCheckbox-5ce6e544.js"
import{c as b}from"./createTBody-51b8edc4.js"
import{c as C}from"./createTable-ad174066.js"
import{i as p,f as S}from"./isDate-a362329c.js"
function k(t){return[t.getUTCFullYear().toString()].concat(function(t){return[t.getUTCMonth()+1,t.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds()].map(e)}(t))}let g
function j(e,t){h(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(p(e))return S(k(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=c.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function y(e){const t=function(e){const t=C({className:"fshTTracker"}),a=b({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return d(t,a),e.forEach(m(j,a)),t}(e)
g=U(),d(g,t)}function N(e,t){return e[1]-t[1]}function w(){l&&l.se&&y(f(l.se).sort(N))}function B(e){"enableSeTracker"===e.target.id&&(n.enableSeTracker=!n.enableSeTracker,o("enableSeTracker",n.enableSeTracker),n.enableSeTracker?i().finally(w):(g&&(g.parentNode.remove(),g=!1),u()))}function D(){i().finally(w)}export default function(){if(t())return
let e=U()
e.height=20,e=U(),e.className="fshCenter",a(T("enableSeTracker"),e),r(e,"change",B),n.enableSeTracker&&s().then(D)}
//# sourceMappingURL=superelite-b50e67fd.js.map
