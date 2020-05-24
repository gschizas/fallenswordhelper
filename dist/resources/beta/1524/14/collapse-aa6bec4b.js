import{aG as n,u as o,o as t,a9 as c,z as e,e as a,a3 as r,m as s,ak as f,t as i}from"./calfSystem-371c414c.js"
const u=[]
let h,w
function d(n){s(n.row)}function p(n){n.rows.forEach(d),n.open=!1}function l(n){n.open&&p(n)}function m(){u.forEach(l)}function E(n){i(n.row,!1)}function g(n){n.rows.forEach(E),n.open=!0}function x(n){n.open||g(n)}function I(n){return"TR"===n.tagName?function(n){if(n.rowIndex%w==0)return n}(n):"TABLE"!==n.tagName?I(n.parentNode):void 0}function T(n){h&&function(n){const o=I(n.target)
if(!o)return
const t=o.rowIndex/w,c=u[t]
!1===c.open?(m(),g(c)):p(c)}(n)}function N(n,o,t,e){0===o&&(t.header=n,function(n){h&&n.classList.add("fshPoint")}(n),function(n,o){f(n)&&n(o)}(e.extraFn,n)),e.articleTest(o)&&(t.rows[o]=c(t[o],{}),t.rows[o].row=n,function(n,o){h?(s(n),o.open=!1):o.open=!0}(n,t))}function L(n,o){const t=o.rowIndex%w,e=(o.rowIndex-t)/w
u[e]=c(u[e],{})
const a=u[e]
a.rows=a.rows||[],N(o,t,a,n)}function b(n){n.header.classList.toggle("fshPoint")}function k(n){h=!h,r(n,h),h?m():u.forEach(x),u.forEach(b)}function P(c){w=c.headInd,function(n){const t=e(n)
h=t.checked,a(e(n),"change",o(k,n))}(c.prefName),n(c.theTable.rows).forEach(o(L,c)),t(c.theTable,T)}export{P as c}
//# sourceMappingURL=collapse-aa6bec4b.js.map
