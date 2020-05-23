import{z as e,C as a,f as r,e as t,bc as s,p as n,a5 as c,bd as o,be as f,q as l,bf as i,h as d,v as m,i as b}from"./calfSystem-01eb06ed.js"
import"./numberIsNaN-5d7b8ccd.js"
import"./isChecked-4667e9c3.js"
import{b as h}from"./simpleCheckbox-d5402db3.js"
import{c as u}from"./createTBody-dcdfd89a.js"
import{c as T}from"./createTable-1806515f.js"
import"./isDate-fee13b4a.js"
import{f as p}from"./formatUtcDateTime-29eee854.js"
let C
function k(e,a){b(e,`<tr><td class="fshCenter">${a[0]}</td><td class="fshBold fshCenter fshCooldown">${p(new Date(1e3*a[1]))}</td></tr>`)}function S(){const e=n.lastElementChild.insertRow(-1).insertCell(-1)
return e.colSpan=3,e}function j(e){const a=function(e){const a=T({className:"fshTTracker"}),r=u({innerHTML:'<tr><td class="header fshCenter">Creature</td><td class="header fshCenter">Last Kill</td></tr>'})
return d(a,r),e.forEach(m(k,r)),a}(e)
C=S(),d(C,a)}function N(e,a){return e[1]-a[1]}function y(){f&&f.se&&j(l(f.se).sort(N))}function g(e){"enableSeTracker"===e.target.id&&(t.enableSeTracker=!t.enableSeTracker,c("enableSeTracker",t.enableSeTracker),t.enableSeTracker?o().finally(y):(C&&(C.parentNode.remove(),C=!1),i()))}function w(){o().finally(y)}export default function(){if(e())return
let n=S()
n.height=20,n=S(),n.className="fshCenter",a(h("enableSeTracker"),n),r(n,"change",g),t.enableSeTracker&&s().then(w)}
//# sourceMappingURL=superelite-d7346a46.js.map
