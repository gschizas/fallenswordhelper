import{c as t}from"./createTr-009fb5b7.js"
import{H as o,C as s,h as r,z as e,A as n,a3 as a,a4 as i}from"./calfSystem-47fc08ae.js"
import{i as f}from"./interceptSubmit-3f0967f1.js"
import{o as c}from"./outputFormat-bb38e6d1.js"
import"./formToUrl-e4e5b8f2.js"
function u(){const t=o(a)
return t<i-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let o=Math.floor((i-t)/6e4)
const s=Math.floor(o/60)
return o%=60,`${c(s," hours, ")+o} mins`}(t)}function l(){const o=t()
return function(t){const o=t.insertCell(-1)
o.height=25,e("Last Reset:",o)}(o),function(t){const o=t.insertCell(-1)
o.align="right",n(u(),o)}(o),o}function m(){f(),o("trackLadderReset")&&function(){const t=s("#pCC table"),o=l()
r(t,o)}()}export default m
//# sourceMappingURL=ladder-c093f1bc.js.map
