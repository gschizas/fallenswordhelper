import{H as t,C as o,h as s,z as e,A as r,a3 as n,a4 as a}from"./calfSystem-57628ebe.js"
import"./formToUrl-ed8f6bd0.js"
import{i}from"./interceptSubmit-42e92144.js"
import{o as c}from"./outputFormat-f5e04ec1.js"
import{c as f}from"./createTr-6cccf4a0.js"
function u(){const o=t(n)
return o<a-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let o=Math.floor((a-t)/6e4)
const s=Math.floor(o/60)
return o%=60,c(s," hours, ")+o+" mins"}(o)}function l(){const t=f()
return function(t){const o=t.insertCell(-1)
o.height=25,e("Last Reset:",o)}(t),function(t){const o=t.insertCell(-1)
o.align="right",r(u(),o)}(t),t}function m(){i(),t("trackLadderReset")&&function(){const t=o("#pCC table"),e=l()
s(t,e)}()}export default m
//# sourceMappingURL=ladder-6c69aac7.js.map
