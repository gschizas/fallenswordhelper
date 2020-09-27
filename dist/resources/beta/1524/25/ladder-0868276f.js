import{H as t,C as a,h as o,z as s,A as r,a3 as n,a4 as e}from"./calfSystem-d3aab5a8.js"
import"./formToUrl-19959c48.js"
import{i}from"./interceptSubmit-07270cc9.js"
import{o as c}from"./outputFormat-c14ae873.js"
import{c as u}from"./createTr-b9760e1a.js"
function f(){const a=t(n)
return a<e-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let a=Math.floor((e-t)/6e4)
const o=Math.floor(a/60)
return a%=60,c(o," hours, ")+a+" mins"}(a)}function l(){const t=u()
return function(t){const a=t.insertCell(-1)
a.height=25,s("Last Reset:",a)}(t),function(t){const a=t.insertCell(-1)
a.align="right",r(f(),a)}(t),t}function m(){i(),t("trackLadderReset")&&function(){const t=a("#pCC table"),s=l()
o(t,s)}()}export default m
//# sourceMappingURL=ladder-0868276f.js.map
