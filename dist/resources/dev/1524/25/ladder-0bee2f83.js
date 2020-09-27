import{g as t,p as s,a4 as a,M as o,G as n,a5 as e,H as r,C as i,h as c,z as f,A as l,a6 as u,a7 as m}from"./calfSystem-69dd5601.js"
import{p}from"./playerName-688c2cbc.js"
import{a as d}from"./addCommas-bdfe3cd5.js"
import{i as h}from"./intValue-65d3c36c.js"
import"./formToUrl-543a6364.js"
import{i as j}from"./interceptSubmit-9f6267e0.js"
import{o as b}from"./outputFormat-c14ae873.js"
import{c as g}from"./createTr-54ff93cf.js"
function C(t){return t.cells.length>1&&n(t.cells[1])===p()}function y(t){const s=h(n(t.cells[3]))
e(t.cells[3],`<span class="fshBlue fshXSmall">(${d(s-250)})</span>&nbsp;`)}function L(){const t=r(u)
return t<m-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let s=Math.floor((m-t)/6e4)
const a=Math.floor(s/60)
return s%=60,b(a," hours, ")+s+" mins"}(t)}function S(){const t=g()
return function(t){const s=t.insertCell(-1)
s.height=25,f("Last Reset:",s)}(t),function(t){const s=t.insertCell(-1)
s.align="right",l(L(),s)}(t),t}function M(){j(),r("trackLadderReset")&&function(){const t=i("#pCC table"),s=S()
c(t,s)}(),function(){const n=t("td",s).filter(a("VL"))
if(1===n.length){const t=n[0].parentNode.parentNode.rows
o(t).filter(C).forEach(y)}}()}export default M
//# sourceMappingURL=ladder-0bee2f83.js.map
