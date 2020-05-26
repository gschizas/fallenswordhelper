import{L as t,p as s,o as e,D as n,f as o,y as a,z as r,ay as i}from"./calfSystem-740ec4d2.js"
import{d as c}from"./dontPost-e5e24e4d.js"
import{c as f}from"./createTr-23c406d8.js"
import{o as u}from"./outputFormat-5edaf4fe.js"
function l(t){t.preventDefault(),c(s)}function d(){const t=n("lastLadderReset")
return t<i-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let s=Math.floor((i-t)/6e4)
const e=Math.floor(s/60)
return s%=60,u(e," hours, ")+s+" mins"}(t)}function p(){const t=f()
return function(t){const s=t.insertCell(-1)
s.height=25,a("Last Reset:",s)}(t),function(t){const s=t.insertCell(-1)
s.align="right",r(d(),s)}(t),t}export default function(){!function(){const n=t('input[type="submit"]',s)
n&&e(n,l)}(),n("trackLadderReset")&&function(){const s=t("#pCC table"),e=p()
o(s,e)}()}
//# sourceMappingURL=ladder-acecd6f7.js.map
