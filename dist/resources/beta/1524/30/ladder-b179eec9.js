import{H as t,C as o,h as s,z as r,A as n,a3 as e,a4 as a}from"./calfSystem-ebf4b17d.js"
import"./formToUrl-c9020722.js"
import{i}from"./interceptSubmit-3d708b68.js"
import{o as c}from"./outputFormat-08e5d29d.js"
import{c as f}from"./createTr-575e3041.js"
function u(){const o=t(e)
return o<a-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let o=Math.floor((a-t)/6e4)
const s=Math.floor(o/60)
return o%=60,c(s," hours, ")+o+" mins"}(o)}function l(){const t=f()
return function(t){const o=t.insertCell(-1)
o.height=25,r("Last Reset:",o)}(t),function(t){const o=t.insertCell(-1)
o.align="right",n(u(),o)}(t),t}function m(){i(),t("trackLadderReset")&&function(){const t=o("#pCC table"),r=l()
s(t,r)}()}export default m
//# sourceMappingURL=ladder-b179eec9.js.map
