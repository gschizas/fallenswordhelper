import{N as t,p as s,o as a,g as n,a2 as o,a3 as e,a4 as r,a5 as i,D as c,f,y as l,z as u,a6 as p,a7 as m}from"./calfSystem-1c103624.js"
import{d}from"./dontPost-f9ce543e.js"
import{p as h}from"./playerName-191d9509.js"
import{a as b}from"./addCommas-708246cb.js"
import{i as g}from"./intValue-f5e62e5b.js"
import{c as j}from"./createTr-c78e849f.js"
import{o as y}from"./outputFormat-801b1f90.js"
function C(t){t.preventDefault(),d(s)}function L(t){return t.cells.length>1&&r(t.cells[1])===h()}function N(t){const s=g(r(t.cells[3]))
i(t.cells[3],`<span class="fshBlue fshXSmall">(${b(s-250)})</span>&nbsp;`)}function R(){const t=c(p)
return t<m-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let s=Math.floor((m-t)/6e4)
const a=Math.floor(s/60)
return s%=60,y(a," hours, ")+s+" mins"}(t)}function S(){const t=j()
return function(t){const s=t.insertCell(-1)
s.height=25,l("Last Reset:",s)}(t),function(t){const s=t.insertCell(-1)
s.align="right",u(R(),s)}(t),t}export default function(){!function(){const n=t('input[type="submit"]',s)
n&&a(n,C)}(),c("trackLadderReset")&&function(){const s=t("#pCC table"),a=S()
f(s,a)}(),function(){const t=n("td",s).filter(o("VL"))
if(1===t.length){const s=t[0].parentNode.parentNode.rows
e(s).filter(L).forEach(N)}}()}
//# sourceMappingURL=ladder-11139451.js.map
