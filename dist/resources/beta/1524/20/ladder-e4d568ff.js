import{G as t,C as o,f as s,z as a,A as r,a3 as n,a4 as e}from"./calfSystem-05554bae.js"
import"./formToUrl-21fa7da6.js"
import{i}from"./interceptSubmit-399cf9b1.js"
import{c as f}from"./createTr-343ee7fd.js"
import{o as c}from"./outputFormat-6586a9b0.js"
function u(){const o=t(n)
return o<e-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let o=Math.floor((e-t)/6e4)
const s=Math.floor(o/60)
return o%=60,c(s," hours, ")+o+" mins"}(o)}function l(){const t=f()
return function(t){const o=t.insertCell(-1)
o.height=25,a("Last Reset:",o)}(t),function(t){const o=t.insertCell(-1)
o.align="right",r(u(),o)}(t),t}export default function(){i(),t("trackLadderReset")&&function(){const t=o("#pCC table"),a=l()
s(t,a)}()}
//# sourceMappingURL=ladder-e4d568ff.js.map
