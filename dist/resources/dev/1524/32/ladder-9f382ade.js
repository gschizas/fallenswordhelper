import{c as t}from"./createTr-3100ef5f.js"
import{H as o,C as s,h as a,z as r,A as n,a5 as e,a6 as i}from"./calfSystem-19a5d332.js"
import{i as f}from"./interceptSubmit-6d528c47.js"
import{o as c}from"./outputFormat-264fcef1.js"
import"./formToUrl-8a3e8d2a.js"
function u(){const t=o(e)
return t<i-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let o=Math.floor((i-t)/6e4)
const s=Math.floor(o/60)
return o%=60,`${c(s," hours, ")+o} mins`}(t)}function l(){const o=t()
return function(t){const o=t.insertCell(-1)
o.height=25,r("Last Reset:",o)}(o),function(t){const o=t.insertCell(-1)
o.align="right",n(u(),o)}(o),o}function m(){f(),o("trackLadderReset")&&function(){const t=s("#pCC table"),o=l()
a(t,o)}()}export default m
//# sourceMappingURL=ladder-9f382ade.js.map
