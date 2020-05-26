import{w as e,z as t,e as a,c as r,aT as s,p as n,V as c,aU as o,aV as i,l as f,aW as l,f as d,s as u,i as m}from"./calfSystem-740ec4d2.js"
import"./numberIsNaN-2fbabd4d.js"
import"./isChecked-3cb537d5.js"
import{b as T}from"./simpleCheckbox-f50ed15c.js"
import{c as h}from"./createTBody-cd7d668a.js"
import{c as b}from"./createTable-0cac6208.js"
import{i as C,f as p}from"./isDate-1559670b.js"
import{p as S}from"./padZ-54c74bdd.js"
function k(e){return[e.getUTCFullYear().toString()].concat(function(e){return[e.getUTCMonth()+1,e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds()].map(S)}(e))}let g
function j(e,t){m(e,`<tr><td class="fshCenter">${t[0]}</td><td class="fshBold fshCenter fshCooldown">${function(e){if(C(e))return p(k(e))}(new Date(1e3*t[1]))}</td></tr>`)}function U(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function N(e){const t=function(e){const t=b({className:"fshTTracker"}),a=h({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return d(t,a),e.forEach(u(j,a)),t}(e)
g=U(),d(g,t)}function w(e,t){return e[1]-t[1]}function y(){i&&i.se&&N(f(i.se).sort(w))}function D(e){"enableSeTracker"===e.target.id&&(r.enableSeTracker=!r.enableSeTracker,c("enableSeTracker",r.enableSeTracker),r.enableSeTracker?o().finally(y):(g&&(g.parentNode.remove(),g=!1),l()))}function M(){o().finally(y)}export default function(){if(e())return
let n=U()
n.height=20,n=U(),n.className="fshCenter",t(T("enableSeTracker"),n),a(n,"change",D),r.enableSeTracker&&s().then(M)}
//# sourceMappingURL=superelite-22eeb289.js.map
