import{R as t,p as n,o as s,h as a,B as o,C as e,G as r,aL as i,Z as f}from"./calfSystem-99da704d.js"
import{d as u}from"./dontPost-af5ba7a2.js"
import{c}from"./createTr-09d720fe.js"
function l(t){t.preventDefault(),u(n)}function d(){const t=r("lastLadderReset")
return t<i-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let n=Math.floor((i-t)/6e4)
const s=Math.floor(n/60)
return n%=60,`${f(s," hours, ")+n} mins`}(t)}function p(){const t=c()
return function(t){const n=t.insertCell(-1)
n.height=25,o("Last Reset:",n)}(t),function(t){const n=t.insertCell(-1)
n.align="right",e(d(),n)}(t),t}export default function(){!function(){const a=t('input[type="submit"]',n)
a&&s(a,l)}(),function(){const n=t("#pCC table"),s=p()
a(n,s)}()}
//# sourceMappingURL=ladder-94d84ef4.js.map
