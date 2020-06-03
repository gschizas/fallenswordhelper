import{M as t,p as n,o as s,D as o,f as e,y as a,z as r,a1 as i,a2 as u}from"./calfSystem-57340987.js"
import{d as c}from"./dontPost-e24d8962.js"
import{c as f}from"./createTr-8778e34e.js"
import{o as l}from"./outputFormat-db9309e5.js"
function p(t){t.preventDefault(),c(n)}function d(){const t=o(i)
return t<u-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let n=Math.floor((u-t)/6e4)
const s=Math.floor(n/60)
return n%=60,l(s," hours, ")+n+" mins"}(t)}function m(){const t=f()
return function(t){const n=t.insertCell(-1)
n.height=25,a("Last Reset:",n)}(t),function(t){const n=t.insertCell(-1)
n.align="right",r(d(),n)}(t),t}export default function(){!function(){const o=t('input[type="submit"]',n)
o&&s(o,p)}(),o("trackLadderReset")&&function(){const n=t("#pCC table"),s=m()
e(n,s)}()}
//# sourceMappingURL=ladder-bd2cbf66.js.map
