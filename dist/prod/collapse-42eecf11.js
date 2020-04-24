import{aH as n,v as o,o as t,aa as c,A as a,f as e,a4 as r,n as s,al as f,t as i}from"./calfSystem-cb871cc0.js"
const u=[]
let h,w
function d(n){s(n.row)}function p(n){n.rows.forEach(d),n.open=!1}function l(n){n.open&&p(n)}function E(){u.forEach(l)}function g(n){i(n.row,!1)}function m(n){n.rows.forEach(g),n.open=!0}function x(n){n.open||m(n)}function I(n){return"TR"===n.tagName?function(n){if(n.rowIndex%w==0)return n}(n):"TABLE"!==n.tagName?I(n.parentNode):void 0}function T(n){h&&function(n){const o=I(n.target)
if(!o)return
const t=o.rowIndex/w,c=u[t]
!1===c.open?(E(),m(c)):p(c)}(n)}function N(n,o,t,a){0===o&&(t.header=n,function(n){h&&n.classList.add("fshPoint")}(n),function(n,o){f(n)&&n(o)}(a.extraFn,n)),a.articleTest(o)&&(t.rows[o]=c(t[o],{}),t.rows[o].row=n,function(n,o){h?(s(n),o.open=!1):o.open=!0}(n,t))}function b(n,o){const t=o.rowIndex%w,a=(o.rowIndex-t)/w
u[a]=c(u[a],{})
const e=u[a]
e.rows=e.rows||[],N(o,t,e,n)}function L(n){n.header.classList.toggle("fshPoint")}function v(n){h=!h,r(n,h),h?E():u.forEach(x),u.forEach(L)}function A(c){w=c.headInd,function(n){const t=a(n)
h=t.checked,e(a(n),"change",o(v,n))}(c.prefName),n(c.theTable.rows).forEach(o(b,c)),t(c.theTable,T)}export{A as c}
//# sourceMappingURL=collapse-42eecf11.js.map
