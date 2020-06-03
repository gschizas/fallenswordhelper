import{aD as o,s as n,o as t,a0 as e,x as c,e as a,W as r,ag as s}from"./calfSystem-8b6534a5.js"
import{h as f}from"./hideElement-551a92b9.js"
import{t as i}from"./toggleForce-c312b2b1.js"
const u=[]
let h,d
function w(o){f(o.row)}function p(o){o.rows.forEach(w),o.open=!1}function m(o){o.open&&p(o)}function l(){u.forEach(m)}function g(o){i(o.row,!1)}function E(o){o.rows.forEach(g),o.open=!0}function x(o){o.open||E(o)}function b(o){return"TR"===o.tagName?function(o){if(o.rowIndex%d==0)return o}(o):"TABLE"!==o.tagName?b(o.parentNode):void 0}function I(o){h&&function(o){const n=b(o.target)
if(!n)return
const t=n.rowIndex/d,e=u[t]
!1===e.open?(l(),E(e)):p(e)}(o)}function T(o,n,t,c){0===n&&(t.header=o,function(o){h&&o.classList.add("fshPoint")}(o),function(o,n){s(o)&&o(n)}(c.extraFn,o)),c.articleTest(n)&&(t.rows[n]=e(t[n],{}),t.rows[n].row=o,function(o,n){h?(f(o),n.open=!1):n.open=!0}(o,t))}function N(o,n){const t=n.rowIndex%d,c=(n.rowIndex-t)/d
u[c]=e(u[c],{})
const a=u[c]
a.rows=a.rows||[],T(n,t,a,o)}function j(o){o.header.classList.toggle("fshPoint")}function L(o){h=!h,r(o,h),h?l():u.forEach(x),u.forEach(j)}function F(e){d=e.headInd,function(o){const t=c(o)
h=t.checked,a(c(o),"change",n(L,o))}(e.prefName),o(e.theTable.rows).forEach(n(N,e)),t(e.theTable,I)}export{F as c}
//# sourceMappingURL=collapse-7b6fb8f6.js.map
