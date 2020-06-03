import{M as t,p as n,o as s,D as o,f as a,y as e,z as r,a1 as i,a2 as c}from"./calfSystem-8b6534a5.js"
import{d as f}from"./dontPost-10e2d3b5.js"
import{c as u}from"./createTr-fc2adc02.js"
import{o as l}from"./outputFormat-7e5c54f5.js"
function p(t){t.preventDefault(),f(n)}function d(){const t=o(i)
return t<c-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let n=Math.floor((c-t)/6e4)
const s=Math.floor(n/60)
return n%=60,l(s," hours, ")+n+" mins"}(t)}function m(){const t=u()
return function(t){const n=t.insertCell(-1)
n.height=25,e("Last Reset:",n)}(t),function(t){const n=t.insertCell(-1)
n.align="right",r(d(),n)}(t),t}export default function(){!function(){const o=t('input[type="submit"]',n)
o&&s(o,p)}(),o("trackLadderReset")&&function(){const n=t("#pCC table"),s=m()
a(n,s)}()}
//# sourceMappingURL=ladder-05a247cb.js.map
