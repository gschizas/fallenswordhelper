import{R as t,p as n,o as s,h as o,B as a,C as e,G as r,aL as i,Z as c}from"./calfSystem-cb871cc0.js"
import{d as f}from"./dontPost-bd45f448.js"
import{c as u}from"./createTr-5675cff3.js"
function l(t){t.preventDefault(),f(n)}function p(){const t=r("lastLadderReset")
return t<i-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let n=Math.floor((i-t)/6e4)
const s=Math.floor(n/60)
return n%=60,`${c(s," hours, ")+n} mins`}(t)}function d(){const t=u()
return function(t){const n=t.insertCell(-1)
n.height=25,a("Last Reset:",n)}(t),function(t){const n=t.insertCell(-1)
n.align="right",e(p(),n)}(t),t}export default function(){!function(){const o=t('input[type="submit"]',n)
o&&s(o,l)}(),function(){const n=t("#pCC table"),s=d()
o(n,s)}()}
//# sourceMappingURL=ladder-043de5c2.js.map
