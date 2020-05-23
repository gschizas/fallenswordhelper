import{aJ as e,z as a,C as t,f as r,e as n,b8 as s,p as c,a4 as o,b9 as i,ba as f,q as l,bb as u,h as b,v as d,i as h}from"./calfSystem-4b4fbec4.js"
import"./numberIsNaN-3b37a036.js"
import"./isChecked-cda69a32.js"
import{b as m}from"./simpleCheckbox-8c161088.js"
import{c as T}from"./createTBody-a3ee228e.js"
import{c as C}from"./createTable-e950cf6b.js"
import{i as p,f as S}from"./isDate-0a89a2ae.js"
function k(a){return[a.getUTCFullYear().toString()].concat(function(a){return[a.getUTCMonth()+1,a.getUTCDate(),a.getUTCHours(),a.getUTCMinutes(),a.getUTCSeconds()].map(e)}(a))}let g
function j(e,a){h(e,`<tr><td class="fshCenter">${a[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(p(e))return S(k(e))}(new Date(1e3*a[1]))}</td></tr>`)}function U(){const e=c.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const a=function(e){const a=C({className:"fshTTracker"}),t=T({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return b(a,t),e.forEach(d(j,t)),a}(e)
g=U(),b(g,a)}function y(e,a){return e[1]-a[1]}function w(){f&&f.se&&N(l(f.se).sort(y))}function D(e){"enableSeTracker"===e.target.id&&(n.enableSeTracker=!n.enableSeTracker,o("enableSeTracker",n.enableSeTracker),n.enableSeTracker?i().finally(w):(g&&(g.parentNode.remove(),g=!1),u()))}function M(){i().finally(w)}export default function(){if(a())return
let e=U()
e.height=20,e=U(),e.className="fshCenter",t(m("enableSeTracker"),e),r(e,"change",D),n.enableSeTracker&&s().then(M)}
//# sourceMappingURL=superelite-5ed51619.js.map
