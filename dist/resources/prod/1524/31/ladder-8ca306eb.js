import{c as t}from"./createTr-b64078b6.js"
import{H as o,C as s,h as r,z as e,A as n,a3 as a,a4 as i}from"./calfSystem-7aee5245.js"
import{i as c}from"./interceptSubmit-e2017f31.js"
import{o as f}from"./outputFormat-bb38e6d1.js"
import"./formToUrl-c1b61cd0.js"
function u(){const t=o(a)
return t<i-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let o=Math.floor((i-t)/6e4)
const s=Math.floor(o/60)
return o%=60,`${f(s," hours, ")+o} mins`}(t)}function l(){const o=t()
return function(t){const o=t.insertCell(-1)
o.height=25,e("Last Reset:",o)}(o),function(t){const o=t.insertCell(-1)
o.align="right",n(u(),o)}(o),o}function m(){c(),o("trackLadderReset")&&function(){const t=s("#pCC table"),o=l()
r(t,o)}()}export default m
//# sourceMappingURL=ladder-8ca306eb.js.map
