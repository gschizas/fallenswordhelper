import{M as o,t as n,o as t,a2 as e,y as c,f as r,Y as a,ah as f}from"./calfSystem-1b876afa.js"
import{h as s}from"./hideElement-e3866bf9.js"
import{t as i}from"./toggleForce-0be28b41.js"
const u=[]
let h,d
function w(o){s(o.row)}function p(o){o.rows.forEach(w),o.open=!1}function m(o){o.open&&p(o)}function l(){u.forEach(m)}function g(o){i(o.row,!1)}function E(o){o.rows.forEach(g),o.open=!0}function b(o){o.open||E(o)}function x(o){return"TR"===o.tagName?function(o){if(o.rowIndex%d==0)return o}(o):"TABLE"!==o.tagName?x(o.parentNode):void 0}function I(o){h&&function(o){const n=x(o.target)
if(!n)return
const t=n.rowIndex/d,e=u[t]
!1===e.open?(l(),E(e)):p(e)}(o)}function T(o,n,t,c){0===n&&(t.header=o,function(o){h&&o.classList.add("fshPoint")}(o),function(o,n){f(o)&&o(n)}(c.extraFn,o)),c.articleTest(n)&&(t.rows[n]=e(t[n],{}),t.rows[n].row=o,function(o,n){h?(s(o),n.open=!1):n.open=!0}(o,t))}function N(o,n){const t=n.rowIndex%d,c=(n.rowIndex-t)/d
u[c]=e(u[c],{})
const r=u[c]
r.rows=r.rows||[],T(n,t,r,o)}function j(o){o.header.classList.toggle("fshPoint")}function L(o){h=!h,a(o,h),h?l():u.forEach(b),u.forEach(j)}function y(e){d=e.headInd,function(o){const t=c(o)
h=t.checked,r(c(o),"change",n(L,o))}(e.prefName),o(e.theTable.rows).forEach(n(N,e)),t(e.theTable,I)}export{y as c}
//# sourceMappingURL=collapse-dcd9d480.js.map
