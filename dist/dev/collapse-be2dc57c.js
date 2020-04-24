import{aK as n,v as o,o as t,ab as c,A as a,f as e,a5 as r,n as s,am as f,t as i}from"./calfSystem-94018cd0.js"
const u=[]
let h,d
function w(n){s(n.row)}function p(n){n.rows.forEach(w),n.open=!1}function l(n){n.open&&p(n)}function m(){u.forEach(l)}function E(n){i(n.row,!1)}function g(n){n.rows.forEach(E),n.open=!0}function x(n){n.open||g(n)}function I(n){return"TR"===n.tagName?function(n){if(n.rowIndex%d==0)return n}(n):"TABLE"!==n.tagName?I(n.parentNode):void 0}function T(n){h&&function(n){const o=I(n.target)
if(!o)return
const t=o.rowIndex/d,c=u[t]
!1===c.open?(m(),g(c)):p(c)}(n)}function N(n,o,t,a){0===o&&(t.header=n,function(n){h&&n.classList.add("fshPoint")}(n),function(n,o){f(n)&&n(o)}(a.extraFn,n)),a.articleTest(o)&&(t.rows[o]=c(t[o],{}),t.rows[o].row=n,function(n,o){h?(s(n),o.open=!1):o.open=!0}(n,t))}function b(n,o){const t=o.rowIndex%d,a=(o.rowIndex-t)/d
u[a]=c(u[a],{})
const e=u[a]
e.rows=e.rows||[],N(o,t,e,n)}function L(n){n.header.classList.toggle("fshPoint")}function v(n){h=!h,r(n,h),h?m():u.forEach(x),u.forEach(L)}function A(c){d=c.headInd,function(n){const t=a(n)
h=t.checked,e(a(n),"change",o(v,n))}(c.prefName),n(c.theTable.rows).forEach(o(b,c)),t(c.theTable,T)}export{A as c}
//# sourceMappingURL=collapse-be2dc57c.js.map
