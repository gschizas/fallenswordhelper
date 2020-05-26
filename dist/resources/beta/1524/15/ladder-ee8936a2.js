import{L as t,p as s,o as n,D as o,f as a,y as e,z as r,ay as i}from"./calfSystem-1262535f.js"
import{d as f}from"./dontPost-780742ab.js"
import{c as u}from"./createTr-0093f7ce.js"
import{o as c}from"./outputFormat-90307283.js"
function l(t){t.preventDefault(),f(s)}function p(){const t=o("lastLadderReset")
return t<i-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let s=Math.floor((i-t)/6e4)
const n=Math.floor(s/60)
return s%=60,c(n," hours, ")+s+" mins"}(t)}function d(){const t=u()
return function(t){const s=t.insertCell(-1)
s.height=25,e("Last Reset:",s)}(t),function(t){const s=t.insertCell(-1)
s.align="right",r(p(),s)}(t),t}export default function(){!function(){const o=t('input[type="submit"]',s)
o&&n(o,l)}(),o("trackLadderReset")&&function(){const s=t("#pCC table"),n=d()
a(s,n)}()}
//# sourceMappingURL=ladder-ee8936a2.js.map
