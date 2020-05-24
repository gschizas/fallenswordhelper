import{R as t,p as s,o as n,g as a,b5 as e,aJ as o,b6 as r,ac as i,H as c,b7 as l,ab as f,f as u,A as p,B as d,F as h,aN as m,Z as b}from"./calfSystem-d96a3efd.js"
import{d as g}from"./dontPost-a74ab672.js"
import{c as y}from"./createTr-441d9d7e.js"
function C(t){t.preventDefault(),g(s)}function L(t){return t.cells.length>1&&r(t.cells[1])===i()}function R(t){const s=c(r(t.cells[3]))
l(t.cells[3],`<span class="fshBlue fshXSmall">(${f(s-250)})</span>&nbsp;`)}function j(){const t=h("lastLadderReset")
return t<m-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let s=Math.floor((m-t)/6e4)
const n=Math.floor(s/60)
return s%=60,b(n," hours, ")+s+" mins"}(t)}function N(){const t=y()
return function(t){const s=t.insertCell(-1)
s.height=25,p("Last Reset:",s)}(t),function(t){const s=t.insertCell(-1)
s.align="right",d(j(),s)}(t),t}export default function(){!function(){const a=t('input[type="submit"]',s)
a&&n(a,C)}(),function(){const s=t("#pCC table"),n=N()
u(s,n)}(),function(){const t=a("td",s).filter(e("VL"))
if(1===t.length){const s=t[0].parentNode.parentNode.rows
o(s).filter(L).forEach(R)}}()}
//# sourceMappingURL=ladder-8585ea02.js.map
