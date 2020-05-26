import{w as e,z as a,e as r,c as t,aV as s,p as n,W as c,aW as o,aX as f,l,aY as i,f as d,s as m,i as h}from"./calfSystem-ee582533.js"
import"./numberIsNaN-c9f76e43.js"
import"./isChecked-21b2756d.js"
import{b}from"./simpleCheckbox-eb1aed29.js"
import{c as u}from"./createTBody-aa153e3a.js"
import{c as p}from"./createTable-cbb3667c.js"
import"./isDate-f3df3fd8.js"
import"./padZ-55be60ec.js"
import{f as T}from"./formatUtcDateTime-af60a5d7.js"
let k
function C(e,a){h(e,`<tr><td class="fshCenter">${a[0]}</td><td class="fshBold fshCenter fshCooldown">${T(new Date(1e3*a[1]))}</td></tr>`)}function S(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function j(e){const a=function(e){const a=p({className:"fshTTracker"}),r=u({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return d(a,r),e.forEach(m(C,r)),a}(e)
k=S(),d(k,a)}function N(e,a){return e[1]-a[1]}function w(){f&&f.se&&j(l(f.se).sort(N))}function y(e){"enableSeTracker"===e.target.id&&(t.enableSeTracker=!t.enableSeTracker,c("enableSeTracker",t.enableSeTracker),t.enableSeTracker?o().finally(w):(k&&(k.parentNode.remove(),k=!1),i()))}function g(){o().finally(w)}export default function(){if(e())return
let n=S()
n.height=20,n=S(),n.className="fshCenter",a(b("enableSeTracker"),n),r(n,"change",y),t.enableSeTracker&&s().then(g)}
//# sourceMappingURL=superelite-8048c0ab.js.map
