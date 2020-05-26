import{M as t,p as s,o as a,g as n,aP as o,ay as e,aQ as r,aR as i,D as c,f,y as l,z as u,aB as p}from"./calfSystem-ee582533.js"
import{d as m}from"./dontPost-2a1b6847.js"
import{p as d}from"./playerName-e40f24e0.js"
import{a as h}from"./addCommas-f872a1dc.js"
import{i as b}from"./intValue-a842cf8a.js"
import{c as g}from"./createTr-bfcbc414.js"
import{o as j}from"./outputFormat-bfd5cd83.js"
function y(t){t.preventDefault(),m(s)}function C(t){return t.cells.length>1&&r(t.cells[1])===d()}function L(t){const s=b(r(t.cells[3]))
i(t.cells[3],`<span class="fshBlue fshXSmall">(${h(s-250)})</span>&nbsp;`)}function R(){const t=c("lastLadderReset")
return t<p-1728e5?'<span class="fshLink tip-static" data-tipped="FSH has not seen the last ladder reset.<br>You can find it in your log if you qualified<br>or Tavern Rumours.">???</span>':function(t){let s=Math.floor((p-t)/6e4)
const a=Math.floor(s/60)
return s%=60,j(a," hours, ")+s+" mins"}(t)}function M(){const t=g()
return function(t){const s=t.insertCell(-1)
s.height=25,l("Last Reset:",s)}(t),function(t){const s=t.insertCell(-1)
s.align="right",u(R(),s)}(t),t}export default function(){!function(){const n=t('input[type="submit"]',s)
n&&a(n,y)}(),c("trackLadderReset")&&function(){const s=t("#pCC table"),a=M()
f(s,a)}(),function(){const t=n("td",s).filter(o("VL"))
if(1===t.length){const s=t[0].parentNode.parentNode.rows
e(s).filter(C).forEach(L)}}()}
//# sourceMappingURL=ladder-1e2f0e9b.js.map
