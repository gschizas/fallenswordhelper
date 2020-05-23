import{aJ as e,z as t,C as a,f as r,e as n,b8 as s,p as c,a4 as o,b9 as f,ba as i,q as l,bb as u,h as d,v as h,i as m}from"./calfSystem-4f7c0235.js"
import"./numberIsNaN-c62a2787.js"
import"./isChecked-792dad25.js"
import{b as T}from"./simpleCheckbox-7843c1e5.js"
import{c as b}from"./createTBody-621c6d7d.js"
import{c as C}from"./createTable-6ffbc5ea.js"
import{i as p,f as S}from"./isDate-546c0676.js"
function k(t){return[t.getUTCFullYear().toString()].concat(function(t){return[t.getUTCMonth()+1,t.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds()].map(e)}(t))}let g
function j(e,t){m(e,`<tr><td class="fshCenter">${t[0]}</td>`+`<td class="fshBold fshCenter fshCooldown">${function(e){if(p(e))return S(k(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=c.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=C({className:"fshTTracker"}),a=b({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return d(t,a),e.forEach(h(j,a)),t}(e)
g=U(),d(g,t)}function y(e,t){return e[1]-t[1]}function w(){i&&i.se&&N(l(i.se).sort(y))}function D(e){"enableSeTracker"===e.target.id&&(n.enableSeTracker=!n.enableSeTracker,o("enableSeTracker",n.enableSeTracker),n.enableSeTracker?f().finally(w):(g&&(g.parentNode.remove(),g=!1),u()))}function M(){f().finally(w)}export default function(){if(t())return
let e=U()
e.height=20,e=U(),e.className="fshCenter",a(T("enableSeTracker"),e),r(e,"change",D),n.enableSeTracker&&s().then(M)}
//# sourceMappingURL=superelite-2c2160ec.js.map
