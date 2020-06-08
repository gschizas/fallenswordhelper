import{G as t,C as o,f as s,z as a,A as r,a3 as n,a4 as e}from"./calfSystem-03970067.js"
import"./formToUrl-906ab550.js"
import{i}from"./interceptSubmit-e3519b7d.js"
import{c}from"./createTr-e152fcaa.js"
import{o as f}from"./outputFormat-66c8c140.js"
function u(){const o=t(n)
return o<e-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let o=Math.floor((e-t)/6e4)
const s=Math.floor(o/60)
return o%=60,f(s," hours, ")+o+" mins"}(o)}function l(){const t=c()
return function(t){const o=t.insertCell(-1)
o.height=25,a("Last Reset:",o)}(t),function(t){const o=t.insertCell(-1)
o.align="right",r(u(),o)}(t),t}export default function(){i(),t("trackLadderReset")&&function(){const t=o("#pCC table"),a=l()
s(t,a)}()}
//# sourceMappingURL=ladder-cdec3144.js.map
