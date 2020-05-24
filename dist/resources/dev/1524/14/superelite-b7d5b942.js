import{y as e,B as a,e as r,c as t,bb as s,p as n,a4 as c,bc as o,bd as f,n as l,be as i,f as d,u as b,i as m}from"./calfSystem-d96a3efd.js"
import"./numberIsNaN-5b8bfc11.js"
import"./isChecked-028fa109.js"
import{b as h}from"./simpleCheckbox-fb9f4a06.js"
import{c as u}from"./createTBody-f70881cb.js"
import{c as T}from"./createTable-13920811.js"
import"./isDate-b5dd2678.js"
import{f as p}from"./formatUtcDateTime-e6029519.js"
let k
function C(e,a){m(e,`<tr><td class="fshCenter">${a[0]}</td><td class="fshBold fshCenter fshCooldown">${p(new Date(1e3*a[1]))}</td></tr>`)}function S(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function j(e){const a=function(e){const a=T({className:"fshTTracker"}),r=u({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return d(a,r),e.forEach(b(C,r)),a}(e)
k=S(),d(k,a)}function y(e,a){return e[1]-a[1]}function N(){f&&f.se&&j(l(f.se).sort(y))}function g(e){"enableSeTracker"===e.target.id&&(t.enableSeTracker=!t.enableSeTracker,c("enableSeTracker",t.enableSeTracker),t.enableSeTracker?o().finally(N):(k&&(k.parentNode.remove(),k=!1),i()))}function w(){o().finally(N)}export default function(){if(e())return
let n=S()
n.height=20,n=S(),n.className="fshCenter",a(h("enableSeTracker"),n),r(n,"change",g),t.enableSeTracker&&s().then(w)}
//# sourceMappingURL=superelite-b7d5b942.js.map
