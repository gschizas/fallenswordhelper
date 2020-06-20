import{g as t,p as s,a4 as a,M as o,K as n,a5 as e,G as r,C as c,h as i,z as f,A as l,a6 as u,a7 as m}from"./calfSystem-9c7241dc.js"
import{p}from"./playerName-ddecc25a.js"
import{a as d}from"./addCommas-22ea816a.js"
import{i as h}from"./intValue-4cb61c79.js"
import"./formToUrl-39ed921f.js"
import{i as b}from"./interceptSubmit-9fc997ac.js"
import{o as j}from"./outputFormat-3b7d02d2.js"
import{c as g}from"./createTr-cb258b3f.js"
function C(t){return t.cells.length>1&&n(t.cells[1])===p()}function y(t){const s=h(n(t.cells[3]))
e(t.cells[3],`<span class="fshBlue fshXSmall">(${d(s-250)})</span>&nbsp;`)}function L(){const t=r(u)
return t<m-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let s=Math.floor((m-t)/6e4)
const a=Math.floor(s/60)
return s%=60,j(a," hours, ")+s+" mins"}(t)}function S(){const t=g()
return function(t){const s=t.insertCell(-1)
s.height=25,f("Last Reset:",s)}(t),function(t){const s=t.insertCell(-1)
s.align="right",l(L(),s)}(t),t}export default function(){b(),r("trackLadderReset")&&function(){const t=c("#pCC table"),s=S()
i(t,s)}(),function(){const n=t("td",s).filter(a("VL"))
if(1===n.length){const t=n[0].parentNode.parentNode.rows
o(t).filter(C).forEach(y)}}()}
//# sourceMappingURL=ladder-dd6a3be5.js.map
