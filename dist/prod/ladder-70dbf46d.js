import{R as t,p as n,o as s,h as a,B as o,C as e,G as r,aL as i,Z as c}from"./calfSystem-d06402b1.js"
import{d as u}from"./dontPost-a6e48caa.js"
import{c as f}from"./createTr-403bb610.js"
function l(t){t.preventDefault(),u(n)}function p(){const t=r("lastLadderReset")
return t<i-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let n=Math.floor((i-t)/6e4)
const s=Math.floor(n/60)
return n%=60,`${c(s," hours, ")+n} mins`}(t)}function d(){const t=f()
return function(t){const n=t.insertCell(-1)
n.height=25,o("Last Reset:",n)}(t),function(t){const n=t.insertCell(-1)
n.align="right",e(p(),n)}(t),t}export default function(){!function(){const a=t('input[type="submit"]',n)
a&&s(a,l)}(),function(){const n=t("#pCC table"),s=d()
a(n,s)}()}
//# sourceMappingURL=ladder-70dbf46d.js.map
