import{w as n,q as o,a5 as i,y as t,bJ as s,c as a,j as c,G as f,bK as p,bL as m,a7 as u,Z as e}from"./calfSystem-9901ad27.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${s}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function d(){i(t("notifications"),r)}function g(n){return n.time_remaining}function b(){d(),e(p,!0)}function h(n){n.potions.length!==n.max_potions?b():function(n){const o=Math.min.apply(null,n.map(g))
o>0?(e(p,!1),e(m,u+1e3*o)):b()}(n.potions)}function y(n){n.s&&h(n.r)}function j(){const n=f(m)
n&&u<n||l().then(y)}export default function(){"composing"!==a.cmd&&c()&&(f(p)?d():j())}
//# sourceMappingURL=injectComposeAlert-54199146.js.map
