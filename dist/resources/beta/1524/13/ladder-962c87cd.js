import{R as t,p as n,o as s,h as e,B as o,C as a,G as r,aL as i,Z as c}from"./calfSystem-1e164202.js"
import{d as u}from"./dontPost-d7997a25.js"
import{c as f}from"./createTr-ac156ee9.js"
function l(t){t.preventDefault(),u(n)}function p(){const t=r("lastLadderReset")
return t<i-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let n=Math.floor((i-t)/6e4)
const s=Math.floor(n/60)
return n%=60,c(s," hours, ")+n+" mins"}(t)}function d(){const t=f()
return function(t){const n=t.insertCell(-1)
n.height=25,o("Last Reset:",n)}(t),function(t){const n=t.insertCell(-1)
n.align="right",a(p(),n)}(t),t}export default function(){!function(){const e=t('input[type="submit"]',n)
e&&s(e,l)}(),function(){const n=t("#pCC table"),s=d()
e(n,s)}()}
//# sourceMappingURL=ladder-962c87cd.js.map
