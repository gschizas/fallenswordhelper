import{G as t,C as a,h as o,z as s,A as r,a3 as n,a4 as e}from"./calfSystem-1b876afa.js"
import"./formToUrl-cdc17fa4.js"
import{i}from"./interceptSubmit-8946388b.js"
import{o as c}from"./outputFormat-e587da15.js"
import{c as f}from"./createTr-0a85640b.js"
function u(){const a=t(n)
return a<e-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let a=Math.floor((e-t)/6e4)
const o=Math.floor(a/60)
return a%=60,c(o," hours, ")+a+" mins"}(a)}function l(){const t=f()
return function(t){const a=t.insertCell(-1)
a.height=25,s("Last Reset:",a)}(t),function(t){const a=t.insertCell(-1)
a.align="right",r(u(),a)}(t),t}export default function(){i(),t("trackLadderReset")&&function(){const t=a("#pCC table"),s=l()
o(t,s)}()}
//# sourceMappingURL=ladder-8d59ad7c.js.map
