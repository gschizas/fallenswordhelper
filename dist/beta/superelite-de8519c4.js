import{aJ as e,z as t,C as a,f as r,e as n,b8 as s,p as c,a4 as o,b9 as i,ba as f,q as l,bb as u,h,v as m,i as b}from"./calfSystem-70c0e373.js"
import"./numberIsNaN-a9336482.js"
import"./isChecked-92f0e13a.js"
import{b as d}from"./simpleCheckbox-a38925a1.js"
import{c as T}from"./createTBody-81f63b95.js"
import{c as C}from"./createTable-9ce47553.js"
import{i as p,f as S}from"./isDate-cc4b6185.js"
function k(t){return[t.getUTCFullYear().toString()].concat(function(t){return[t.getUTCMonth()+1,t.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds()].map(e)}(t))}let g
function j(e,t){b(e,`<tr><td class="fshCenter">${t[0]}</td>`+`<td class="fshBold fshCenter fshCooldown">${function(e){if(p(e))return S(k(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=c.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=C({className:"fshTTracker"}),a=T({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return h(t,a),e.forEach(m(j,a)),t}(e)
g=U(),h(g,t)}function y(e,t){return e[1]-t[1]}function w(){f&&f.se&&N(l(f.se).sort(y))}function D(e){"enableSeTracker"===e.target.id&&(n.enableSeTracker=!n.enableSeTracker,o("enableSeTracker",n.enableSeTracker),n.enableSeTracker?i().finally(w):(g&&(g.parentNode.remove(),g=!1),u()))}function M(){i().finally(w)}export default function(){if(t())return
let e=U()
e.height=20,e=U(),e.className="fshCenter",a(d("enableSeTracker"),e),r(e,"change",D),n.enableSeTracker&&s().then(M)}
//# sourceMappingURL=superelite-de8519c4.js.map
