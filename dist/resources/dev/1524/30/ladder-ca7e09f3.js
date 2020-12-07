import{g as t,p as s,a4 as a,M as o,G as e,a5 as n,H as r,C as i,h as f,z as c,A as l,a6 as u,a7 as m}from"./calfSystem-54df10e3.js"
import{p}from"./playerName-8f1e4e48.js"
import{a as d}from"./addCommas-508f0c08.js"
import{i as h}from"./intValue-e8157483.js"
import"./formToUrl-54567b6c.js"
import{i as b}from"./interceptSubmit-d6a9b28d.js"
import{o as j}from"./outputFormat-08e5d29d.js"
import{c as g}from"./createTr-b23f9a12.js"
function C(t){return t.cells.length>1&&e(t.cells[1])===p()}function y(t){const s=h(e(t.cells[3]))
n(t.cells[3],`<span class="fshBlue fshXSmall">(${d(s-250)})</span>&nbsp;`)}function L(){const t=r(u)
return t<m-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let s=Math.floor((m-t)/6e4)
const a=Math.floor(s/60)
return s%=60,j(a," hours, ")+s+" mins"}(t)}function S(){const t=g()
return function(t){const s=t.insertCell(-1)
s.height=25,c("Last Reset:",s)}(t),function(t){const s=t.insertCell(-1)
s.align="right",l(L(),s)}(t),t}function M(){b(),r("trackLadderReset")&&function(){const t=i("#pCC table"),s=S()
f(t,s)}(),function(){const e=t("td",s).filter(a("VL"))
if(1===e.length){const t=e[0].parentNode.parentNode.rows
o(t).filter(C).forEach(y)}}()}export default M
//# sourceMappingURL=ladder-ca7e09f3.js.map
