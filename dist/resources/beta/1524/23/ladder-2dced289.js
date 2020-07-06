import{G as t,C as o,h as s,z as r,A as a,a3 as n,a4 as e}from"./calfSystem-34fcd691.js"
import"./formToUrl-41bbf6ea.js"
import{i}from"./interceptSubmit-492af249.js"
import{o as f}from"./outputFormat-989c4647.js"
import{c}from"./createTr-51fbb67e.js"
function u(){const o=t(n)
return o<e-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let o=Math.floor((e-t)/6e4)
const s=Math.floor(o/60)
return o%=60,f(s," hours, ")+o+" mins"}(o)}function l(){const t=c()
return function(t){const o=t.insertCell(-1)
o.height=25,r("Last Reset:",o)}(t),function(t){const o=t.insertCell(-1)
o.align="right",a(u(),o)}(t),t}export default function(){i(),t("trackLadderReset")&&function(){const t=o("#pCC table"),r=l()
s(t,r)}()}
//# sourceMappingURL=ladder-2dced289.js.map
