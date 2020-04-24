import{z as e,C as a,f as r,e as t,bc as s,p as n,a5 as c,bd as f,be as o,q as l,bf as i,h as d,v as m,i as b}from"./calfSystem-94018cd0.js"
import"./numberIsNaN-b4c6efab.js"
import"./isChecked-a7321077.js"
import{b as h}from"./simpleCheckbox-8df8914d.js"
import{c as u}from"./createTBody-4db6f281.js"
import{c as T}from"./createTable-f30811ff.js"
import"./isDate-c1cc18a3.js"
import{f as p}from"./formatUtcDateTime-a9fd1a5f.js"
let C
function k(e,a){b(e,`<tr><td class="fshCenter">${a[0]}</td>`+`<td class="fshBold fshCenter fshCooldown">${p(new Date(1e3*a[1]))}</td></tr>`)}function S(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function j(e){const a=function(e){const a=T({className:"fshTTracker"}),r=u({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return d(a,r),e.forEach(m(k,r)),a}(e)
C=S(),d(C,a)}function N(e,a){return e[1]-a[1]}function y(){o&&o.se&&j(l(o.se).sort(N))}function g(e){"enableSeTracker"===e.target.id&&(t.enableSeTracker=!t.enableSeTracker,c("enableSeTracker",t.enableSeTracker),t.enableSeTracker?f().finally(y):(C&&(C.parentNode.remove(),C=!1),i()))}function w(){f().finally(y)}export default function(){if(e())return
let n=S()
n.height=20,n=S(),n.className="fshCenter",a(h("enableSeTracker"),n),r(n,"change",g),t.enableSeTracker&&s().then(w)}
//# sourceMappingURL=superelite-7b8261b8.js.map
