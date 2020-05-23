import{aH as n,v as o,o as t,aa as a,A as c,f as e,a4 as r,n as s,al as f,t as i}from"./calfSystem-d06402b1.js"
const u=[]
let h,d
function w(n){s(n.row)}function p(n){n.rows.forEach(w),n.open=!1}function l(n){n.open&&p(n)}function E(){u.forEach(l)}function g(n){i(n.row,!1)}function m(n){n.rows.forEach(g),n.open=!0}function x(n){n.open||m(n)}function I(n){return"TR"===n.tagName?function(n){if(n.rowIndex%d==0)return n}(n):"TABLE"!==n.tagName?I(n.parentNode):void 0}function T(n){h&&function(n){const o=I(n.target)
if(!o)return
const t=o.rowIndex/d,a=u[t]
!1===a.open?(E(),m(a)):p(a)}(n)}function N(n,o,t,c){0===o&&(t.header=n,function(n){h&&n.classList.add("fshPoint")}(n),function(n,o){f(n)&&n(o)}(c.extraFn,n)),c.articleTest(o)&&(t.rows[o]=a(t[o],{}),t.rows[o].row=n,function(n,o){h?(s(n),o.open=!1):o.open=!0}(n,t))}function b(n,o){const t=o.rowIndex%d,c=(o.rowIndex-t)/d
u[c]=a(u[c],{})
const e=u[c]
e.rows=e.rows||[],N(o,t,e,n)}function L(n){n.header.classList.toggle("fshPoint")}function v(n){h=!h,r(n,h),h?E():u.forEach(x),u.forEach(L)}function A(a){d=a.headInd,function(n){const t=c(n)
h=t.checked,e(c(n),"change",o(v,n))}(a.prefName),n(a.theTable.rows).forEach(o(b,a)),t(a.theTable,T)}export{A as c}
//# sourceMappingURL=collapse-113e0d4e.js.map
