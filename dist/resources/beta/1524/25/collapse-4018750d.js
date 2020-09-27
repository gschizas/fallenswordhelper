import{M as o,t as n,o as t,a2 as e,y as c,f as a,Y as r,ah as f}from"./calfSystem-d3aab5a8.js"
import{h as s}from"./hideElement-c8e0696f.js"
import{t as i}from"./toggleForce-8f3fdd9b.js"
const u=[]
let h,d
function w(o){s(o.row)}function p(o){o.rows.forEach(w),o.open=!1}function m(o){o.open&&p(o)}function l(){u.forEach(m)}function g(o){i(o.row,!1)}function E(o){o.rows.forEach(g),o.open=!0}function x(o){o.open||E(o)}function I(o){return"TR"===o.tagName?function(o){if(o.rowIndex%d==0)return o}(o):"TABLE"!==o.tagName?I(o.parentNode):void 0}function T(o){h&&function(o){const n=I(o.target)
if(!n)return
const t=n.rowIndex/d,e=u[t]
!1===e.open?(l(),E(e)):p(e)}(o)}function b(o,n,t,c){0===n&&(t.header=o,function(o){h&&o.classList.add("fshPoint")}(o),function(o,n){f(o)&&o(n)}(c.extraFn,o)),c.articleTest(n)&&(t.rows[n]=e(t[n],{}),t.rows[n].row=o,function(o,n){h?(s(o),n.open=!1):n.open=!0}(o,t))}function N(o,n){const t=n.rowIndex%d,c=(n.rowIndex-t)/d
u[c]=e(u[c],{})
const a=u[c]
a.rows=a.rows||[],b(n,t,a,o)}function j(o){o.header.classList.toggle("fshPoint")}function L(o){h=!h,r(o,h),h?l():u.forEach(x),u.forEach(j)}function y(e){d=e.headInd,function(o){const t=c(o)
h=t.checked,a(c(o),"change",n(L,o))}(e.prefName),o(e.theTable.rows).forEach(n(N,e)),t(e.theTable,T)}export{y as c}
//# sourceMappingURL=collapse-4018750d.js.map
