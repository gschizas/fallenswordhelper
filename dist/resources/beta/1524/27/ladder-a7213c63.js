import{H as t,C as o,h as s,z as r,A as n,a4 as a,a5 as e}from"./calfSystem-70c7a660.js"
import"./formToUrl-05384153.js"
import{i}from"./interceptSubmit-96d20d60.js"
import{o as c}from"./outputFormat-d53ee8dc.js"
import{c as u}from"./createTr-d6775b18.js"
function f(){const o=t(a)
return o<e-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let o=Math.floor((e-t)/6e4)
const s=Math.floor(o/60)
return o%=60,c(s," hours, ")+o+" mins"}(o)}function l(){const t=u()
return function(t){const o=t.insertCell(-1)
o.height=25,r("Last Reset:",o)}(t),function(t){const o=t.insertCell(-1)
o.align="right",n(f(),o)}(t),t}function m(){i(),t("trackLadderReset")&&function(){const t=o("#pCC table"),r=l()
s(t,r)}()}export default m
//# sourceMappingURL=ladder-a7213c63.js.map
