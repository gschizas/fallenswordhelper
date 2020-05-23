import{S as t,p as s,o as n,g as a,b6 as e,aK as o,b7 as r,ad as i,I as c,b8 as l,ac as f,h as u,B as p,C as d,G as h,aO as m,_ as b}from"./calfSystem-01eb06ed.js"
import{d as g}from"./dontPost-05b11a96.js"
import{c as C}from"./createTr-da63342e.js"
function y(t){t.preventDefault(),g(s)}function L(t){return t.cells.length>1&&r(t.cells[1])===i()}function S(t){const s=c(r(t.cells[3]))
l(t.cells[3],`<span class="fshBlue fshXSmall">(${f(s-250)})</span>&nbsp;`)}function j(){const t=h("lastLadderReset")
return t<m-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let s=Math.floor((m-t)/6e4)
const n=Math.floor(s/60)
return s%=60,b(n," hours, ")+s+" mins"}(t)}function R(){const t=C()
return function(t){const s=t.insertCell(-1)
s.height=25,p("Last Reset:",s)}(t),function(t){const s=t.insertCell(-1)
s.align="right",d(j(),s)}(t),t}export default function(){!function(){const a=t('input[type="submit"]',s)
a&&n(a,y)}(),function(){const s=t("#pCC table"),n=R()
u(s,n)}(),function(){const t=a("td",s).filter(e("VL"))
if(1===t.length){const s=t[0].parentNode.parentNode.rows
o(s).filter(L).forEach(S)}}()}
//# sourceMappingURL=ladder-d3e51db1.js.map
