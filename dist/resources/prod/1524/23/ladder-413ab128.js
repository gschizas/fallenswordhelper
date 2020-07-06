import{G as t,C as o,h as s,z as r,A as n,a3 as a,a4 as e}from"./calfSystem-019de1cf.js"
import"./formToUrl-91be1404.js"
import{i}from"./interceptSubmit-7b40d68d.js"
import{o as c}from"./outputFormat-989c4647.js"
import{c as f}from"./createTr-d52305c2.js"
function u(){const o=t(a)
return o<e-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let o=Math.floor((e-t)/6e4)
const s=Math.floor(o/60)
return o%=60,c(s," hours, ")+o+" mins"}(o)}function l(){const t=f()
return function(t){const o=t.insertCell(-1)
o.height=25,r("Last Reset:",o)}(t),function(t){const o=t.insertCell(-1)
o.align="right",n(u(),o)}(t),t}export default function(){i(),t("trackLadderReset")&&function(){const t=o("#pCC table"),r=l()
s(t,r)}()}
//# sourceMappingURL=ladder-413ab128.js.map
