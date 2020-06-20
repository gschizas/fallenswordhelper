import{G as t,C as o,h as s,z as e,A as r,a3 as a,a4 as n}from"./calfSystem-89b939c8.js"
import"./formToUrl-ae369bee.js"
import{i}from"./interceptSubmit-57a8cf95.js"
import{o as f}from"./outputFormat-d814f2ee.js"
import{c}from"./createTr-b71fd75f.js"
function u(){const o=t(a)
return o<n-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let o=Math.floor((n-t)/6e4)
const s=Math.floor(o/60)
return o%=60,f(s," hours, ")+o+" mins"}(o)}function l(){const t=c()
return function(t){const o=t.insertCell(-1)
o.height=25,e("Last Reset:",o)}(t),function(t){const o=t.insertCell(-1)
o.align="right",r(u(),o)}(t),t}export default function(){i(),t("trackLadderReset")&&function(){const t=o("#pCC table"),e=l()
s(t,e)}()}
//# sourceMappingURL=ladder-801a84fc.js.map
