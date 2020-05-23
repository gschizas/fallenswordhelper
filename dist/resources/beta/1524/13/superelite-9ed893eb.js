import{aJ as e,z as t,C as a,f as r,e as n,b8 as s,p as c,a4 as o,b9 as f,ba as i,q as l,bb as u,h as b,v as d,i as h}from"./calfSystem-1e164202.js"
import"./numberIsNaN-caf9724d.js"
import"./isChecked-a6837b63.js"
import{b as m}from"./simpleCheckbox-e560fb3f.js"
import{c as T}from"./createTBody-75fc7b64.js"
import{c as C}from"./createTable-82fabb58.js"
import{i as p,f as S}from"./isDate-15e6062a.js"
function k(t){return[t.getUTCFullYear().toString()].concat(function(t){return[t.getUTCMonth()+1,t.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds()].map(e)}(t))}let g
function j(e,t){h(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(p(e))return S(k(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=c.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=C({className:"fshTTracker"}),a=T({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return b(t,a),e.forEach(d(j,a)),t}(e)
g=U(),b(g,t)}function y(e,t){return e[1]-t[1]}function w(){i&&i.se&&N(l(i.se).sort(y))}function D(e){"enableSeTracker"===e.target.id&&(n.enableSeTracker=!n.enableSeTracker,o("enableSeTracker",n.enableSeTracker),n.enableSeTracker?f().finally(w):(g&&(g.parentNode.remove(),g=!1),u()))}function M(){f().finally(w)}export default function(){if(t())return
let e=U()
e.height=20,e=U(),e.className="fshCenter",a(m("enableSeTracker"),e),r(e,"change",D),n.enableSeTracker&&s().then(M)}
//# sourceMappingURL=superelite-9ed893eb.js.map
