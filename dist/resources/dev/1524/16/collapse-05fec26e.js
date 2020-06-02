import{a3 as o,s as n,o as t,a1 as e,x as c,e as a,X as r,aj as s}from"./calfSystem-d49dbbd3.js"
import{h as f}from"./hideElement-a25240d4.js"
import{t as i}from"./toggleForce-c06db9a6.js"
const u=[]
let d,h
function w(o){f(o.row)}function p(o){o.rows.forEach(w),o.open=!1}function m(o){o.open&&p(o)}function l(){u.forEach(m)}function g(o){i(o.row,!1)}function E(o){o.rows.forEach(g),o.open=!0}function x(o){o.open||E(o)}function b(o){return"TR"===o.tagName?function(o){if(o.rowIndex%h==0)return o}(o):"TABLE"!==o.tagName?b(o.parentNode):void 0}function I(o){d&&function(o){const n=b(o.target)
if(!n)return
const t=n.rowIndex/h,e=u[t]
!1===e.open?(l(),E(e)):p(e)}(o)}function T(o,n,t,c){0===n&&(t.header=o,function(o){d&&o.classList.add("fshPoint")}(o),function(o,n){s(o)&&o(n)}(c.extraFn,o)),c.articleTest(n)&&(t.rows[n]=e(t[n],{}),t.rows[n].row=o,function(o,n){d?(f(o),n.open=!1):n.open=!0}(o,t))}function j(o,n){const t=n.rowIndex%h,c=(n.rowIndex-t)/h
u[c]=e(u[c],{})
const a=u[c]
a.rows=a.rows||[],T(n,t,a,o)}function N(o){o.header.classList.toggle("fshPoint")}function L(o){d=!d,r(o,d),d?l():u.forEach(x),u.forEach(N)}function F(e){h=e.headInd,function(o){const t=c(o)
d=t.checked,a(c(o),"change",n(L,o))}(e.prefName),o(e.theTable.rows).forEach(n(j,e)),t(e.theTable,I)}export{F as c}
//# sourceMappingURL=collapse-05fec26e.js.map
