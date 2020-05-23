import{aK as n,v as o,o as t,ab as e,A as a,f as c,a5 as r,n as s,am as f,t as i}from"./calfSystem-01eb06ed.js"
const u=[]
let h,d
function w(n){s(n.row)}function p(n){n.rows.forEach(w),n.open=!1}function l(n){n.open&&p(n)}function m(){u.forEach(l)}function E(n){i(n.row,!1)}function g(n){n.rows.forEach(E),n.open=!0}function x(n){n.open||g(n)}function I(n){return"TR"===n.tagName?function(n){if(n.rowIndex%d==0)return n}(n):"TABLE"!==n.tagName?I(n.parentNode):void 0}function T(n){h&&function(n){const o=I(n.target)
if(!o)return
const t=o.rowIndex/d,e=u[t]
!1===e.open?(m(),g(e)):p(e)}(n)}function b(n,o,t,a){0===o&&(t.header=n,function(n){h&&n.classList.add("fshPoint")}(n),function(n,o){f(n)&&n(o)}(a.extraFn,n)),a.articleTest(o)&&(t.rows[o]=e(t[o],{}),t.rows[o].row=n,function(n,o){h?(s(n),o.open=!1):o.open=!0}(n,t))}function N(n,o){const t=o.rowIndex%d,a=(o.rowIndex-t)/d
u[a]=e(u[a],{})
const c=u[a]
c.rows=c.rows||[],b(o,t,c,n)}function L(n){n.header.classList.toggle("fshPoint")}function v(n){h=!h,r(n,h),h?m():u.forEach(x),u.forEach(L)}function A(e){d=e.headInd,function(n){const t=a(n)
h=t.checked,c(a(n),"change",o(v,n))}(e.prefName),n(e.theTable.rows).forEach(o(N,e)),t(e.theTable,T)}export{A as c}
//# sourceMappingURL=collapse-6eb9215c.js.map
