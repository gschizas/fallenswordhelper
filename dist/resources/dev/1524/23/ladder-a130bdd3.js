import{g as t,p as s,a4 as a,M as o,K as n,a5 as e,G as r,C as i,h as c,z as f,A as l,a6 as u,a7 as m}from"./calfSystem-9901ad27.js"
import{p}from"./playerName-a0f4217f.js"
import{a as d}from"./addCommas-8cd7d96d.js"
import{i as h}from"./intValue-0e84cdad.js"
import"./formToUrl-4cebc28a.js"
import{i as j}from"./interceptSubmit-ce974a7c.js"
import{o as g}from"./outputFormat-989c4647.js"
import{c as b}from"./createTr-6759a4ff.js"
function C(t){return t.cells.length>1&&n(t.cells[1])===p()}function y(t){const s=h(n(t.cells[3]))
e(t.cells[3],`<span class="fshBlue fshXSmall">(${d(s-250)})</span>&nbsp;`)}function L(){const t=r(u)
return t<m-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let s=Math.floor((m-t)/6e4)
const a=Math.floor(s/60)
return s%=60,g(a," hours, ")+s+" mins"}(t)}function S(){const t=b()
return function(t){const s=t.insertCell(-1)
s.height=25,f("Last Reset:",s)}(t),function(t){const s=t.insertCell(-1)
s.align="right",l(L(),s)}(t),t}export default function(){j(),r("trackLadderReset")&&function(){const t=i("#pCC table"),s=S()
c(t,s)}(),function(){const n=t("td",s).filter(a("VL"))
if(1===n.length){const t=n[0].parentNode.parentNode.rows
o(t).filter(C).forEach(y)}}()}
//# sourceMappingURL=ladder-a130bdd3.js.map
