import{H as t,C as o,h as s,z as r,A as e,a4 as n,a5 as a}from"./calfSystem-3bdf319e.js"
import"./formToUrl-6c242df5.js"
import{i}from"./interceptSubmit-5104e4a5.js"
import{o as c}from"./outputFormat-d53ee8dc.js"
import{c as f}from"./createTr-0b382056.js"
function u(){const o=t(n)
return o<a-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let o=Math.floor((a-t)/6e4)
const s=Math.floor(o/60)
return o%=60,c(s," hours, ")+o+" mins"}(o)}function l(){const t=f()
return function(t){const o=t.insertCell(-1)
o.height=25,r("Last Reset:",o)}(t),function(t){const o=t.insertCell(-1)
o.align="right",e(u(),o)}(t),t}function m(){i(),t("trackLadderReset")&&function(){const t=o("#pCC table"),r=l()
s(t,r)}()}export default m
//# sourceMappingURL=ladder-1ba4cb36.js.map
