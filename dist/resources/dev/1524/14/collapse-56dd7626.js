import{aJ as n,u as o,o as t,aa as a,z as e,e as c,a4 as r,m as s,al as f,t as i}from"./calfSystem-d96a3efd.js"
const u=[]
let d,h
function w(n){s(n.row)}function p(n){n.rows.forEach(w),n.open=!1}function l(n){n.open&&p(n)}function m(){u.forEach(l)}function E(n){i(n.row,!1)}function g(n){n.rows.forEach(E),n.open=!0}function x(n){n.open||g(n)}function I(n){return"TR"===n.tagName?function(n){if(n.rowIndex%h==0)return n}(n):"TABLE"!==n.tagName?I(n.parentNode):void 0}function T(n){d&&function(n){const o=I(n.target)
if(!o)return
const t=o.rowIndex/h,a=u[t]
!1===a.open?(m(),g(a)):p(a)}(n)}function N(n,o,t,e){0===o&&(t.header=n,function(n){d&&n.classList.add("fshPoint")}(n),function(n,o){f(n)&&n(o)}(e.extraFn,n)),e.articleTest(o)&&(t.rows[o]=a(t[o],{}),t.rows[o].row=n,function(n,o){d?(s(n),o.open=!1):o.open=!0}(n,t))}function L(n,o){const t=o.rowIndex%h,e=(o.rowIndex-t)/h
u[e]=a(u[e],{})
const c=u[e]
c.rows=c.rows||[],N(o,t,c,n)}function b(n){n.header.classList.toggle("fshPoint")}function P(n){d=!d,r(n,d),d?m():u.forEach(x),u.forEach(b)}function j(a){h=a.headInd,function(n){const t=e(n)
d=t.checked,c(e(n),"change",o(P,n))}(a.prefName),n(a.theTable.rows).forEach(o(L,a)),t(a.theTable,T)}export{j as c}
//# sourceMappingURL=collapse-56dd7626.js.map
