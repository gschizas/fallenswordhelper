import{aD as o,s as n,o as t,a0 as e,x as c,e as r,W as a,ag as f}from"./calfSystem-be09bdff.js"
import{h as s}from"./hideElement-dd1f789a.js"
import{t as i}from"./toggleForce-2711e067.js"
const u=[]
let d,h
function w(o){s(o.row)}function p(o){o.rows.forEach(w),o.open=!1}function m(o){o.open&&p(o)}function l(){u.forEach(m)}function g(o){i(o.row,!1)}function E(o){o.rows.forEach(g),o.open=!0}function x(o){o.open||E(o)}function I(o){return"TR"===o.tagName?function(o){if(o.rowIndex%h==0)return o}(o):"TABLE"!==o.tagName?I(o.parentNode):void 0}function T(o){d&&function(o){const n=I(o.target)
if(!n)return
const t=n.rowIndex/h,e=u[t]
!1===e.open?(l(),E(e)):p(e)}(o)}function b(o,n,t,c){0===n&&(t.header=o,function(o){d&&o.classList.add("fshPoint")}(o),function(o,n){f(o)&&o(n)}(c.extraFn,o)),c.articleTest(n)&&(t.rows[n]=e(t[n],{}),t.rows[n].row=o,function(o,n){d?(s(o),n.open=!1):n.open=!0}(o,t))}function N(o,n){const t=n.rowIndex%h,c=(n.rowIndex-t)/h
u[c]=e(u[c],{})
const r=u[c]
r.rows=r.rows||[],b(n,t,r,o)}function j(o){o.header.classList.toggle("fshPoint")}function L(o){d=!d,a(o,d),d?l():u.forEach(x),u.forEach(j)}function F(e){h=e.headInd,function(o){const t=c(o)
d=t.checked,r(c(o),"change",n(L,o))}(e.prefName),o(e.theTable.rows).forEach(n(N,e)),t(e.theTable,T)}export{F as c}
//# sourceMappingURL=collapse-e9ae35c7.js.map
