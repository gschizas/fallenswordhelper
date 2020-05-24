import{Q as t,p as n,o as s,f as e,A as o,B as a,F as r,aK as i,Y as c}from"./calfSystem-d587d232.js"
import{d as u}from"./dontPost-bc1edacc.js"
import{c as f}from"./createTr-ebe71d20.js"
function l(t){t.preventDefault(),u(n)}function d(){const t=r("lastLadderReset")
return t<i-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let n=Math.floor((i-t)/6e4)
const s=Math.floor(n/60)
return n%=60,c(s," hours, ")+n+" mins"}(t)}function p(){const t=f()
return function(t){const n=t.insertCell(-1)
n.height=25,o("Last Reset:",n)}(t),function(t){const n=t.insertCell(-1)
n.align="right",a(d(),n)}(t),t}export default function(){!function(){const e=t('input[type="submit"]',n)
e&&s(e,l)}(),function(){const n=t("#pCC table"),s=p()
e(n,s)}()}
//# sourceMappingURL=ladder-8cb81b45.js.map
