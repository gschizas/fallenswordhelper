import{g as t,p as s,a5 as a,M as e,G as o,a6 as n,H as r,C as i,h as c,z as f,A as l,a7 as u,a8 as m}from"./calfSystem-ec5e5725.js"
import{p}from"./playerName-6b140f29.js"
import{a as d}from"./addCommas-e12eda5f.js"
import{i as h}from"./intValue-ef353ded.js"
import"./formToUrl-9589262c.js"
import{i as b}from"./interceptSubmit-540c8b15.js"
import{o as j}from"./outputFormat-d53ee8dc.js"
import{c as g}from"./createTr-5280b7b3.js"
function C(t){return t.cells.length>1&&o(t.cells[1])===p()}function y(t){const s=h(o(t.cells[3]))
n(t.cells[3],`<span class="fshBlue fshXSmall">(${d(s-250)})</span>&nbsp;`)}function L(){const t=r(u)
return t<m-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let s=Math.floor((m-t)/6e4)
const a=Math.floor(s/60)
return s%=60,j(a," hours, ")+s+" mins"}(t)}function S(){const t=g()
return function(t){const s=t.insertCell(-1)
s.height=25,f("Last Reset:",s)}(t),function(t){const s=t.insertCell(-1)
s.align="right",l(L(),s)}(t),t}function M(){b(),r("trackLadderReset")&&function(){const t=i("#pCC table"),s=S()
c(t,s)}(),function(){const o=t("td",s).filter(a("VL"))
if(1===o.length){const t=o[0].parentNode.parentNode.rows
e(t).filter(C).forEach(y)}}()}export default M
//# sourceMappingURL=ladder-3df3312e.js.map
