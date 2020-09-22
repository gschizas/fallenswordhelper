import{H as t,C as o,h as s,z as r,A as a,a3 as n,a4 as e}from"./calfSystem-019a589c.js"
import"./formToUrl-c83543e1.js"
import{i}from"./interceptSubmit-ae6fd26f.js"
import{o as c}from"./outputFormat-e549127b.js"
import{c as f}from"./createTr-cf48b53d.js"
function u(){const o=t(n)
return o<e-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let o=Math.floor((e-t)/6e4)
const s=Math.floor(o/60)
return o%=60,c(s," hours, ")+o+" mins"}(o)}function l(){const t=f()
return function(t){const o=t.insertCell(-1)
o.height=25,r("Last Reset:",o)}(t),function(t){const o=t.insertCell(-1)
o.align="right",a(u(),o)}(t),t}function m(){i(),t("trackLadderReset")&&function(){const t=o("#pCC table"),r=l()
s(t,r)}()}export default m
//# sourceMappingURL=ladder-f0a3c43b.js.map
