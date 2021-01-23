import{c as t}from"./createTr-3445c81f.js"
import{H as o,C as s,h as a,z as r,A as n,a4 as e,a5 as i}from"./calfSystem-393ab895.js"
import{i as c}from"./interceptSubmit-193429ea.js"
import{o as f}from"./outputFormat-bb38e6d1.js"
import"./formToUrl-7683ac99.js"
function u(){const t=o(e)
return t<i-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let o=Math.floor((i-t)/6e4)
const s=Math.floor(o/60)
return o%=60,`${f(s," hours, ")+o} mins`}(t)}function l(){const o=t()
return function(t){const o=t.insertCell(-1)
o.height=25,r("Last Reset:",o)}(o),function(t){const o=t.insertCell(-1)
o.align="right",n(u(),o)}(o),o}function m(){c(),o("trackLadderReset")&&function(){const t=s("#pCC table"),o=l()
a(t,o)}()}export default m
//# sourceMappingURL=ladder-2c9aaec9.js.map
