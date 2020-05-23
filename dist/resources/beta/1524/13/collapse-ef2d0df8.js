import{aH as n,v as o,o as t,aa as a,A as e,f as c,a4 as r,n as s,al as f,t as i}from"./calfSystem-1e164202.js"
const u=[]
let h,w
function d(n){s(n.row)}function p(n){n.rows.forEach(d),n.open=!1}function l(n){n.open&&p(n)}function E(){u.forEach(l)}function g(n){i(n.row,!1)}function m(n){n.rows.forEach(g),n.open=!0}function x(n){n.open||m(n)}function I(n){return"TR"===n.tagName?function(n){if(n.rowIndex%w==0)return n}(n):"TABLE"!==n.tagName?I(n.parentNode):void 0}function T(n){h&&function(n){const o=I(n.target)
if(!o)return
const t=o.rowIndex/w,a=u[t]
!1===a.open?(E(),m(a)):p(a)}(n)}function N(n,o,t,e){0===o&&(t.header=n,function(n){h&&n.classList.add("fshPoint")}(n),function(n,o){f(n)&&n(o)}(e.extraFn,n)),e.articleTest(o)&&(t.rows[o]=a(t[o],{}),t.rows[o].row=n,function(n,o){h?(s(n),o.open=!1):o.open=!0}(n,t))}function L(n,o){const t=o.rowIndex%w,e=(o.rowIndex-t)/w
u[e]=a(u[e],{})
const c=u[e]
c.rows=c.rows||[],N(o,t,c,n)}function b(n){n.header.classList.toggle("fshPoint")}function v(n){h=!h,r(n,h),h?E():u.forEach(x),u.forEach(b)}function A(a){w=a.headInd,function(n){const t=e(n)
h=t.checked,c(e(n),"change",o(v,n))}(a.prefName),n(a.theTable.rows).forEach(o(L,a)),t(a.theTable,T)}export{A as c}
//# sourceMappingURL=collapse-ef2d0df8.js.map
