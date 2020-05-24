import{aG as n,u as o,o as t,a9 as e,z as a,e as c,a3 as r,m as s,ak as f,t as i}from"./calfSystem-d587d232.js"
const u=[]
let d,h
function w(n){s(n.row)}function p(n){n.rows.forEach(w),n.open=!1}function l(n){n.open&&p(n)}function m(){u.forEach(l)}function E(n){i(n.row,!1)}function g(n){n.rows.forEach(E),n.open=!0}function x(n){n.open||g(n)}function I(n){return"TR"===n.tagName?function(n){if(n.rowIndex%h==0)return n}(n):"TABLE"!==n.tagName?I(n.parentNode):void 0}function T(n){d&&function(n){const o=I(n.target)
if(!o)return
const t=o.rowIndex/h,e=u[t]
!1===e.open?(m(),g(e)):p(e)}(n)}function N(n,o,t,a){0===o&&(t.header=n,function(n){d&&n.classList.add("fshPoint")}(n),function(n,o){f(n)&&n(o)}(a.extraFn,n)),a.articleTest(o)&&(t.rows[o]=e(t[o],{}),t.rows[o].row=n,function(n,o){d?(s(n),o.open=!1):o.open=!0}(n,t))}function L(n,o){const t=o.rowIndex%h,a=(o.rowIndex-t)/h
u[a]=e(u[a],{})
const c=u[a]
c.rows=c.rows||[],N(o,t,c,n)}function b(n){n.header.classList.toggle("fshPoint")}function k(n){d=!d,r(n,d),d?m():u.forEach(x),u.forEach(b)}function P(e){h=e.headInd,function(n){const t=a(n)
d=t.checked,c(a(n),"change",o(k,n))}(e.prefName),n(e.theTable.rows).forEach(o(L,e)),t(e.theTable,T)}export{P as c}
//# sourceMappingURL=collapse-5da524a4.js.map
