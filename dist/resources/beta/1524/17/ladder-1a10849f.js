import{M as t,p as n,o as s,D as o,f as a,y as e,z as r,a1 as i,a2 as f}from"./calfSystem-02ae8657.js"
import{d as c}from"./dontPost-c73663bf.js"
import{c as u}from"./createTr-cf69bf95.js"
import{o as l}from"./outputFormat-c9eeffc5.js"
function p(t){t.preventDefault(),c(n)}function m(){const t=o(i)
return t<f-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let n=Math.floor((f-t)/6e4)
const s=Math.floor(n/60)
return n%=60,l(s," hours, ")+n+" mins"}(t)}function d(){const t=u()
return function(t){const n=t.insertCell(-1)
n.height=25,e("Last Reset:",n)}(t),function(t){const n=t.insertCell(-1)
n.align="right",r(m(),n)}(t),t}export default function(){!function(){const o=t('input[type="submit"]',n)
o&&s(o,p)}(),o("trackLadderReset")&&function(){const n=t("#pCC table"),s=d()
a(n,s)}()}
//# sourceMappingURL=ladder-1a10849f.js.map
