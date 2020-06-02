import{M as t,p as n,o as s,D as o,f as a,y as e,z as r,a1 as i,a2 as f}from"./calfSystem-be09bdff.js"
import{d as u}from"./dontPost-c1d489a0.js"
import{c}from"./createTr-12f917d5.js"
import{o as l}from"./outputFormat-2f9f2a37.js"
function p(t){t.preventDefault(),u(n)}function d(){const t=o(i)
return t<f-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let n=Math.floor((f-t)/6e4)
const s=Math.floor(n/60)
return n%=60,l(s," hours, ")+n+" mins"}(t)}function m(){const t=c()
return function(t){const n=t.insertCell(-1)
n.height=25,e("Last Reset:",n)}(t),function(t){const n=t.insertCell(-1)
n.align="right",r(d(),n)}(t),t}export default function(){!function(){const o=t('input[type="submit"]',n)
o&&s(o,p)}(),o("trackLadderReset")&&function(){const n=t("#pCC table"),s=m()
a(n,s)}()}
//# sourceMappingURL=ladder-fd23c1a0.js.map
