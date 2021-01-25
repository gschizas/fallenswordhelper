import{c as t}from"./createTr-03681447.js"
import{H as o,C as s,h as r,z as a,A as n,a4 as e,a5 as i}from"./calfSystem-45544049.js"
import{i as c}from"./interceptSubmit-bea77d0e.js"
import{o as f}from"./outputFormat-264fcef1.js"
import"./formToUrl-61791a0c.js"
function u(){const t=o(e)
return t<i-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let o=Math.floor((i-t)/6e4)
const s=Math.floor(o/60)
return o%=60,`${f(s," hours, ")+o} mins`}(t)}function l(){const o=t()
return function(t){const o=t.insertCell(-1)
o.height=25,a("Last Reset:",o)}(o),function(t){const o=t.insertCell(-1)
o.align="right",n(u(),o)}(o),o}function m(){c(),o("trackLadderReset")&&function(){const t=s("#pCC table"),o=l()
r(t,o)}()}export default m
//# sourceMappingURL=ladder-310f94e9.js.map
