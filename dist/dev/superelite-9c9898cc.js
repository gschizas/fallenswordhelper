import{z as e,C as a,f as r,e as t,bc as s,p as n,a5 as c,bd as o,be as f,q as l,bf as i,h as m,v as b,i as d}from"./calfSystem-9b1fa4ca.js"
import"./numberIsNaN-6f59053c.js"
import"./isChecked-c7d79538.js"
import{b as h}from"./simpleCheckbox-8c7c7b00.js"
import{c as u}from"./createTBody-7410a11b.js"
import{c as T}from"./createTable-aa7942b1.js"
import"./isDate-dcf658b5.js"
import{f as p}from"./formatUtcDateTime-1a4f6598.js"
let C
function k(e,a){d(e,`<tr><td class="fshCenter">${a[0]}</td>`+`<td class="fshBold fshCenter fshCooldown">${p(new Date(1e3*a[1]))}</td></tr>`)}function S(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function j(e){const a=function(e){const a=T({className:"fshTTracker"}),r=u({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return m(a,r),e.forEach(b(k,r)),a}(e)
C=S(),m(C,a)}function N(e,a){return e[1]-a[1]}function y(){f&&f.se&&j(l(f.se).sort(N))}function g(e){"enableSeTracker"===e.target.id&&(t.enableSeTracker=!t.enableSeTracker,c("enableSeTracker",t.enableSeTracker),t.enableSeTracker?o().finally(y):(C&&(C.parentNode.remove(),C=!1),i()))}function w(){o().finally(y)}export default function(){if(e())return
let n=S()
n.height=20,n=S(),n.className="fshCenter",a(h("enableSeTracker"),n),r(n,"change",g),t.enableSeTracker&&s().then(w)}
//# sourceMappingURL=superelite-9c9898cc.js.map
