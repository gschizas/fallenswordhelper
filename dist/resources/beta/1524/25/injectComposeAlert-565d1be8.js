import{w as n,q as o,a7 as i,y as t,bH as a,c as s,j as c,H as f,bI as p,bJ as m,a4 as u,Y as e}from"./calfSystem-d3aab5a8.js"
function l(){return n(o({cmd:"composing"},{subcmd:"view"}))}const r=`<li class="notification"><a href="${a}"><span class="notification-icon"></span><p class="notification-content">Composing to do</p></a></li>`
function d(){i(t("notifications"),r)}function b(n){return n.time_remaining}function g(){d(),e(p,!0)}function h(n){n.potions.length!==n.max_potions?g():function(n){const o=Math.min.apply(null,n.map(b))
o>0?(e(p,!1),e(m,u+1e3*o)):g()}(n.potions)}function y(n){n.s&&h(n.r)}function j(){const n=f(m)
n&&u<n||l().then(y)}function w(){"composing"!==s.cmd&&c()&&(f(p)?d():j())}export default w
//# sourceMappingURL=injectComposeAlert-565d1be8.js.map
