import{H as t,C as a,h as o,z as s,A as r,a3 as n,a4 as e}from"./calfSystem-a5da5210.js"
import"./formToUrl-6151060b.js"
import{i}from"./interceptSubmit-9e7a42eb.js"
import{o as c}from"./outputFormat-5b66d2aa.js"
import{c as f}from"./createTr-71df021c.js"
function u(){const a=t(n)
return a<e-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let a=Math.floor((e-t)/6e4)
const o=Math.floor(a/60)
return a%=60,c(o," hours, ")+a+" mins"}(a)}function l(){const t=f()
return function(t){const a=t.insertCell(-1)
a.height=25,s("Last Reset:",a)}(t),function(t){const a=t.insertCell(-1)
a.align="right",r(u(),a)}(t),t}function m(){i(),t("trackLadderReset")&&function(){const t=a("#pCC table"),s=l()
o(t,s)}()}export default m
//# sourceMappingURL=ladder-6da46e89.js.map
