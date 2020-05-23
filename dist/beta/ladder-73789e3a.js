import{R as t,p as n,o as s,h as o,B as a,C as e,G as r,aL as i,Z as f}from"./calfSystem-fb94ddf0.js"
import{d as u}from"./dontPost-9febdb8a.js"
import{c}from"./createTr-38f15f93.js"
function l(t){t.preventDefault(),u(n)}function d(){const t=r("lastLadderReset")
return t<i-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let n=Math.floor((i-t)/6e4)
const s=Math.floor(n/60)
return n%=60,`${f(s," hours, ")+n} mins`}(t)}function p(){const t=c()
return function(t){const n=t.insertCell(-1)
n.height=25,a("Last Reset:",n)}(t),function(t){const n=t.insertCell(-1)
n.align="right",e(d(),n)}(t),t}export default function(){!function(){const o=t('input[type="submit"]',n)
o&&s(o,l)}(),function(){const n=t("#pCC table"),s=p()
o(n,s)}()}
//# sourceMappingURL=ladder-73789e3a.js.map
