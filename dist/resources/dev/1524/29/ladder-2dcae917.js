import{g as t,p as s,a4 as a,M as o,G as e,a5 as n,H as r,C as i,h as c,z as f,A as l,a6 as u,a7 as m}from"./calfSystem-02c48ff5.js"
import{p}from"./playerName-5ca71009.js"
import{a as d}from"./addCommas-0aacc5f1.js"
import{i as h}from"./intValue-f94761c7.js"
import"./formToUrl-b49ee3b5.js"
import{i as j}from"./interceptSubmit-43d7e549.js"
import{o as b}from"./outputFormat-f5e04ec1.js"
import{c as g}from"./createTr-50ae3636.js"
function C(t){return t.cells.length>1&&e(t.cells[1])===p()}function y(t){const s=h(e(t.cells[3]))
n(t.cells[3],`<span class="fshBlue fshXSmall">(${d(s-250)})</span>&nbsp;`)}function L(){const t=r(u)
return t<m-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let s=Math.floor((m-t)/6e4)
const a=Math.floor(s/60)
return s%=60,b(a," hours, ")+s+" mins"}(t)}function S(){const t=g()
return function(t){const s=t.insertCell(-1)
s.height=25,f("Last Reset:",s)}(t),function(t){const s=t.insertCell(-1)
s.align="right",l(L(),s)}(t),t}function M(){j(),r("trackLadderReset")&&function(){const t=i("#pCC table"),s=S()
c(t,s)}(),function(){const e=t("td",s).filter(a("VL"))
if(1===e.length){const t=e[0].parentNode.parentNode.rows
o(t).filter(C).forEach(y)}}()}export default M
//# sourceMappingURL=ladder-2dcae917.js.map
