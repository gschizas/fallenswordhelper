import{g as t,p as s,a4 as a,M as o,K as e,a5 as n,G as r,C as i,f as c,z as f,A as l,a6 as u,a7 as m}from"./calfSystem-a2862afc.js"
import{p}from"./playerName-72c7301a.js"
import{a as d}from"./addCommas-f02ec3aa.js"
import{i as h}from"./intValue-8b673ab3.js"
import"./formToUrl-3b57fbeb.js"
import{i as b}from"./interceptSubmit-e6a64c8e.js"
import{c as j}from"./createTr-885e990c.js"
import{o as g}from"./outputFormat-1e6a2988.js"
function C(t){return t.cells.length>1&&e(t.cells[1])===p()}function y(t){const s=h(e(t.cells[3]))
n(t.cells[3],`<span class="fshBlue fshXSmall">(${d(s-250)})</span>&nbsp;`)}function L(){const t=r(u)
return t<m-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let s=Math.floor((m-t)/6e4)
const a=Math.floor(s/60)
return s%=60,g(a," hours, ")+s+" mins"}(t)}function S(){const t=j()
return function(t){const s=t.insertCell(-1)
s.height=25,f("Last Reset:",s)}(t),function(t){const s=t.insertCell(-1)
s.align="right",l(L(),s)}(t),t}export default function(){b(),r("trackLadderReset")&&function(){const t=i("#pCC table"),s=S()
c(t,s)}(),function(){const e=t("td",s).filter(a("VL"))
if(1===e.length){const t=e[0].parentNode.parentNode.rows
o(t).filter(C).forEach(y)}}()}
//# sourceMappingURL=ladder-bdf1e665.js.map
