import{G as t,C as o,h as s,z as r,A as n,a3 as a,a4 as e}from"./calfSystem-d04e4be4.js"
import"./formToUrl-3c899008.js"
import{i}from"./interceptSubmit-24b16034.js"
import{o as c}from"./outputFormat-58bd3d71.js"
import{c as u}from"./createTr-23a10d3c.js"
function f(){const o=t(a)
return o<e-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let o=Math.floor((e-t)/6e4)
const s=Math.floor(o/60)
return o%=60,c(s," hours, ")+o+" mins"}(o)}function l(){const t=u()
return function(t){const o=t.insertCell(-1)
o.height=25,r("Last Reset:",o)}(t),function(t){const o=t.insertCell(-1)
o.align="right",n(f(),o)}(t),t}export default function(){i(),t("trackLadderReset")&&function(){const t=o("#pCC table"),r=l()
s(t,r)}()}
//# sourceMappingURL=ladder-6847bb6b.js.map
