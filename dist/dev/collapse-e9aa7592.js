import{aK as n,v as o,o as t,ab as a,A as e,f as c,a5 as f,n as r,am as s,t as i}from"./calfSystem-0e5d6faf.js"
const u=[]
let h,d
function w(n){r(n.row)}function p(n){n.rows.forEach(w),n.open=!1}function l(n){n.open&&p(n)}function m(){u.forEach(l)}function E(n){i(n.row,!1)}function g(n){n.rows.forEach(E),n.open=!0}function x(n){n.open||g(n)}function I(n){return"TR"===n.tagName?function(n){if(n.rowIndex%d==0)return n}(n):"TABLE"!==n.tagName?I(n.parentNode):void 0}function T(n){h&&function(n){const o=I(n.target)
if(!o)return
const t=o.rowIndex/d,a=u[t]
!1===a.open?(m(),g(a)):p(a)}(n)}function N(n,o,t,e){0===o&&(t.header=n,function(n){h&&n.classList.add("fshPoint")}(n),function(n,o){s(n)&&n(o)}(e.extraFn,n)),e.articleTest(o)&&(t.rows[o]=a(t[o],{}),t.rows[o].row=n,function(n,o){h?(r(n),o.open=!1):o.open=!0}(n,t))}function b(n,o){const t=o.rowIndex%d,e=(o.rowIndex-t)/d
u[e]=a(u[e],{})
const c=u[e]
c.rows=c.rows||[],N(o,t,c,n)}function L(n){n.header.classList.toggle("fshPoint")}function v(n){h=!h,f(n,h),h?m():u.forEach(x),u.forEach(L)}function A(a){d=a.headInd,function(n){const t=e(n)
h=t.checked,c(e(n),"change",o(v,n))}(a.prefName),n(a.theTable.rows).forEach(o(b,a)),t(a.theTable,T)}export{A as c}
//# sourceMappingURL=collapse-e9aa7592.js.map
