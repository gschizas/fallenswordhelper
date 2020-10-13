import{g as t,p as s,a4 as a,M as o,G as n,a5 as r,H as e,C as i,h as c,z as f,A as l,a6 as u,a7 as m}from"./calfSystem-b136673a.js"
import{p}from"./playerName-f933c87f.js"
import{a as d}from"./addCommas-8259c1a9.js"
import{i as h}from"./intValue-f4d85578.js"
import"./formToUrl-1d96bdd4.js"
import{i as b}from"./interceptSubmit-957549ab.js"
import{o as j}from"./outputFormat-5b66d2aa.js"
import{c as g}from"./createTr-9dcea384.js"
function C(t){return t.cells.length>1&&n(t.cells[1])===p()}function y(t){const s=h(n(t.cells[3]))
r(t.cells[3],`<span class="fshBlue fshXSmall">(${d(s-250)})</span>&nbsp;`)}function L(){const t=e(u)
return t<m-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let s=Math.floor((m-t)/6e4)
const a=Math.floor(s/60)
return s%=60,j(a," hours, ")+s+" mins"}(t)}function S(){const t=g()
return function(t){const s=t.insertCell(-1)
s.height=25,f("Last Reset:",s)}(t),function(t){const s=t.insertCell(-1)
s.align="right",l(L(),s)}(t),t}function M(){b(),e("trackLadderReset")&&function(){const t=i("#pCC table"),s=S()
c(t,s)}(),function(){const n=t("td",s).filter(a("VL"))
if(1===n.length){const t=n[0].parentNode.parentNode.rows
o(t).filter(C).forEach(y)}}()}export default M
//# sourceMappingURL=ladder-c47a5183.js.map
